import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Async } from "react-async";
import { useSnackbar } from "notistack";
import queryString from "query-string";
import DeptTree from "views/templates/doc/tree/DeptTree";
import DataApi from "apis/data-api";
import ShareFolderApi from "apis/sharefolder-api";
import CommonUtil from "utils/common-util";
import { setPath } from "stores/doc";
import {
  CATEGORY_FOLDER,
  COM_CODE,
  DATA_TYPE,
  DCTM_BLANK,
  DEPT_FOLDER,
  HAM_TYPE,
  OWN_JOIN,
  PROJECT_FOLDER,
  PROJECT_JOIN_FOLDER,
  PROJECT_MAIN_FOLDER,
  RESEARCH_FOLDER,
  RESEARCH_JOIN_FOLDER,
  RESEARCH_MAIN_FOLDER,
  SIDEBAR_TAB,
  TREE_KEY_DIVIDER,
  TREE_TYPE,
} from "constants/code-constants";
import TreeItem from "views/templates/doc/tree/TreeItem";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import { EMPTY, FOLDER, useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import ProjectApi from "apis/project-api";
import ResearchApi from "apis/research-api";
import { useRef } from "react";

console.debug("DeptTreeContainer.js");

export default function DeptTreeContainer({ pageKey }) {
  const pageKeyNodeId = `${pageKey}Id`;
  const pageKeySidebarTab = `${pageKey}Tab`;

  const dispatcher = useDispatch();
  const history = useHistory();
  const { openContextMenu } = useContextMenu();
  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state) => state.session.user);
  const nodeId = useSelector((state) => state.doc.id[pageKey]);
  const sidebarTab = useSelector((state) => state.doc.tab[pageKey]);
  const path = useSelector((state) => state.doc.path);

  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  // state와 상관없이 최신 treeData를 가져오기 위한 ref 처리 (async 후 최신데이터를 참조하기 위함)
  const treeDataRef = useRef(treeData);
  const setTreeDataWithRef = (treeData) => {
    setTreeData(treeData);
    treeDataRef.current = treeData;
  };

  useEffect(() => {
    const rootTreeData = makeDefaultFolder();
    setTreeDataWithRef(rootTreeData);

    // 부서함 열기
    setExpandedKeys([CATEGORY_FOLDER.DEPT.key, CATEGORY_FOLDER.PROJECT.key, CATEGORY_FOLDER.RESEARCH.key]);
  }, []);

  useEffect(() => {
    // DEPT 탭에서만 적용
    if (sidebarTab === SIDEBAR_TAB.DEPT.key && nodeId) {
      // 전체 path에 대해 열기
      (async () => {
        try {
          const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
          const key = parsedNodeId.key;
          const categoryKey = parsedNodeId.categoryKey;

          if (CommonUtil.isObjectId(key)) {
            const response = await DataApi.getDataPaths({ params: { dataId: key } });
            const dataPaths = response.data.response.map((item) => CommonUtil.makeNodeId(item.rObjectId, categoryKey));

            // 카테고리 경로
            const categoryPath = CommonUtil.getCategoryPath(categoryKey);

            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...categoryPath, ...dataPaths]);

            setExpandedKeys(newExpandedKeys);
          } else if (CommonUtil.isPjtCode(key) || CommonUtil.isRschCode(key)) {
            // 카테고리 경로
            const categoryPath = CommonUtil.getCategoryPath(categoryKey);

            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...categoryPath, nodeId]);

            setExpandedKeys(newExpandedKeys);
          } else {
            // 카테고리 경로
            const categoryPath = CommonUtil.getCategoryPath(key);

            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...categoryPath]);

            setExpandedKeys(newExpandedKeys);
          }

          // 현재 노드 선택
          setSelectedKeys([nodeId]);
        } catch (error) {
          CommonUtil.printAuthorizedError(error, enqueueSnackbar);
        }
      })();
    }
  }, [sidebarTab, nodeId]);

  useEffect(() => {
    // DEPT 탭에서만 적용
    if (sidebarTab === SIDEBAR_TAB.DEPT.key && nodeId && treeData) {
      const treePath = getTreePath(nodeId);
      dispatcher(setPath({ ...path, [pageKey]: treePath }));
    }
  }, [sidebarTab, nodeId, treeData]);

  /**
   * 트리 경로 구하기
   */
  const getTreePath = (targetKey) => {
    return CommonUtil.getTreePath(targetKey, treeData, {
      mapping: (item) => ({
        key: item.key,
        name: (() => {
          if (item.type === TREE_TYPE.CATEGORY.key) {
            return item.data.desc;
          } else if (item.type === TREE_TYPE.DATA.key) {
            if (item.data.dataType === DATA_TYPE.FOLDER.key) return item.data.uFolName;
            else if (item.data.dataType === DATA_TYPE.DOCUMENT.key) return item.data.objectName;
            else if (item.data.dataType === DATA_TYPE.PROJECT.key) return item.data.uPjtName;
            else if (item.data.dataType === DATA_TYPE.RESEARCH.key) return item.data.uRschName;
          }
        })(),
      }),
    });
  };

  /**
   * 기본 폴더 데이터 만들기
   */
  const makeDefaultFolder = () => {
    const rootTreeData = Object.values(CATEGORY_FOLDER)
      .filter((item) => COM_CODE.DKS.key === user.comOrgId || CATEGORY_FOLDER.RESEARCH.key !== item.key) // 동국제강이 아닐 경우 연구과제 제외
      .map((item) => {
        let children;
        if (CATEGORY_FOLDER.PROJECT.key === item.key) children = makeDefaultProjectFolder();
        if (COM_CODE.DKS.key === user.comOrgId && CATEGORY_FOLDER.RESEARCH.key === item.key) children = makeDefaultResearchFolder();

        return {
          key: item.key,
          title: <TreeItem>{item.desc}</TreeItem>,
          type: TREE_TYPE.CATEGORY.key,
          data: item,
          children,
          checkable: false,
        };
      });

    return rootTreeData;
  };

  /**
   * 프로젝트 기본 폴더 데이터 만들기
   */
  const makeDefaultProjectFolder = () => {
    const projectCount = ProjectApi.getProjectCount();
    const projectTreeData = Object.values(PROJECT_FOLDER).map((item) => ({
      key: item.key,
      title: (
        <Async promise={projectCount}>
          <Async.Fulfilled>
            {(data) => {
              const doneCount = item.key === PROJECT_FOLDER.MAIN.key ? data.data.response.ownDone : data.data.response.joinDone;
              const doingCount = item.key === PROJECT_FOLDER.MAIN.key ? data.data.response.ownDoing : data.data.response.joinDoing;
              return (
                <TreeItem doneCount={doneCount} doingCount={doingCount} showCount>
                  {item.desc}
                </TreeItem>
              );
            }}
          </Async.Fulfilled>
          <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
        </Async>
      ),
      type: TREE_TYPE.CATEGORY.key,
      data: item,
      checkable: false,
    }));

    return projectTreeData;
  };

  /**
   * 연구과제 기본 폴더 데이터 만들기
   */
  const makeDefaultResearchFolder = () => {
    const researchCount = ResearchApi.getResearchCount();
    const researchTreeData = Object.values(RESEARCH_FOLDER).map((item) => ({
      key: item.key,
      title: (
        <Async promise={researchCount}>
          <Async.Fulfilled>
            {(data) => {
              const doneCount = item.key === RESEARCH_FOLDER.MAIN.key ? data.data.response.ownDone : data.data.response.joinDone;
              const doingCount = item.key === RESEARCH_FOLDER.MAIN.key ? data.data.response.ownDoing : data.data.response.joinDoing;
              return (
                <TreeItem doneCount={doneCount} doingCount={doingCount} showCount>
                  {item.desc}
                </TreeItem>
              );
            }}
          </Async.Fulfilled>
          <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
        </Async>
      ),
      type: TREE_TYPE.CATEGORY.key,
      data: item,
      checkable: false,
    }));

    return researchTreeData;
  };

  /**
   * 하위 트리 불러오기
   */
  const loadData = async (node) => {
    // 하위에 로딩이 되지 않은 경우에만 불러오기
    if (!node.children || node.children.length === 0) {
      // 키값 파싱 (카테고리, 데이터_카테고리)
      const parsedNodeId = CommonUtil.parseNodeId(node.key, sidebarTab);
      const key = parsedNodeId.key;
      const categoryKey = parsedNodeId.categoryKey;

      if (CommonUtil.isObjectId(key)) {
        loadFolderChildren(key, categoryKey);
      } else if (CommonUtil.isPjtCode(key)) {
        loadProjectChildren(key, categoryKey);
      } else if (CommonUtil.isRschCode(key)) {
        loadResearchChildren(key, categoryKey);
      } else {
        if (key === CATEGORY_FOLDER.DEPT.key) loadDeptChildren();
        if (key === DEPT_FOLDER.APPROVAL.key) loadApprovalChildren();
        if (key === PROJECT_FOLDER.MAIN.key) loadLiveMainProjectChildren();
        if (key === PROJECT_FOLDER.JOIN.key) loadLiveJoinProjectChildren();
        if (key === PROJECT_MAIN_FOLDER.FINISHED.key) loadFinishedMainProjectChildren();
        if (key === PROJECT_JOIN_FOLDER.FINISHED.key) loadFinishedJoinProjectChildren();
        if (key === RESEARCH_FOLDER.MAIN.key) loadLiveMainResearchChildren();
        if (key === RESEARCH_FOLDER.JOIN.key) loadLiveJoinResearchChildren();
        if (key === RESEARCH_MAIN_FOLDER.FINISHED.key) loadFinishedMainResearchChildren();
        if (key === RESEARCH_JOIN_FOLDER.FINISHED.key) loadFinishedJoinResearchChildren();
        if (key === CATEGORY_FOLDER.SHARE.key) loadShareChildren();
      }
    }
  };

  /**
   * 부서함 하위 불러오기
   */
  const loadDeptChildren = async () => {
    try {
      const approvalTreeData = mapCategory(Object.values(DEPT_FOLDER));

      const response = await DataApi.getDataChildren({ params: { dataId: user.orgId, hamType: HAM_TYPE.DEPT.key, checkHasChildren: true } });
      const children = mapData(response.data.response, CATEGORY_FOLDER.DEPT.key);
      setTreeDataChildren(CATEGORY_FOLDER.DEPT.key, [...approvalTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 전자결재함 하위 불러오기
   */
  const loadApprovalChildren = async () => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "DWF", checkHasChildren: true } });
      const children = mapData(response.data.response, DEPT_FOLDER.APPROVAL.key);
      setTreeDataChildren(DEPT_FOLDER.APPROVAL.key, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자함 하위 불러오기
   */
  const loadProjectChildren = async (pjtCode, categoryKey) => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: pjtCode, hamType: HAM_TYPE.PROJECT.key, checkHasChildren: true } });
      const rowData = mapData(response.data.response, categoryKey);

      const parentMade = CommonUtil.makeNodeId(pjtCode, categoryKey);
      setTreeDataChildren(parentMade, rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제함 하위 불러오기
   */
  const loadResearchChildren = async (rschCode, categoryKey) => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: rschCode, hamType: HAM_TYPE.RESEARCH.key, checkHasChildren: true } });
      const rowData = mapData(response.data.response, categoryKey);

      const parentMade = CommonUtil.makeNodeId(rschCode, categoryKey);
      setTreeDataChildren(parentMade, rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 진행중 하위 불러오기
   */
  const loadLiveMainProjectChildren = async () => {
    try {
      // 완료함 표시
      const projectTreeData = mapCategory(Object.values(PROJECT_MAIN_FOLDER));

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, finishYn: "N" } });
      const children = mapProject(response.data.response, PROJECT_FOLDER.MAIN.key);
      setTreeDataChildren(PROJECT_FOLDER.MAIN.key, [...projectTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 참여 진행중 하위 불러오기
   */
  const loadLiveJoinProjectChildren = async () => {
    try {
      // 완료함 표시
      const projectTreeData = mapCategory(Object.values(PROJECT_JOIN_FOLDER));

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.JOIN, finishYn: "N" } });
      const children = mapProject(response.data.response, PROJECT_FOLDER.JOIN.key);
      setTreeDataChildren(PROJECT_FOLDER.JOIN.key, [...projectTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 완료 하위 불러오기
   */
  const loadFinishedMainProjectChildren = async () => {
    try {
      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "PCL", checkHasChildren: true },
      });
      const dataRowData = mapData(dataResponse.data.response, PROJECT_MAIN_FOLDER.FINISHED.key);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, finishYn: "Y" } });
      const children = mapProject(response.data.response, PROJECT_MAIN_FOLDER.FINISHED.key);
      setTreeDataChildren(PROJECT_MAIN_FOLDER.FINISHED.key, [...dataRowData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 참여 완료 하위 불러오기
   */
  const loadFinishedJoinProjectChildren = async () => {
    try {
      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.JOIN, finishYn: "Y" } });
      const children = mapProject(response.data.response, PROJECT_JOIN_FOLDER.FINISHED.key);
      setTreeDataChildren(PROJECT_JOIN_FOLDER.FINISHED.key, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 진행중 하위 불러오기
   */
  const loadLiveMainResearchChildren = async () => {
    try {
      // 완료함 표시
      const researchTreeData = mapCategory(Object.values(RESEARCH_MAIN_FOLDER));

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, finishYn: "N" } });
      const children = mapResearch(response.data.response, RESEARCH_FOLDER.MAIN.key);
      setTreeDataChildren(RESEARCH_FOLDER.MAIN.key, [...researchTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 참여 진행중 하위 불러오기
   */
  const loadLiveJoinResearchChildren = async () => {
    try {
      // 완료함 표시
      const researchTreeData = mapCategory(Object.values(RESEARCH_JOIN_FOLDER));

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.JOIN, finishYn: "N" } });
      const children = mapResearch(response.data.response, RESEARCH_FOLDER.JOIN.key);
      setTreeDataChildren(RESEARCH_FOLDER.JOIN.key, [...researchTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 완료 하위 불러오기
   */
  const loadFinishedMainResearchChildren = async () => {
    try {
      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "RCL", checkHasChildren: true },
      });
      const dataRowData = mapData(dataResponse.data.response, RESEARCH_MAIN_FOLDER.FINISHED.key);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, finishYn: "Y" } });
      const children = mapResearch(response.data.response, RESEARCH_MAIN_FOLDER.FINISHED.key);

      setTreeDataChildren(RESEARCH_MAIN_FOLDER.FINISHED.key, [...dataRowData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 참여 완료 하위 불러오기
   */
  const loadFinishedJoinResearchChildren = async () => {
    try {
      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.JOIN, finishYn: "Y" } });
      const children = mapResearch(response.data.response, RESEARCH_JOIN_FOLDER.FINISHED.key);

      setTreeDataChildren(RESEARCH_JOIN_FOLDER.FINISHED.key, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 공유/협업 하위 불러오기
   */
  const loadShareChildren = async () => {
    try {
      const response = await ShareFolderApi.getShareFolderList();
      const children = mapData(response.data.response, CATEGORY_FOLDER.SHARE.key);

      setTreeDataChildren(CATEGORY_FOLDER.SHARE.key, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 폴더 하위 불러오기
   */
  const loadFolderChildren = async (key, categoryKey) => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: key, checkHasChildren: true } });
      const children = mapData(response.data.response, categoryKey);

      // 완료함일 경우 같은 레벨의 프로젝트/투자 또는 연구과제도 조회
      if (categoryKey === PROJECT_MAIN_FOLDER.FINISHED.key) {
        const projectResponse = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, uFolId: key, finishYn: "Y" } });
        const projectRowData = mapProject(projectResponse.data.response, categoryKey);

        const parentMade = CommonUtil.makeNodeId(key, categoryKey);
        setTreeDataChildren(parentMade, [...children, ...projectRowData]);
      } else if (categoryKey === RESEARCH_MAIN_FOLDER.FINISHED.key) {
        const researchResponse = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, uFolId: key, finishYn: "Y" } });
        const researchRowData = mapResearch(researchResponse.data.response, categoryKey);

        const parentMade = CommonUtil.makeNodeId(key, categoryKey);
        setTreeDataChildren(parentMade, [...children, ...researchRowData]);
      } else {
        const parentMade = CommonUtil.makeNodeId(key, categoryKey);
        setTreeDataChildren(parentMade, children);
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 트리 하위 세팅
   */
  const setTreeDataChildren = (key, children) => {
    const currentTreeData = treeDataRef.current;

    // 트리 복사
    const copiedTree = CommonUtil.mapTree(currentTreeData, {
      mapping: (item) => ({ ...item }),
    });

    // 부모 노드에게 붙여넣기
    const parentNode = CommonUtil.findTree(copiedTree, {
      value: key,
    });
    parentNode.children = children;

    setTreeDataWithRef(copiedTree);
  };

  /**
   * 카테고리 매핑
   */
  const mapCategory = (rowData) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값 세팅
      return {
        key: item.key,
        title: <TreeItem>{item.desc}</TreeItem>,
        type: TREE_TYPE.CATEGORY.key,
        data: item,
        checkable: false,
      };
    });
  };

  /**
   * 폴더, 문서 데이터 매핑
   */
  const mapData = (rowData, categoryKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값 세팅
      const keyMade = CommonUtil.makeNodeId(item.rObjectId, categoryKey);

      if (item.dataType === DATA_TYPE.FOLDER.key) {
        return {
          key: keyMade,
          title: item.uFolName,
          type: TREE_TYPE.DATA.key,
          data: item,
          checkable: false,
          isLeaf: !item.hasFolderChildren && !item.hasProjectChildren && !item.hasResearchChildren,
        };
      } else if (item.dataType === DATA_TYPE.DOCUMENT.key) {
        return {
          key: keyMade,
          title: item.uFolName,
          type: TREE_TYPE.DATA.key,
          data: item,
          checkable: false,
        };
      }
    });
  };

  /**
   * 프로젝트/투자 데이터 매핑
   */
  const mapProject = (rowData, categoryKey) => {
    return rowData.map((item) => {
      const keyMade = CommonUtil.makeNodeId(item.uPjtCode, categoryKey);
      return {
        key: keyMade,
        title: <TreeItem>{item.uPjtName}</TreeItem>,
        type: TREE_TYPE.DATA.key,
        data: {
          dataType: DATA_TYPE.PROJECT.key,
          ...item,
        },
        checkable: false,
        isLeaf: !item.hasFolderChildren,
      };
    });
  };

  /**
   * 연구과제 데이터 매핑
   */
  const mapResearch = (rowData, categoryKey) => {
    return rowData.map((item) => {
      const keyMade = CommonUtil.makeNodeId(item.uRschCode, categoryKey);
      return {
        key: keyMade,
        title: <TreeItem>{item.uRschName}</TreeItem>,
        type: TREE_TYPE.DATA.key,
        data: {
          dataType: DATA_TYPE.RESEARCH.key,
          ...item,
        },
        checkable: false,
        isLeaf: !item.hasFolderChildren,
      };
    });
  };

  /**
   * 컨텍스트 메뉴 열기
   */
  const openSidebarContextMenu = ({ event, node }) => {
    event.preventDefault();
    event.stopPropagation();

    if (node.type === TREE_TYPE.DEPT.key) {
      alert("부서!!");
    } else if (node.type === TREE_TYPE.CATEGORY.key) {
      if (node.key === CATEGORY_FOLDER.TRASH.key) {
        openContextMenu(
          FOLDER,
          {
            x: event.clientX,
            y: event.clientY,
          },
          node,
        );
      } else {
        alert("카테고리!!");
      }
    } else {
      if (node.data.dataType === DATA_TYPE.FOLDER.key) {
        openContextMenu(
          EMPTY,
          {
            x: event.clientX,
            y: event.clientY,
          },
          node,
        );
      }
    }
  };

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, info) => {
    const parsed = queryString.parse(history.location.search);
    parsed[pageKeyNodeId] = info?.node?.key;
    parsed[pageKeySidebarTab] = SIDEBAR_TAB.DEPT.key;
    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);

    setSelectedKeys(selectedKeys);
  };

  /**
   * 트리 노드 체크박스 토글
   */
  const toggleTreeNodeCheckbox = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys);
  };

  /**
   * 트리 노드 확장 토글
   */
  const toggleTreeNodeExpanded = (expandedKeys, info) => {
    setExpandedKeys(expandedKeys);
  };

  return (
    <Fragment>
      <DeptTree
        treeData={treeData}
        loadData={loadData}
        onSelect={selectTreeNode}
        selectedKeys={selectedKeys}
        onCheck={toggleTreeNodeCheckbox}
        checkedKeys={checkedKeys}
        onExpand={toggleTreeNodeExpanded}
        expandedKeys={expandedKeys}
        onContextMenu={openSidebarContextMenu}
      />
    </Fragment>
  );
}
