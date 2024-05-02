import {
  CATEGORY_FOLDER,
  COM_CODE,
  DEPT_FOLDER,
  PROJECT_FOLDER,
  PROJECT_JOIN_FOLDER,
  PROJECT_MAIN_FOLDER,
  RESEARCH_FOLDER,
  RESEARCH_JOIN_FOLDER,
  RESEARCH_MAIN_FOLDER,
  SIDEBAR_TAB,
  TREE_KEY_DIVIDER,
} from "constants/code-constants";
import { HttpStatus } from "constants/http-constants";
import Cookies from "js-cookie";

console.debug("common-util.js");

const DOUBLE_CLICK_DELAY = 300;

const CommonUtil = {
  /**
   * 로컬 스토리지에 데이터 저장하기
   */
  setLocalStorageItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 로컬 스토리지에 저장된 데이터 불러오기
   */
  getLocalStorageItem: (key, defaultValue) => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return item || defaultValue;
    }
  },

  /**
   * 세션 스토리지에 데이터 저장하기
   */
  setSessionStorageItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 세션 스토리지에 저장된 데이터 불러오기
   */
  getSessionStorageItem: (key, defaultValue) => {
    const item = sessionStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return item || defaultValue;
    }
  },

  /**
   * 쿠키 설정하기
   */
  setCookie: (name, value, options) => {
    Cookies.set(name, value, {
      expires: 1,
      ...options,
    });
  },

  /**
   * 쿠키 불러오기
   */
  getCookie: (name) => Cookies.get(name),

  /**
   * 쿠키 삭제하기
   */
  removeCookie: (name) => Cookies.remove(name),

  /**
   * 트리 만들기 (parent 리스트)
   *
   * @param {*} key 경로 탐색 대상의 키값
   * @param {*} nodes  전체 트리 (parent 리스트) 데이터
   * @param {*} keyName 각 노드의 식별자 이름
   * @param {*} mapping 매핑 방법
   * @param {*} children 자식 노드 찾는 방법
   * @returns 생성된 트리
   */
  makeTree: function (key, nodes, { keyName, mapping, children }) {
    return nodes
      .filter((item) => children(item, key))
      .map((item) => ({
        ...(typeof mapping === "function" ? mapping(item) : item),
        children: this.makeTree(item[keyName], nodes, { keyName, mapping, children }),
      }));
  },

  /**
   * 트리 경로 만들기 (children 트리)
   *
   * @param {*} key 경로 탐색 대상의 키값
   * @param {*} treeData  전체 트리 데이터
   * @param {*} keyName 각 노드의 식별자 이름
   * @param {*} mapping 매핑 방법
   * @param {*} parents 부모 노드 찾는 방법
   * @returns 트리 경로
   */
  getTreePath: function (key, treeData, { keyName, mapping, childrenName }) {
    if (!key) throw new Error(`key is not defined (key: ${key})`);
    if (!treeData) throw new Error(`treeData is not defined (treeData: ${treeData})`);
    if (!(treeData instanceof Array)) treeData = [treeData];
    if (treeData.length === 0) return [];

    for (let item of treeData) {
      const mapped = typeof mapping === "function" ? mapping(item) : item;
      if (item[keyName || "key"] === key) {
        return [mapped];
      } else {
        const children = item[childrenName || "children"];
        if (children instanceof Array && children.length > 0) {
          const paths = this.getTreePath(key, children, { keyName, mapping, childrenName });
          if (paths && paths.length > 0) return [mapped, ...paths];
        }
      }
    }
  },

  /**
   * 트리 경로 만들기 (parent 리스트)
   *
   * @param {*} key 경로 탐색 대상의 키값
   * @param {*} nodes  전체 리스트 데이터
   * @param {*} keyName 각 노드의 식별자 이름
   * @param {*} mapping 매핑 방법
   * @param {*} parents 부모 노드 찾는 방법
   * @returns 트리 경로
   */
  getTreePathFromList: function (key, nodes, { keyName, mapping, parents }) {
    const getCurrentNode = () => {
      const currentNode = nodes.find((item) => item[keyName] === key);
      return typeof mapping === "function" ? mapping(currentNode) : currentNode;
    };

    const parent = nodes.find((item) => parents(item, key));
    return parent
      ? [...(this.getTreePathFromList(parent[keyName || "key"], nodes, { keyName, mapping, parents }) || []), getCurrentNode()]
      : [getCurrentNode()];
  },

  /**
   * 전체 데이터 트리 매핑
   */
  mapTreeAll: function (treeData, { mapping, childrenName }) {
    return treeData.map((item) => ({
      ...(typeof mapping === "function" ? mapping(item) : item),
      children: this.mapTreeAll(
        item[childrenName || "children"] == null ? new Array() : item[childrenName || "children"].concat(item.deptUsers == null ? new Array() : item.deptUsers),
        { mapping, childrenName },
      ),
    }));
  },

  /**
   * 트리 매핑 (children 트리)
   *
   * @param {*} treeData 전체 트리 데이터
   * @param {*} mapping 매핑 방법
   * @param {*} childrenName 자식 리스트의 식별자 이름
   * @returns 매핑된 트리
   */
  mapTree: function (treeData, { mapping, childrenName, setChildren }) {
    return treeData?.map((item) => {
      const mappedChildren = this.mapTree(item[childrenName || "children"], { mapping, childrenName, setChildren });
      return {
        ...(typeof mapping === "function" ? mapping(item) : item),
        children: typeof setChildren === "function" ? setChildren(item, mappedChildren) : mappedChildren,
      };
    });
  },

  /**
   * 트리 찾기
   */
  findTree: function (treeData, { keyName, childrenName, value }) {
    if (!treeData) throw new Error(`treeData is not defined`);
    if (!(treeData instanceof Array)) treeData = [treeData];
    if (treeData.length === 0) return;

    for (let item of treeData) {
      if (item[keyName || "key"] === value) {
        return item;
      } else {
        const children = item[childrenName || "children"];
        if (children instanceof Array && children.length > 0) {
          const found = this.findTree(children, { keyName, childrenName, value });
          if (found) return found;
        }
      }
    }
  },

  /**
   * 더블클릭 여부 체크
   */
  buildDoubleClickChecker: (checker) => {
    let dbclickTimer = null;

    return (event) => {
      // 더블클릭일 경우 직전 클릭 이벤트 제거 후 종료
      if (dbclickTimer && event.detail > 1) {
        clearTimeout(dbclickTimer);
        return;
      }

      // 더블클릭 여부를 확인하기 위한 지연
      dbclickTimer = setTimeout(() => {
        if (typeof checker === "function") checker(event);
        dbclickTimer = null;
      }, DOUBLE_CLICK_DELAY);
    };
  },

  /**
   * 미인증(401 Unauthorized)가 아닌 경우 에러 표시
   *
   * @param {*} error 에러 객체
   * @param {*} enqueueSnackbar snackbar를 표시할 경우 전달
   */
  printAuthorizedError: (error, enqueueSnackbar) => {
    if (!(error?.response?.status === HttpStatus.UNAUTHORIZED)) {
      console.error(error);
      if (enqueueSnackbar) {
        enqueueSnackbar({
          severity: "error",
          title: "Error",
          message: error.message,
        });
      }
    }
  },

  /**
   * query string으로 받은 노드 아이디를 파싱한다.
   *
   * @param {*} nodeId 노드 아이디
   */
  parseNodeId: (nodeId, sidebarTab) => {
    const splited = nodeId.split(TREE_KEY_DIVIDER);
    const key = splited[0];
    const categoryKey = sidebarTab === SIDEBAR_TAB.DEPT.key ? splited[1] : splited.length === 2 ? undefined : splited[1];
    const deptKey = sidebarTab === SIDEBAR_TAB.DEPT.key ? undefined : splited.length === 2 ? splited[1] : splited[2];

    return { key, categoryKey, deptKey };
  },

  /**
   * nodeId 만들기
   *
   * @param {*} key 키값
   * @param {*} categoryKey 카테고리
   * @param {*} deptKey 부서
   */
  makeNodeId: (key, categoryKey, deptKey) => {
    if (categoryKey) key = `${key}${TREE_KEY_DIVIDER}${categoryKey}`;
    if (deptKey) key = `${key}${TREE_KEY_DIVIDER}${deptKey}`;

    return key;
  },

  /**
   * 카테고리 경로
   *
   * @param {*} key 키값
   * @param {*} deptKey 부서
   */
  getCategoryPath: (key, deptKey) => {
    let result = []; // treeType에 따라 categoryKey가 없을 수도 있으므로 key가 undefined일 때 [] 반환

    // 최상위 경로
    const categoryFound = Object.values(CATEGORY_FOLDER).find((item) => item.key === key);
    if (categoryFound) result = [deptKey ? CommonUtil.makeNodeId(categoryFound.key, null, deptKey) : categoryFound.key];

    // 전자결재 경로
    const deptFound = Object.values(DEPT_FOLDER).find((item) => item.key === key);
    if (deptFound) result = [CommonUtil.makeNodeId(CATEGORY_FOLDER.DEPT.key, null, deptKey), CommonUtil.makeNodeId(deptFound.key, null, deptKey)];

    // 프로젝트/투자 > 주관 또는 참여 경로
    const projectFound = Object.values(PROJECT_FOLDER).find((item) => item.key === key);
    if (projectFound) result = [CommonUtil.makeNodeId(CATEGORY_FOLDER.PROJECT.key, null, deptKey), CommonUtil.makeNodeId(projectFound.key, null, deptKey)];

    // 프로젝트/투자 > 주관 > 완료함 경로
    const projectMainFound = Object.values(PROJECT_MAIN_FOLDER).find((item) => item.key === key);
    if (projectMainFound)
      result = [
        CommonUtil.makeNodeId(CATEGORY_FOLDER.PROJECT.key, null, deptKey),
        CommonUtil.makeNodeId(PROJECT_FOLDER.MAIN.key, null, deptKey),
        CommonUtil.makeNodeId(projectMainFound.key, null, deptKey),
      ];

    // 프로젝트/투자 > 참여 > 완료함 경로
    const projectJoinFound = Object.values(PROJECT_JOIN_FOLDER).find((item) => item.key === key);
    if (projectJoinFound)
      result = [
        CommonUtil.makeNodeId(CATEGORY_FOLDER.PROJECT.key, null, deptKey),
        CommonUtil.makeNodeId(PROJECT_FOLDER.JOIN.key, null, deptKey),
        CommonUtil.makeNodeId(projectJoinFound.key, null, deptKey),
      ];

    // 연구과제 > 주관 또는 참여 경로
    const researchFound = Object.values(RESEARCH_FOLDER).find((item) => item.key === key);
    if (researchFound) result = [CommonUtil.makeNodeId(CATEGORY_FOLDER.RESEARCH.key, null, deptKey), CommonUtil.makeNodeId(researchFound.key, null, deptKey)];

    // 연구과제 > 주관 > 완료함 경로
    const researchMainFound = Object.values(RESEARCH_MAIN_FOLDER).find((item) => item.key === key);
    if (researchMainFound)
      result = [
        CommonUtil.makeNodeId(CATEGORY_FOLDER.RESEARCH.key, null, deptKey),
        CommonUtil.makeNodeId(RESEARCH_FOLDER.MAIN.key, null, deptKey),
        CommonUtil.makeNodeId(researchMainFound.key, null, deptKey),
      ];

    // 연구과제 > 참여 > 완료함 경로
    const researchJoinFound = Object.values(RESEARCH_JOIN_FOLDER).find((item) => item.key === key);
    if (researchJoinFound)
      result = [
        CommonUtil.makeNodeId(CATEGORY_FOLDER.RESEARCH.key, null, deptKey),
        CommonUtil.makeNodeId(RESEARCH_FOLDER.JOIN.key, null, deptKey),
        CommonUtil.makeNodeId(researchJoinFound.key, null, deptKey),
      ];

    return result;
  },

  /**
   * 모든 경로의 키값 (rc-tree의 expandedKeys)
   *
   * @param {*} targets 대상 키값 리스트
   * @param {*} treeData 트리 데이터
   * @returns 중복이 제거된 경로상 모든 키값
   */
  getExpandedKeysFromTargets: (targets, treeData) => {
    if (targets instanceof Array && targets.length > 0 && treeData instanceof Array && treeData.length > 0) {
      // 중복포함 모든 경로의 키값
      let allPath = [];
      targets.forEach((item) => {
        const path = CommonUtil.getTreePath(item, treeData, {
          mapping: (item) => item.key,
        });

        allPath = allPath.concat(path);
      });

      // 중복 제거
      const distinctPath = Array.from(new Set(allPath));

      return distinctPath;
    } else {
      return [];
    }
  },

  /**
   * 텍스트 복사
   */
  copyString: async (str) => {
    const permission = await navigator.permissions.query({ name: "clipboard-write" });
    if (permission.state == "granted" || permission.state == "prompt") {
      await navigator.clipboard.writeText(str);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = str;
  
      // 기존에 포커스된 element 백업
      const activeElementBak = document.activeElement;
  
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999);
      
      document.execCommand("copy");
      document.body.removeChild(textarea);
  
      // 기존 포커스 복원
      activeElementBak.focus();
    }
  },

  /**
   * 텍스트 붙여넣기
   */
  pasteString: async () => {
    const permission = await navigator.permissions.query({ name: "clipboard-read" });
    if (permission.state == "granted" || permission.state == "prompt") {
      return await navigator.clipboard.readText();
    } else {
      alert("브라우저의 클립보드 사용 권한을 허용해주세요");
    }
  },

  /**
   * JSON 여부 확인
   */
  isJson: (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },

  /**
   * 모바일 여부
   */
  isMobile: () => {
    const isMobileRegex1 =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
    const isMobileRegex2 =
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;
    const agent = navigator.userAgent || navigator.vendor || window.opera;

    return isMobileRegex1.test(agent) || isMobileRegex2.test(agent.substr(0, 4));
  },

  /**
   * IE 여부
   */
  isIe: () => {
    return (navigator.appName === "Netscape" && navigator.userAgent.search("Trident") !== -1) || navigator.userAgent.toLowerCase().indexOf("msie") !== -1;
  },

  /**
   * URL 여부
   */
  isUrl: (str) => {
    const isURLRegex = /^http[s]?:\/\//i;
    return isURLRegex.test(str);
  },

  /**
   * 숫자 여부
   */
  isNumber: (num) => {
    const strNum = num + "";
    if (strNum === "" || isNaN(strNum)) return false;
    return true;
  },

  /**
   * Documentum 아이디 여부
   */
  isObjectId: (str) => {
    return str && str.length === 16;
  },

  /**
   * 프로젝트/투자 코드 여부
   */
  isPjtCode: (str) => {
    return str && str.length === 6 && str[0] === "p";
  },

  /**
   * 연구과제 코드 여부
   */
  isRschCode: (str) => {
    return str && str.length === 6 && str[0] === "r";
  },

  /**
   * 부서 코드 여부
   */
  isDeptCode: (str) => {
    return str && Object.values(COM_CODE).some((item) => str.startsWith(item.key));
  },

  /**
   * 중복제거
   *
   * @param {*} list 중복제거 대상 리스트
   * @param {*} checker 중복제거 방법
   * @returns 중복이 제거된 리스트
   */
  toDistinct: (list, checker) => {
    const distinctList = list.reduce((accumulator, currentValue) => {
      if (typeof checker === "function" ? checker(accumulator, currentValue) : !accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    return distinctList;
  },

  /**
   * isEmpty
   */
  isEmpty: (value) => {
    if (value === null) return true;
    if (typeof value === "undefined") return true;
    if (typeof value === "string" && value === "") return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === "object" && value.constructor.name === "Object" && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true;
    if (typeof value === "object" && value.constructor.name === "String" && Object.keys(value).length < 1) return true; // new String()
    return false;
  },

  /**
   * getCodeValue
   */
  getCodeValue: (codes, code) => {
    let v = Object.entries(codes).find((item) => item[1].key === code);
    return v ? v?.desc : "";
  },
};

export default CommonUtil;
