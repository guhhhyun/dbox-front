import { Fragment, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import queryString from "query-string";
import DocGrid from "views/templates/doc/grid/DocGrid";
import { DOC, EMPTY, FOLDER, MULTI_FD, PROJECT, RESEARCH, SEARCH, useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import { ALERT_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import CommonUtil from "utils/common-util";
import DataApi from "apis/data-api";
import TakeoutApi from "apis/takeout-api";
import ShareFolderApi from "apis/sharefolder-api";
import {
  CATEGORY_FOLDER,
  CLIPBOARD_TYPE,
  COLUMN_MODE,
  COM_CODE,
  DATA_TYPE,
  DCTM_BLANK,
  DEPT_FOLDER,
  FOL_STATUS,
  HAM_TYPE,
  LIMIT_VALUE_TYPE,
  OWN_JOIN,
  PROJECT_FOLDER,
  PROJECT_JOIN_FOLDER,
  PROJECT_MAIN_FOLDER,
  RESEARCH_FOLDER,
  RESEARCH_JOIN_FOLDER,
  RESEARCH_MAIN_FOLDER,
  TREE_KEY_DIVIDER,
  TREE_TYPE,
} from "constants/code-constants";
import { HttpStatus } from "constants/http-constants";
import { KUPLOAD_ID } from "constants/global-constants";
import FormatUtil from "utils/format-util";
import LimitValueApi from "apis/limitvalue-api";
import ProjectApi from "apis/project-api";
import ResearchApi from "apis/research-api";
import { PR_ALL, PR_DOING, PR_DONE, TREE_PROJECT, TREE_RESEARCH } from "stores/doc";
import { DOC_GRID_COLUMN } from "constants/localstorage-constants";
import DeptApi from "apis/dept-api";

console.debug("DocGridContainer.js");

const DocGridContainer = forwardRef(function ({ height, pageKey }, ref) {
  const pageKeyNodeId = `${pageKey}Id`;

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { openDialog, closeDialog } = useGlobalDialog();
  const { openContextMenu } = useContextMenu();

  const user = useSelector((state) => state.session.user);
  const nodeId = useSelector((state) => state.doc.id[pageKey]);
  const sidebarTab = useSelector((state) => state.doc.tab[pageKey]);
  const treeType = useSelector((state) => state.doc.treeType[pageKey]);
  const prStatus = useSelector((state) => state.doc.prStatus[pageKey]);

  const [columnMode, setColumnMode] = useState(COLUMN_MODE.DEFAULT);

  const gridRef = useRef(null);

  useEffect(() => {
    // 에이전트 로그인 시도
    window.WSSetUserId(user.userId);
  }, []);

  useEffect(() => {
    if (nodeId) getData();
  }, [nodeId]);

  useEffect(() => {
    if (columnMode === COLUMN_MODE.PROJECT || columnMode === COLUMN_MODE.RESEARCH) {
      setTakeoutColumn(false);
      setPRColumn(true);
    } else if (columnMode === COLUMN_MODE.TAKEOUT) {
      setTakeoutColumn(true);
      setPRColumn(false);
    } else {
      setPRColumn(false);
      setTakeoutColumn(false);
    }
  }, [columnMode]);

  useImperativeHandle(ref, () => ({
    grid: gridRef.current.grid,
    enableNewFolder,
    enableNewTemplateFile,
    enableNewProjectFolder,
    enableNewResearchFolder,
  }));

  /**
   * 모달
   */
  //dyyoo
  const [opened, setOpened] = useState(false);
  const [docModalObj, setDocModalObj] = useState({});

  const openModal = () => {
    setOpened(true);
  };
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 새 폴더 입력창 활성화
   */
  const enableNewFolder = () => {
    gridRef.current?.grid.api.setPinnedTopRowData([{ name: "", data: { dataType: DATA_TYPE.FOLDER.key }, isNewFolder: true }]);
  };

  /**
   * 템플릿 파일 입력창 활성화
   */
  const enableNewTemplateFile = (file) => {
    gridRef.current?.grid.api.setPinnedTopRowData([{ name: "", data: { dataType: DATA_TYPE.DOCUMENT.key, ...file }, isNewTemplateFile: true }]);
  };

  /**
   * 프로젝트 분류폴더 입력창 활성화
   */
  const enableNewProjectFolder = () => {
    gridRef.current?.grid.api.setPinnedTopRowData([{ name: "", data: { dataType: DATA_TYPE.FOLDER.key }, isNewProjectFolder: true }]);
  };

  /**
   * 연구과제 분류폴더 입력창 활성화
   */
  const enableNewResearchFolder = () => {
    gridRef.current?.grid.api.setPinnedTopRowData([{ name: "", data: { dataType: DATA_TYPE.FOLDER.key }, isNewResearchFolder: true }]);
  };

  /**
   * 컨트롤 키 제어 (이동, 복사 단축키)
   */
  const handleCtrlKey = async (event) => {
    // 이동/복사 데이터 만들기
    const makeCopyCutSources = () => {
      const selectedList = gridRef.current?.grid.api.getSelectedRows();

      const sources = {
        sourceFolders: selectedList.filter((item) => DATA_TYPE.FOLDER.key === item.data.dataType).map((item) => item.data.rObjectId),
        sourceFiles: selectedList.filter((item) => DATA_TYPE.DOCUMENT.key === item.data.dataType).map((item) => item.data.rObjectId),
        sourcePjts: selectedList.filter((item) => DATA_TYPE.PROJECT.key === item.data.dataType).map((item) => item.data.rObjectId),
        sourceRscs: selectedList.filter((item) => DATA_TYPE.RESEARCH.key === item.data.dataType).map((item) => item.data.rObjectId),
      };

      return sources;
    };

    // 윈도우일 경우 ctrlKey, 맥일 경우 metaKey
    const charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "x") {
      event.stopPropagation();
      const sources = makeCopyCutSources();
      moveData(sources);
    } else if ((event.ctrlKey || event.metaKey) && charCode === "c") {
      const sources = makeCopyCutSources();
      copyData(sources);
    } else if ((event.ctrlKey || event.metaKey) && charCode === "v") {
      const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
      const key = parsedNodeId.key;
      const deptKey = parsedNodeId.deptKey;

      const pasted = await CommonUtil.pasteString();
      const parsed = CommonUtil.isJson(pasted) && JSON.parse(pasted);
      if (parsed && Object.values(CLIPBOARD_TYPE).includes(parsed.uptPthGbn)) {
        // objectId일 경우
        if (CommonUtil.isObjectId(key)) {
          const response = await DataApi.getDataOne({ params: { dataId: key } });

          const targetGubun = response.data.response.uFolType;
          const targetDboxId = key;
          await pasteData(parsed, targetGubun, targetDboxId);
        }
        // 프로젝트/투자일 경우
        else if (CommonUtil.isPjtCode(key)) {
          const response = await ProjectApi.getProjectOne({ params: { pjtCode: key } });

          const targetGubun = "PJC";
          const targetDboxId = response.data.response.rObjectId;
          await pasteData(parsed, targetGubun, targetDboxId);
        }
        // 연구과제일 경우
        else if (CommonUtil.isRschCode(key)) {
          const response = await ResearchApi.getResearchOne({ params: { rschCode: key } });

          const targetGubun = "RSC";
          const targetDboxId = response.data.response.rObjectId;
          await pasteData(parsed, targetGubun, targetDboxId);
        }
        // 부서함일 경우
        else if (key === CATEGORY_FOLDER.DEPT.key) {
          const response = await DeptApi.getDeptOne({ params: { deptId: deptKey || user.orgId } });
          const targetGubun = "DPC";
          const targetDboxId = response.data.response.uCabinetCode;
          await pasteData(parsed, targetGubun, targetDboxId);
        }
        // 프로젝트/투자 > 주관일 경우
        else if (key === PROJECT_FOLDER.MAIN.key) {
          const response = await DeptApi.getDeptOne({ params: { deptId: deptKey || user.orgId } });
          const targetGubun = "POW";
          const targetDboxId = response.data.response.uCabinetCode;
          await pasteData(parsed, targetGubun, targetDboxId);
        }
        // 연구과제 > 주관일 경우
        else if (key === RESEARCH_FOLDER.MAIN.key) {
          const response = await DeptApi.getDeptOne({ params: { deptId: deptKey || user.orgId } });
          const targetGubun = "ROW";
          const targetDboxId = response.data.response.uCabinetCode;
          await pasteData(parsed, targetGubun, targetDboxId);
        }
      }
    }
  };

  /**
   * 자료 이동
   */
  const moveData = ({ sourceFolders, sourceFiles, sourcePjts, sourceRscs }) => {
    const form = {
      uptPthGbn: CLIPBOARD_TYPE.MOVE,
      sourceFolders,
      sourceFiles,
      sourcePjts,
      sourceRscs,
    };
    const json = JSON.stringify(form);
    CommonUtil.copyString(json);
  };

  /**
   * 자료 복사
   */
  const copyData = ({ sourceFolders, sourceFiles, sourcePjts, sourceRscs }) => {
    const form = {
      uptPthGbn: CLIPBOARD_TYPE.COPY,
      sourceFolders,
      sourceFiles,
      sourcePjts,
      sourceRscs,
    };
    const json = JSON.stringify(form);
    CommonUtil.copyString(json);
  };

  /**
   * 자료 붙여넣기
   */
  const pasteData = async (params, targetGubun, targetDboxId, transCause) => {
    try {
      const response = await DataApi.changeDataPath({ params: { ...params, targetGubun, targetDboxId, transCause } });
      window.location.reload();
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 컨텍스트 메뉴 열기
   */
  const openGridContextMenu = (event, node) => {
    event.preventDefault();
    event.stopPropagation();

    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;

    // 컨텍스트 메뉴 종류 설정
    let type;

    if (node) {
      // 우클릭된 노드 선택 (기 선택된 리스트에 현재 선택한 노드가 있을 경우 선택 초기화 하지 않음)
      const containsSelf = gridRef.current?.grid.api.getSelectedRows().find((item) => item.key === node.data.key);
      node.setSelected(true, !containsSelf);

      // 그리드에 이미 선택된 메뉴
      const selectedRows = gridRef.current?.grid.api.getSelectedRows();
      const mapped = selectedRows.map((item) => item.data?.dataType); // 현재 클릭된 메뉴 포함
      const distinctDataTypes = CommonUtil.toDistinct(mapped); // 중복 제거

      // 여러 종류일 경우
      if (distinctDataTypes.length > 1) {
        if (distinctDataTypes.includes(DATA_TYPE.FOLDER.key) && distinctDataTypes.includes(DATA_TYPE.DOCUMENT.key)) {
          type = MULTI_FD;
        }
      }
      // 단일 종류일 경우
      else if (distinctDataTypes.length === 1) {
        const dataType = distinctDataTypes[0];
        if (dataType === DATA_TYPE.FOLDER.key) type = FOLDER;
        if (dataType === DATA_TYPE.DOCUMENT.key) type = DOC; //************************ 원래 DOC */
        // if (node.data?.data?.dataType === DATA_TYPE.DOCUMENT.key) type = SEARCH;//************************ 원래 DOC */
        if (dataType === DATA_TYPE.PROJECT.key) type = PROJECT;
        if (dataType === DATA_TYPE.RESEARCH.key) type = RESEARCH;
      }
    } else {
      if (
        CommonUtil.isObjectId(key) ||
        CommonUtil.isPjtCode(key) ||
        CommonUtil.isRschCode(key) ||
        key === CATEGORY_FOLDER.DEPT.key ||
        categoryKey === CATEGORY_FOLDER.DEPT.key ||
        key === PROJECT_FOLDER.MAIN.key ||
        key === PROJECT_MAIN_FOLDER.FINISHED.key ||
        categoryKey === PROJECT_MAIN_FOLDER.FINISHED.key ||
        key === PROJECT_FOLDER.JOIN.key ||
        key === PROJECT_JOIN_FOLDER.FINISHED.key ||
        key === RESEARCH_FOLDER.MAIN.key ||
        key === RESEARCH_MAIN_FOLDER.FINISHED.key ||
        categoryKey === RESEARCH_MAIN_FOLDER.FINISHED.key ||
        key === RESEARCH_FOLDER.JOIN.key ||
        key === RESEARCH_JOIN_FOLDER.FINISHED.key
      ) {
        type = EMPTY;
      }
    }

    // 컨텍스트 메뉴 열기
    openContextMenu(
      type,
      {
        x: event.clientX,
        y: event.clientY,
      },
      node,
    );
  };

  /**
   * 데이터 검색
   */
  const searchData = () => {
    alert("searchData!!!");
  };

  /**
   * 데이터 불러오기
   */
  const getData = async () => {
    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;
    const deptKey = parsedNodeId.deptKey;

    // objectId일 경우
    if (CommonUtil.isObjectId(key)) {
      loadFolderChildren(key, categoryKey, deptKey);
    }
    // 프로젝트/투자 코드일 경우
    else if (CommonUtil.isPjtCode(key)) {
      loadProjectChildren(key, categoryKey, deptKey);
    }
    // 연구과제 코드일 경우
    else if (CommonUtil.isRschCode(key)) {
      loadResearchChildren(key, categoryKey, deptKey);
    }
    // 부서 코드일 경우
    else if (CommonUtil.isDeptCode(key)) {
      // 프로젝트/투자 트리일 경우
      if (treeType === TREE_PROJECT) {
        if (prStatus === PR_ALL || prStatus === PR_DOING) {
          loadLiveMainProjectChildrenForProjectTree(key);
        } else if (prStatus === PR_DONE) {
          loadFinishedMainProjectChildrenForProjectTree(key);
        }
      }
      // 연구과제 트리일 경우
      else if (treeType === TREE_RESEARCH) {
        if (prStatus === PR_ALL || prStatus === PR_DOING) {
          loadLiveMainResearchChildrenForResearchTree(key);
        } else if (prStatus === PR_DONE) {
          loadFinishedMainResearchChildrenForResearchTree(key);
        }
      }
      // 전체 또는 공유그룹일 경우
      else {
        loadDefaultChildren(key);
      }
    }
    // 카테고리일 경우
    else if (key === CATEGORY_FOLDER.TAKEOUT.key) loadTakeoutChildren();
    else if (key === CATEGORY_FOLDER.DEPT.key) loadDeptChildren(deptKey);
    else if (key === DEPT_FOLDER.APPROVAL.key) loadApprovalChildren(deptKey);
    else if (key === CATEGORY_FOLDER.PROJECT.key) loadDefaultProjectChildren(deptKey);
    else if (key === CATEGORY_FOLDER.RESEARCH.key) loadDefaultResearchChildren(deptKey);
    else if (key === PROJECT_FOLDER.MAIN.key) loadLiveMainProjectChildren(deptKey);
    else if (key === PROJECT_FOLDER.JOIN.key) loadLiveJoinProjectChildren(deptKey);
    else if (key === PROJECT_MAIN_FOLDER.FINISHED.key) loadFinishedMainProjectChildren(deptKey);
    else if (key === PROJECT_JOIN_FOLDER.FINISHED.key) loadFinishedJoinProjectChildren(deptKey);
    else if (key === RESEARCH_FOLDER.MAIN.key) loadLiveMainResearchChildren(deptKey);
    else if (key === RESEARCH_FOLDER.JOIN.key) loadLiveJoinResearchChildren(deptKey);
    else if (key === RESEARCH_MAIN_FOLDER.FINISHED.key) loadFinishedMainResearchChildren(deptKey);
    else if (key === RESEARCH_JOIN_FOLDER.FINISHED.key) loadFinishedJoinResearchChildren(deptKey);
    else if (key === CATEGORY_FOLDER.SHARE.key) loadShareChildren(deptKey);
    else {
      setColumnMode(COLUMN_MODE.DEFAULT);
    }
  };

  /**
   * 반출함 하위 불러오기
   */
  const loadTakeoutChildren = async (deptKey) => {
    try {
      // debugger
      // 기본 컬럼으로 변경
      setColumnMode(COLUMN_MODE.TAKEOUT);

      // const approvalTreeData = Object.values(DEPT_FOLDER).map((item) => ({
      //   key: item.key,
      //   name: item.desc,
      //   type: TREE_TYPE.CATEGORY.key,
      //   data: item,
      // }));
      const response = await TakeoutApi.getTakeoutList({});
      const rowData = mapTakeout(response.data.response, CATEGORY_FOLDER.TAKEOUT.key, deptKey);

      gridRef.current.grid.api.setRowData([...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 기본 폴더 불러오기
   */
  const loadDefaultChildren = (key) => {
    // 기본 컬럼으로 변경
    setColumnMode(COLUMN_MODE.DEFAULT);

    const rowData = Object.values(CATEGORY_FOLDER)
      .filter((item) => ![CATEGORY_FOLDER.SHARE.key, CATEGORY_FOLDER.TAKEOUT.key, CATEGORY_FOLDER.TRASH.key].includes(item.key)) // 공유협업, 반출함, 휴지통 제외
      .filter((item) => user.comOrgId === COM_CODE.DKS.key || CATEGORY_FOLDER.RESEARCH.key !== item.key) // 동국제강이 아닐 경우 연구과제 제외
      .map((item) => ({
        key: `${item.key}${TREE_KEY_DIVIDER}${key}`,
        name: item.desc,
        type: TREE_TYPE.CATEGORY.key,
        data: item,
      }));

    gridRef.current.grid.api.setRowData(rowData);
  };

  /**
   * 기본 프로젝트 폴더 불러오기
   */
  const loadDefaultProjectChildren = (deptKey) => {
    // 기본 컬럼으로 변경
    setColumnMode(COLUMN_MODE.DEFAULT);

    const rowData = Object.values(PROJECT_FOLDER).map((item) => ({
      key: deptKey ? `${item.key}${TREE_KEY_DIVIDER}${deptKey}` : item.key,
      name: item.desc,
      type: TREE_TYPE.CATEGORY.key,
      data: item,
    }));

    gridRef.current.grid.api.setRowData(rowData);
  };

  /**
   * 기본 연구과제 폴더 불러오기
   */
  const loadDefaultResearchChildren = (deptKey) => {
    // 기본 컬럼으로 변경
    setColumnMode(COLUMN_MODE.DEFAULT);

    const rowData = Object.values(RESEARCH_FOLDER).map((item) => ({
      key: deptKey ? `${item.key}${TREE_KEY_DIVIDER}${deptKey}` : item.key,
      name: item.desc,
      type: TREE_TYPE.CATEGORY.key,
      data: item,
    }));

    gridRef.current.grid.api.setRowData(rowData);
  };

  /**
   * 부서함 하위 불러오기
   */
  const loadDeptChildren = async (deptKey) => {
    try {
      // 기본 컬럼으로 변경
      setColumnMode(COLUMN_MODE.DEFAULT);

      const approvalTreeData = Object.values(DEPT_FOLDER).map((item) => ({
        key: item.key,
        name: item.desc,
        type: TREE_TYPE.CATEGORY.key,
        data: item,
      }));

      const response = await DataApi.getDataChildren({ params: { dataId: deptKey || user.orgId, hamType: HAM_TYPE.DEPT.key, withDoc: true } });
      const rowData = mapData(response.data.response, CATEGORY_FOLDER.DEPT.key, deptKey);

      gridRef.current.grid.api.setRowData([...approvalTreeData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 전자결재함 하위 불러오기
   */
  const loadApprovalChildren = async (deptKey) => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "DWF", withDoc: true } });
      const rowData = mapData(response.data.response, DEPT_FOLDER.APPROVAL.key, deptKey);
      gridRef.current.grid.api.setRowData(rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자함 하위 불러오기
   */
  const loadProjectChildren = async (pjtCode, categoryKey, deptKey) => {
    try {
      // 기본 컬럼으로 변경
      setColumnMode(COLUMN_MODE.DEFAULT);

      const response = await DataApi.getDataChildren({ params: { dataId: pjtCode, hamType: HAM_TYPE.PROJECT.key, withDoc: true } });
      const rowData = mapData(response.data.response, categoryKey, deptKey);

      gridRef.current.grid.api.setRowData(rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제함 하위 불러오기
   */
  const loadResearchChildren = async (rschCode, categoryKey, deptKey) => {
    try {
      // 기본 컬럼으로 변경
      setColumnMode(COLUMN_MODE.DEFAULT);

      const response = await DataApi.getDataChildren({ params: { dataId: rschCode, hamType: HAM_TYPE.RESEARCH.key, withDoc: true } });
      const rowData = mapData(response.data.response, categoryKey, deptKey);

      gridRef.current.grid.api.setRowData(rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 진행중 하위 불러오기
   */
  const loadLiveMainProjectChildren = async (parent, deptKey) => {
    try {
      // 프로젝트/투자용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.PROJECT);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const rowData = mapProject(response.data.response, parent, deptKey);

      // 완료함 조회
      const projectTreeData = Object.values(PROJECT_MAIN_FOLDER).map((item) => {
        const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
        return {
          key: keyMade,
          name: item.desc,
          type: TREE_TYPE.CATEGORY.key,
          data: item,
        };
      });

      gridRef.current.grid.api.setRowData([...projectTreeData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 진행중 하위 불러오기 (treeType이 프로젝트/투자인 경우)
   */
  const loadLiveMainProjectChildrenForProjectTree = async (deptKey) => {
    try {
      // 프로젝트/투자용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.PROJECT);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const rowData = mapProject(response.data.response, null, deptKey);

      // 전체 표시일 경우에만 완료함 표시
      if (prStatus === PR_ALL) {
        const projectTreeData = Object.values(PROJECT_MAIN_FOLDER).map((item) => {
          const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
          return {
            key: keyMade,
            name: item.desc,
            type: TREE_TYPE.CATEGORY.key,
            data: item,
          };
        });
        gridRef.current.grid.api.setRowData([...projectTreeData, ...rowData]);
      } else {
        gridRef.current.grid.api.setRowData(rowData);
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 참여 진행중 하위 불러오기
   */
  const loadLiveJoinProjectChildren = async (parent, deptKey) => {
    try {
      // 프로젝트/투자용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.PROJECT);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const rowData = mapProject(response.data.response, parent, deptKey);

      // 완료함 조회
      const projectTreeData = Object.values(PROJECT_JOIN_FOLDER).map((item) => {
        const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
        return {
          key: keyMade,
          name: item.desc,
          type: TREE_TYPE.CATEGORY.key,
          data: item,
        };
      });

      gridRef.current.grid.api.setRowData([...projectTreeData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 완료 하위 불러오기
   */
  const loadFinishedMainProjectChildren = async (deptKey) => {
    try {
      // 프로젝트/투자용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.PROJECT);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const rowData = mapProject(response.data.response, PROJECT_MAIN_FOLDER.FINISHED.key, deptKey);

      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey || user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "PCL" },
      });
      const dataRowData = mapData(dataResponse.data.response, PROJECT_MAIN_FOLDER.FINISHED.key, deptKey);

      gridRef.current.grid.api.setRowData([...dataRowData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 완료 하위 불러오기 (treeType이 프로젝트/투자인 경우)
   */
  const loadFinishedMainProjectChildrenForProjectTree = async (deptKey) => {
    try {
      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey, hamType: HAM_TYPE.DEPT.key, folderType: "PCL" },
      });
      const dataRowData = mapData(dataResponse.data.response, null, deptKey);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const rowData = mapProject(response.data.response, null, deptKey);

      gridRef.current.grid.api.setRowData([...dataRowData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 참여 완료 하위 불러오기
   */
  const loadFinishedJoinProjectChildren = async (deptKey) => {
    try {
      // 프로젝트/투자용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.PROJECT);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.JOIN, finishYn: "Y", withListOpen: true } });
      const rowData = mapProject(response.data.response, PROJECT_JOIN_FOLDER.FINISHED.key, deptKey);

      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey || user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "PCL" },
      });
      const dataRowData = mapData(dataResponse.data.response, PROJECT_JOIN_FOLDER.FINISHED.key, deptKey);

      gridRef.current.grid.api.setRowData([...dataRowData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 진행중 하위 불러오기
   */
  const loadLiveMainResearchChildren = async (deptKey) => {
    try {
      // 연구과제용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.RESEARCH);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const rowData = mapResearch(response.data.response, RESEARCH_FOLDER.MAIN.key, deptKey);

      // 완료함 조회
      const researchTreeData = Object.values(RESEARCH_MAIN_FOLDER).map((item) => {
        const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
        return {
          key: keyMade,
          name: item.desc,
          type: TREE_TYPE.CATEGORY.key,
          data: item,
        };
      });

      gridRef.current.grid.api.setRowData([...researchTreeData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 진행중 하위 불러오기 (treeType이 연구과제일 경우)
   */
  const loadLiveMainResearchChildrenForResearchTree = async (deptKey) => {
    try {
      // 연구과제용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.RESEARCH);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const rowData = mapResearch(response.data.response, RESEARCH_FOLDER.MAIN.key, deptKey);

      // 완료함 조회
      const researchTreeData = Object.values(RESEARCH_MAIN_FOLDER).map((item) => {
        const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
        return {
          key: keyMade,
          name: item.desc,
          type: TREE_TYPE.CATEGORY.key,
          data: item,
        };
      });

      gridRef.current.grid.api.setRowData([...researchTreeData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 참여 진행중 하위 불러오기
   */
  const loadLiveJoinResearchChildren = async (deptKey) => {
    try {
      // 연구과제용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.RESEARCH);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const rowData = mapResearch(response.data.response, RESEARCH_FOLDER.JOIN.key, deptKey);

      // 완료함 조회
      const researchTreeData = Object.values(RESEARCH_JOIN_FOLDER).map((item) => {
        const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
        return {
          key: keyMade,
          name: item.desc,
          type: TREE_TYPE.CATEGORY.key,
          data: item,
        };
      });

      gridRef.current.grid.api.setRowData([...researchTreeData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 완료 하위 불러오기
   */
  const loadFinishedMainResearchChildren = async (deptKey) => {
    try {
      // 연구과제용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.RESEARCH);

      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey || user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "RCL" },
      });
      const dataRowData = mapData(dataResponse.data.response, RESEARCH_MAIN_FOLDER.FINISHED.key, deptKey);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const rowData = mapResearch(response.data.response, RESEARCH_MAIN_FOLDER.FINISHED.key, deptKey);

      gridRef.current.grid.api.setRowData([...dataRowData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 완료 하위 불러오기 (treeType이 연구과제일 경우)
   */
  const loadFinishedMainResearchChildrenForResearchTree = async (deptKey) => {
    try {
      // 연구과제용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.RESEARCH);

      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey || user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "RCL" },
      });
      const dataRowData = mapData(dataResponse.data.response, null, deptKey);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const rowData = mapResearch(response.data.response, null, deptKey);

      gridRef.current.grid.api.setRowData([...dataRowData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 참여 완료 하위 불러오기
   */
  const loadFinishedJoinResearchChildren = async (deptKey) => {
    try {
      // 연구과제용 컬럼으로 변경
      setColumnMode(COLUMN_MODE.RESEARCH);

      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey || user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "RCL" },
      });
      const dataRowData = mapData(dataResponse.data.response, RESEARCH_JOIN_FOLDER.FINISHED.key, deptKey);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "Y", withListOpen: true } });
      const rowData = mapResearch(response.data.response, RESEARCH_JOIN_FOLDER.FINISHED.key, deptKey);

      gridRef.current.grid.api.setRowData([...dataRowData, ...rowData]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 공유/협업 하위 불러오기
   */
  const loadShareChildren = async (deptKey) => {
    try {
      // 기본 컬럼으로 변경
      setColumnMode(COLUMN_MODE.DEFAULT);

      const response = await ShareFolderApi.getShareFolderList();
      const rowData = mapData(response.data.response, CATEGORY_FOLDER.SHARE.key, deptKey);

      gridRef.current.grid.api.setRowData(rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 폴더 하위 불러오기
   */
  const loadFolderChildren = async (key, categoryKey, deptKey) => {
    try {
      // 기본 컬럼으로 변경
      setColumnMode(COLUMN_MODE.DEFAULT);

      // TODO 프로젝트 분류폴더와 프로젝트 하위 폴더의 분류 기준 정해야 함
      const folderType = categoryKey === PROJECT_MAIN_FOLDER.FINISHED.key ? "PCL" : RESEARCH_MAIN_FOLDER.FINISHED.key ? "RCL" : undefined;

      const response = await DataApi.getDataChildren({ params: { dataId: key, folderType, withDoc: true } });
      const rowData = mapData(response.data.response, categoryKey, deptKey);

      // 완료함일 경우 같은 레벨의 프로젝트/투자 또는 연구과제도 조회
      if (categoryKey === PROJECT_MAIN_FOLDER.FINISHED.key) {
        const projectResponse = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, uFolId: key, finishYn: "Y" } });
        const projectRowData = mapProject(projectResponse.data.response, categoryKey, deptKey);

        gridRef.current.grid.api.setRowData([...rowData, ...projectRowData]);
      } else if (categoryKey === RESEARCH_MAIN_FOLDER.FINISHED.key) {
        const researchResponse = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, uFolId: key, finishYn: "Y" } });
        const researchRowData = mapResearch(researchResponse.data.response, categoryKey, deptKey);

        gridRef.current.grid.api.setRowData([...rowData, ...researchRowData]);
      } else {
        gridRef.current.grid.api.setRowData(rowData);
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 폴더, 문서 데이터 매핑
   */
  const mapData = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값
      const keyMade = CommonUtil.makeNodeId(item.rObjectId, categoryKey, deptKey);

      if (item.dataType === DATA_TYPE.FOLDER.key) {
        return {
          key: keyMade,
          name: item.uFolName,
          type: TREE_TYPE.DATA.key,
          status: item.folStatusName,
          creator: item.createUserDetail?.displayName,
          modDate: item.uUpdateDate,
          size: item.folSize,
          tag: item.uFolTag,
          createDate: item.uCreateDate,
          data: item,
        };
      } else if (item.dataType === DATA_TYPE.DOCUMENT.key) {
        return {
          key: keyMade,
          name: item.objectName,
          type: TREE_TYPE.DATA.key,
          status: item.docStatusName,
          creator: item.regUserDetail?.displayName,
          feedback: item.feedbackCount,
          approval:
            item.approvals?.length > 1
              ? item.approvals?.length
              : item.approvals?.length === 1
              ? `${item.approvals[0].uWfSystem}/${item.approvals[0].uWfForm}`
              : undefined,
          lastApprover: item.approvals?.length === 1 ? item.approvals[0].uWfApprover : undefined,
          modDate: item.uUpdateDate,
          expireDate: item.uExpiredDate,
          version: item.lastVersion,
          size: item.rContentSize,
          secLevel: item.secLevelName,
          createDate: item.uRegDate,
          tag: item.uDocTag,
          ext: item.uFileExt,
          classify: item.uDocClass,
          data: item,
        };
      }
    });
  };
  /**
   * 반출함
   */
  const mapTakeout = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값
      // debugger
      const keyMade = CommonUtil.makeNodeId(item.rObjectId, categoryKey, deptKey);
      let hamType = item.hamType === "D" ? "부서함" : item.hamType === "P" ? "프로젝트/투자" : "연구과제";
      let editPath = (item.uFolPath ? item.uFolPath : "").split("/").join(">");
      let docPath = hamType.concat(item.hamType === "D" ? "" : item.prOwnDeptCode === user.orgId ? ">소유" : ">참여", editPath);
      return {
        key: keyMade,
        type: TREE_TYPE.DATA.key,
        apprType: item.uApprType === "P" ? "사전승인" : item.uApprType === "A" ? "자동승인" : "프리패스",
        reqDate: item.uReqDate,
        limitDate: item.uLimitDate ? item.uLimitDate : "",
        reqStatus: item.uReqStatus === "A" ? "승인" : item.uReqStatus == "R" ? "요청중" : "반려",
        docPath: docPath,
        hamType: hamType,
        folPath: docPath,

        name: item.uReqDocName,
        ext: item.uReqDocExt,
        uFileExt: item.uReqDocExt,
        actionDate: item.uActionDate,
        version: item.uVersionLabel,
        secLevel: item.uSecLevel == "T" ? "팀내" : item.uSecLevel == "S" ? "제한" : item.uSecLevel == "C" ? "사내" : "그룹사내",
        dataType: DATA_TYPE.DOCUMENT.key,

        rVersionLabel:['', item.uVersionLabel],
        rObjectId: item.uReqDocId,
        docKey: item.uReqDocKey,
        objectName: item.uReqDocName,
        rContentSize: item.uDocSize,
        reqStatusCode: item.uReqStatus,
        isTakeout: true,
      };
    });
  };

  /**
   * 프로젝트/투자 데이터 매핑
   */
  const mapProject = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값 세팅
      const keyMade = CommonUtil.makeNodeId(item.uPjtCode, categoryKey, deptKey);

      return {
        key: keyMade,
        name: item.uPjtName,
        type: TREE_TYPE.DATA.key,
        startYear: item.uStartYear,
        ownDept: item.ownDeptDetail?.orgNm,
        chief: item.chiefDetail?.displayName,
        modDate: item.uUpdateDate,
        createDate: item.uCreateDate,
        data: {
          dataType: DATA_TYPE.PROJECT.key,
          ...item,
        },
      };
    });
  };

  /**
   * 연구과제 데이터 매핑
   */
  const mapResearch = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값 세팅
      const keyMade = CommonUtil.makeNodeId(item.uRschCode, categoryKey, deptKey);

      return {
        key: keyMade,
        name: item.uRschName,
        type: TREE_TYPE.DATA.key,
        startYear: item.uStartYear,
        ownDept: item.ownDeptDetail?.orgNm,
        chief: item.chiefDetail?.displayName,
        modDate: item.uUpdateDate,
        createDate: item.uCreateDate,
        data: {
          dataType: DATA_TYPE.RESEARCH.key,
          ...item,
        },
      };
    });
  };

  /**
   * 프로젝트/투자, 연구과제 전용 컬럼 설정
   */
  const setPRColumn = (show) => {
    gridRef.current.grid.columnApi.applyColumnState({
      state: [
        { colId: "startYear", hide: !show },
        { colId: "ownDept", hide: !show },
        { colId: "chief", hide: !show },
      ],
    });
  };

  /**
   * 반출함 전용 컬럼 설정
   */
  const setTakeoutColumn = (show) => {
    gridRef.current.grid.columnApi.applyColumnState({
      state: [
        { colId: "apprType", hide: !show },
        { colId: "reqDate", hide: !show },
        { colId: "limitDate", hide: !show },
        { colId: "reqStatus", hide: !show },
        { colId: "hamType", hide: !show },
        { colId: "folPath", hide: !show },

        //숨김
        { colId: "status", hide: show },
        { colId: "creator", hide: show },
        { colId: "feedback", hide: show },
        { colId: "approval", hide: show },
        { colId: "lastApprover", hide: show },
        { colId: "modDate", hide: show },
        { colId: "expireDate", hide: show },
        { colId: "lastApprover", hide: show },
        { colId: "size", hide: show },
        { colId: "createDate", hide: show },
        { colId: "tag", hide: show },
        { colId: "classify", hide: show },
      ],
    });
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = ({ api, columnApi }) => {
    // 컬럼 상태 초기화
    const docGridColumn = CommonUtil.getLocalStorageItem(DOC_GRID_COLUMN);
    if (docGridColumn) columnApi.setColumnState(docGridColumn[pageKey]);

    // 편집모드 닫을 때마다 새폴더 입력창 제거
    api.addEventListener("pinnedRowDataChanged", ({ api }) => {
      const count = api.getPinnedTopRowCount();
      if (count === 0) window.location.reload();
      // if (count === 0 && nodeId) getData();
    });
  };

  /**
   * 정렬 이벤트
   */
  const changeSort = ({ columnApi }) => {
    saveColumnState(columnApi);
  };

  /**
   * 필터 이벤트
   */
  const changeFilter = ({ columnApi }) => {
    saveColumnState(columnApi);
  };

  /**
   * 컬럼 이동 이벤트
   */
  const moveColumn = ({ columnApi }) => {
    saveColumnState(columnApi);
    // TODO 새로고침 시 순서 초기화되는 현상 수정 필요
  };

  /**
   * 컬럼 리사이즈 이벤트
   */
  const resizeColumn = ({ columnApi }) => {
    saveColumnState(columnApi);
  };

  /**
   * 컬럼 상태 저장
   */
  const saveColumnState = (columnApi) => {
    const columnState = columnApi.getColumnState();

    const docGridColumn = CommonUtil.getLocalStorageItem(DOC_GRID_COLUMN);
    CommonUtil.setLocalStorageItem(DOC_GRID_COLUMN, {
      ...docGridColumn,
      [pageKey]: columnState,
    });
  };

  /**
   * 이름 더블클릭
   */
  const doubleClickName = async (params) => {
    //  TODO: (dyyoo)
    if (params.data.data.dataType === DATA_TYPE.DOCUMENT.key) {
      const rObjectId = params.data.data.rObjectId;
      const fileKey = params.data.data.uDocKey;
      const fileSize = params.data.data.rContentSize;
      const response = await DataApi.getDataIsLock({
        params: { dataId: rObjectId, dataType: params.data.data.dataType, hasWAuth: true, sOpenContent: "CURRENT" },
      });
      if (response.data.success) {
        const chkDto = response.data.response.DTO;
        if (nodeId === CATEGORY_FOLDER.TAKEOUT.key) {
          window.WSFileOpen(chkDto.currentObjectId, chkDto.currentVersionLabel, chkDto.currentObjectName, chkDto.flag);
          return;
        }
        if (!response.data.response.LOCK) {
          if (params.data.data.readable) {
            if (response.data.response.W_AUTH) {
              // 1 : 현재버전저장, 2: 새로운버전 저장, 9: 실시간저장 + 현재버전, 10 : 실시간저장 + 새로운버전
              // 4 : 보기
              window.WSFileOpen(chkDto.currentObjectId, chkDto.currentVersionLabel, chkDto.currentObjectName, chkDto.flag);
            } else {
              window.WSFileOpen(chkDto.currentObjectId, chkDto.currentVersionLabel, chkDto.currentObjectName, chkDto.flag);
            }
          } else {
            alert("권한이 없습니다.");
          }
          // 쓰기 권한 있을 경우 편집모드 열기 (agent요청)
          // 읽기 권한 있을 경우 읽기모드 열기 (agent요청)
          // 권한 없을 경우 alert();
        } else {
          setDocModalObj({
            fileKey,
            fileSize,
            lockValue: response.data.response.LOCK,
            rObjectId: chkDto.currentObjectId,
            contentVersion: chkDto.currentVersionLabel,
            fileName: chkDto.currentObjectName,
          });
          openModal();
        }
      }
      // window.WSFileOpen(rObjectId, contentVersion, fileName, 1);  // 1: 덮어쓰기, 2: 버전갱신
    } else {
      const parsed = queryString.parse(history.location.search);
      parsed[pageKeyNodeId] = params.data.key;
      const stringified = queryString.stringify(parsed);
      history.push(`/doc?${stringified}`);
    }
  };

  /**
   * 필터 클릭
   */
  const clickFilter = (props) => {
    alert("clickFilter " + props.displayName);
  };

  /**
   * 업로드 데이터 설정
   */
  const setUploadForm = async () => {
    // 파일 추가 후 이벤트
    window.RAONKUPLOAD_AfterAddAllFile = async (uploadId) => {
      try {
        const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
        const key = parsedNodeId.key;
        const deptKey = parsedNodeId.deptKey;

        // validation 체크
        const isValid = await validateUpload(uploadId);
        if (isValid) {
          window.RAONKUPLOAD.AddHttpHeader("Cookie", document.cookie, uploadId);

          // 오브젝트 아이디일 경우
          if (CommonUtil.isObjectId(key)) {
            window.RAONKUPLOAD.AddFormData("hamType", HAM_TYPE.FOLDER.key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("upObjectId", key, KUPLOAD_ID);
          }
          // 프로젝트/투자일 경우
          else if (CommonUtil.isPjtCode(key)) {
            window.RAONKUPLOAD.AddFormData("hamType", HAM_TYPE.PROJECT.key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("upObjectId", key, KUPLOAD_ID);
          }
          // 연구과제일 경우
          else if (CommonUtil.isRschCode(key)) {
            window.RAONKUPLOAD.AddFormData("hamType", HAM_TYPE.RESEARCH.key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("upObjectId", key, KUPLOAD_ID);
          }
          // 부서함일 경우
          else if (key === CATEGORY_FOLDER.DEPT.key) {
            window.RAONKUPLOAD.AddFormData("hamType", HAM_TYPE.DEPT.key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("upObjectId", deptKey || user.orgId, KUPLOAD_ID);
          }
          // 프로젝트/투자 > 주관일 경우
          else if (key === PROJECT_FOLDER.MAIN.key) {
            window.RAONKUPLOAD.AddFormData("hamType", HAM_TYPE.PROJECT.key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("upObjectId", key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("prType", DATA_TYPE.PROJECT.key, KUPLOAD_ID);
          }
          // 연구과제 > 주관일 경우
          else if (key === RESEARCH_FOLDER.MAIN.key) {
            window.RAONKUPLOAD.AddFormData("hamType", HAM_TYPE.PROJECT.key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("upObjectId", key, KUPLOAD_ID);
            window.RAONKUPLOAD.AddFormData("prType", DATA_TYPE.RESEARCH.key, KUPLOAD_ID);
          }
          window.RAONKUPLOAD.AddFormData("uploadFlag", "S", KUPLOAD_ID);
          window.RAONKUPLOAD.Transfer(uploadId);
        }
      } catch (error) {
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      } finally {
        window.RAONKUPLOAD.DeleteAllFile(uploadId);
      }
      window.RAONKUPLOAD_AfterAddAllFile = undefined; // 리스너 제거
    };
  };

  /**
   * 업로드 검증
   */
  const validateUpload = async (uploadId) => {
    const response = await LimitValueApi.getLimitValueList();
    const regKey = LIMIT_VALUE_TYPE.REG.key;
    const sizeKey = LIMIT_VALUE_TYPE.SIZE.key;
    const regLimit = parseInt(response.data.response[regKey]);
    const sizeLimit = parseInt(response.data.response[sizeKey]);
    const kuploadCount = window.RAONKUPLOAD.GetTotalFileCount(uploadId);
    const kuploadSize = window.RAONKUPLOAD.GetTotalFileSize(uploadId);

    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;

    let isValid = true;

    // 잠금여부
    if (CommonUtil.isObjectId(key)) {
      const dataOneResponse = await DataApi.getDataOne({
        params: {
          dataId: key,
        },
      });

      if (dataOneResponse.data.response.uFolStatus === FOL_STATUS.LOCK.key) {
        isValid = false;

        openDialog(ALERT_DIALOG, {
          title: "업로드 불가",
          children: <Fragment>잠금 상태의 폴더 하위에는 업로드할 수 없습니다.</Fragment>,
        });
      }
    }

    // 사이즈 검증
    if (kuploadSize > sizeLimit) {
      isValid = false;

      const formatedSizeLimit = FormatUtil.formatFileSize(sizeLimit);
      const formatedKuploadSize = FormatUtil.formatFileSize(kuploadSize);
      openDialog(ALERT_DIALOG, {
        title: "업로드 불가",
        children: (
          <Fragment>
            폴더 내 자료가 총 {formatedSizeLimit} 이상이므로 업로드가 불가능합니다.
            <br />
            분리하여 요청해주시기 바랍니다.
            <br />- 제한값: {formatedSizeLimit} 현재용량: {formatedKuploadSize}
          </Fragment>
        ),
      });
    }
    // 개수 검증
    else if (kuploadCount > regLimit) {
      isValid = false;

      openDialog(ALERT_DIALOG, {
        title: "업로드 불가",
        children: (
          <Fragment>
            폴더 내 자료가 총 {regLimit}개 이상이므로 업로드가 불가능합니다.
            <br />
            분리하여 요청해주시기 바랍니다.
            <br />- 제한값: {regLimit} 현재개수: {kuploadCount}
          </Fragment>
        ),
      });
    }
    // 프로젝트/투자 > 주관에서 문서로 등록 금지
    else if (key === PROJECT_FOLDER.MAIN.key) {
      const listInfo = window.RAONKUPLOAD.GetListInfo();
      const isAllFolder = listInfo.newFile.every((item) => item.fileObject.isFolder === "1");
      if (!isAllFolder) {
        isValid = false;

        openDialog(ALERT_DIALOG, {
          title: "업로드 불가",
          children: "폴더를 먼저 생성하여 프로젝트를 생성하신 후 문서를 등록해 주시기 바랍니다.",
        });
      }
    }
    // 연구과제 > 주관에서 문서로 등록 금지
    else if (key === RESEARCH_FOLDER.MAIN.key) {
      const listInfo = window.RAONKUPLOAD.GetListInfo();
      const isAllFolder = listInfo.newFile.every((item) => item.fileObject.isFolder === "1");
      if (!isAllFolder) {
        isValid = false;

        openDialog(ALERT_DIALOG, {
          title: "업로드 불가",
          children: "폴더를 먼저 생성하여 연구과제를 생성하신 후 문서를 등록해 주시기 바랍니다.",
        });
      }
    }

    return isValid;
  };

  /**
   * 이름 수정 시작
   */
  const startEditing = async ({ api, data }) => {
    if (data.data.dataType === DATA_TYPE.FOLDER.key && data.data.uFolStatus === FOL_STATUS.LOCK.key) {
      api.stopEditing();
      openDialog(ALERT_DIALOG, {
        title: "업로드 불가",
        children: "잠금 처리된 폴더입니다.",
      });
    }
  };

  /**
   * 에디터 상태 취소
   */
  const stopEditing = async ({ api, data, oldValue, newValue }) => {
    const needAction = newValue && oldValue !== newValue;

    if (data.isNewFolder) {
      let folderConflict;
      if (needAction) folderConflict = await requestNewFolder(newValue);
      if (!folderConflict && needAction) {
        api.stopEditing();
        api.setPinnedTopRowData([]);
      }
    } else if (data.isNewTemplateFile) {
      let folderConflict;
      if (needAction) folderConflict = await requestNewTemplateFile(newValue, data.data.uTemplateType);
      if (!folderConflict && needAction) {
        api.stopEditing();
        api.setPinnedTopRowData([]);
      }
    } else if (data.isNewProjectFolder) {
      if (needAction) await requestNewProjectFolder(newValue);
      api.stopEditing();
      api.setPinnedTopRowData([]);
    } else if (data.isNewResearchFolder) {
      if (needAction) await requestNewResearchFolder(newValue);
      api.stopEditing();
      api.setPinnedTopRowData([]);
    } else {
      if (needAction) await requestDataNameChange(data.data.rObjectId, newValue);
      api.stopEditing();
    }
  };

  /**
   * 자료 이름 변경
   */
  const requestDataNameChange = async (dataId, name) => {
    try {
      await DataApi.updateDataOne({ params: { dataId, folder: { uFolName: name }, doc: { objectName: name } } });
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 새 폴더 만들기
   */
  const requestNewFolder = async (name) => {
    // 최상위에 대한 처리
    //   상위 키값이 DPC 또는 부서코드_DPC일 경우
    //   상위 키값이 POW, PFN, PIN, PIC, ROW, RFN, RIN, RIC 또는 부서코드_POW, PFN, PIN, PIC, ROW, RFN, RIN, RIC일 경우
    //   상위 키값이 DIM일 경우
    // 중간폴더에 대한 처리
    //   상위 u_fol_type이 DFO일 경우
    //   상위 u_fol_type이 DIF일 경우
    //   상위 u_fol_type이 DIF일 경우
    //   상위 u_fol_type이 PCL일 경우
    //   상위 u_fol_type이 PFO일 경우
    //   상위 u_fol_type이 RCL일 경우
    //   상위 u_fol_type이 RFO일 경우
    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;
    const deptKey = parsedNodeId.deptKey;

    try {
      // objectId일 경우
      if (CommonUtil.isObjectId(key)) {
        const dataOneResponse = await DataApi.getDataOne({
          params: {
            dataId: key,
          },
        });
        if (dataOneResponse.data.response) {
          await DataApi.postDataChildren({
            params: {
              dataId: key,
              dataName: name,
              dateType: "F",
              folderType: dataOneResponse.data.response.uFolType,
              hamType: "F",
            },
          });
        }
      }
      // 부서함일 경우
      else if (key === CATEGORY_FOLDER.DEPT.key) {
        await DataApi.postDataChildren({
          params: {
            dataId: deptKey || user.orgId,
            dataName: name,
            dateType: "F",
            folderType: "DFO",
            hamType: "D",
          },
        });
      }
      // 프로젝트/투자일 경우
      else if (CommonUtil.isPjtCode(key)) {
        await DataApi.postDataChildren({
          params: {
            dataId: key,
            dataName: name,
            dateType: "F",
            folderType: "PFO",
            hamType: "P",
          },
        });
      }
      // 연구과제일 경우
      else if (CommonUtil.isRschCode(key)) {
        await DataApi.postDataChildren({
          params: {
            dataId: key,
            dataName: name,
            dateType: "F",
            folderType: "RFO",
            hamType: "R",
          },
        });
      }
    } catch (error) {
      if (error?.response?.status === HttpStatus.CONFLICT) {
        openDialog(ALERT_DIALOG, {
          title: "폴더명 중복",
          children: <Fragment>같은 이름의 폴더가 존재합니다.</Fragment>,
        });
        return "CONFLICT";
      } else {
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      }
    }
  };

  /**
   * 템플릿 파일 만들기
   */
  const requestNewTemplateFile = async (name, templateType) => {
    // 최상위에 대한 처리
    //   상위 키값이 DPC 또는 부서코드_DPC일 경우
    //   상위 키값이 POW, PFN, PIN, PIC, ROW, RFN, RIN, RIC 또는 부서코드_POW, PFN, PIN, PIC, ROW, RFN, RIN, RIC일 경우
    //   상위 키값이 DIM일 경우
    // 중간폴더에 대한 처리
    //   상위 u_fol_type이 DFO일 경우
    //   상위 u_fol_type이 DIF일 경우
    //   상위 u_fol_type이 DIF일 경우
    //   상위 u_fol_type이 PCL일 경우
    //   상위 u_fol_type이 PFO일 경우
    //   상위 u_fol_type이 RCL일 경우
    //   상위 u_fol_type이 RFO일 경우

    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;
    const deptKey = parsedNodeId.deptKey;

    try {
      // objectId일 경우
      if (CommonUtil.isObjectId(key)) {
        const dataOneResponse = await DataApi.getDataOne({
          params: {
            dataId: key,
          },
        });
        if (dataOneResponse.data.response) {
          await DataApi.postDataChildren({
            params: {
              dataId: key,
              dataName: name,
              dateType: "T",
              folderType: dataOneResponse.data.response.uFolType,
              hamType: "F",
              templateType: templateType,
            },
          });
        }
      }
      // 부서함일 경우
      else if (key === CATEGORY_FOLDER.DEPT.key) {
        await DataApi.postDataChildren({
          params: {
            dataId: deptKey || user.orgId,
            dataName: name,
            dateType: "T",
            folderType: "DFO",
            hamType: "D",
            templateType: templateType,
          },
        });
      }
      // 프로젝트/투자일 경우
      else if (CommonUtil.isPjtCode(key)) {
        await DataApi.postDataChildren({
          params: {
            dataId: key,
            dataName: name,
            dateType: "T",
            folderType: "PFO",
            hamType: "P",
            templateType: templateType,
          },
        });
      }
      // 연구과제일 경우
      else if (CommonUtil.isRschCode(key)) {
        await DataApi.postDataChildren({
          params: {
            dataId: key,
            dataName: name,
            dateType: "T",
            folderType: "RFO",
            hamType: "R",
            templateType: templateType,
          },
        });
      }
    } catch (error) {
      if (error?.response?.status === HttpStatus.CONFLICT) {
        openDialog(ALERT_DIALOG, {
          title: "템플릿명 중복",
          children: <Fragment>같은 이름의 파일이 존재합니다.</Fragment>,
        });
        return "CONFLICT";
      } else {
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      }
    }
  };

  /**
   * 새 프로젝트/투자 분류폴더 만들기
   */
  const requestNewProjectFolder = async (name) => {
    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;
    const deptKey = parsedNodeId.deptKey;
    try {
      if (key === PROJECT_MAIN_FOLDER.FINISHED.key) {
        const dataId = key === PROJECT_MAIN_FOLDER.FINISHED.key ? deptKey || user.orgId : key;
        const response = await DataApi.postDataChildren({
          params: {
            dataId,
            dataName: name,
            dateType: "P",
            folderType: "PCL",
            hamType: "D",
          },
        });
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 새 연구과제 분류폴더 만들기
   */
  const requestNewResearchFolder = async (name) => {
    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;
    const deptKey = parsedNodeId.deptKey;
    try {
      if (key === RESEARCH_MAIN_FOLDER.FINISHED.key) {
        const response = await DataApi.postDataChildren({
          params: {
            dataId: deptKey || user.orgId,
            dataName: name,
            dateType: "R",
            folderType: "RCL",
            hamType: "D",
          },
        });
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  const dropData = async (event) => {
    const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
    const key = parsedNodeId.key;
    const deptKey = parsedNodeId.deptKey;

    const pasted = event.dataTransfer.getData("text/plain");
    const parsed = CommonUtil.isJson(pasted) && JSON.parse(pasted);
    if (parsed && Object.values(CLIPBOARD_TYPE).includes(parsed.uptPthGbn)) {
      // objectId일 경우
      if (CommonUtil.isObjectId(key)) {
        const response = await DataApi.getDataOne({ params: { dataId: key } });

        const targetGubun = response.data.response.uFolType;
        const targetDboxId = key;
        await pasteData(parsed, targetGubun, targetDboxId);
      }
      // 프로젝트/투자일 경우
      else if (CommonUtil.isPjtCode(key)) {
        const response = await ProjectApi.getProjectOne({ params: { pjtCode: key } });

        const targetGubun = "PJC";
        const targetDboxId = response.data.response.rObjectId;
        await pasteData(parsed, targetGubun, targetDboxId);
      }
      // 연구과제일 경우
      else if (CommonUtil.isRschCode(key)) {
        const response = await ResearchApi.getResearchOne({ params: { rschCode: key } });

        const targetGubun = "RSC";
        const targetDboxId = response.data.response.rObjectId;
        await pasteData(parsed, targetGubun, targetDboxId);
      }
      // 부서함일 경우
      else if (key === CATEGORY_FOLDER.DEPT.key) {
        const response = await DeptApi.getDeptOne({ params: { deptId: deptKey || user.orgId } });
        const targetGubun = "DPC";
        const targetDboxId = response.data.response.uCabinetCode;
        await pasteData(parsed, targetGubun, targetDboxId);
      }
      // 프로젝트/투자 > 주관일 경우
      else if (key === PROJECT_FOLDER.MAIN.key) {
        const response = await DeptApi.getDeptOne({ params: { deptId: deptKey || user.orgId } });
        const targetGubun = "POW";
        const targetDboxId = response.data.response.uCabinetCode;
        await pasteData(parsed, targetGubun, targetDboxId);
      }
      // 연구과제 > 주관일 경우
      else if (key === RESEARCH_FOLDER.MAIN.key) {
        const response = await DeptApi.getDeptOne({ params: { deptId: deptKey || user.orgId } });
        const targetGubun = "ROW";
        const targetDboxId = response.data.response.uCabinetCode;
        await pasteData(parsed, targetGubun, targetDboxId);
      }
    }
  };

  return (
    <DocGrid
      ref={gridRef}
      pageKey={pageKey}
      onGridReady={onGridReady}
      onNameDoubleClicked={doubleClickName}
      onCellEditingStarted={startEditing}
      onCellEditingStopped={stopEditing}
      onKeyDown={handleCtrlKey}
      onContextMenu={openGridContextMenu}
      onBeforeMouseEvent={setUploadForm}
      onDropData={dropData}
      height={height}
      opened={opened}
      closeModal={closeModal}
      docModalObj={docModalObj}
      onSortChanged={changeSort}
      onFilterChanged={changeFilter}
      onColumnResized={resizeColumn}
      onColumnMoved={moveColumn}
    />
  );
});

export default DocGridContainer;
