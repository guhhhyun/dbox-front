import {useEffect, useRef, useState} from "react";
import {useSnackbar} from "notistack";
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  CATEGORY_FOLDER,
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
  TREE_TYPE,
} from "constants/code-constants";
import DataApi from "apis/data-api";
import ShareFolderApi from "apis/sharefolder-api";
import ProjectApi from "apis/project-api";
import ResearchApi from "apis/research-api";
import DeptTransferApi from "apis/depttransfer-api";
import Tree from "rc-tree";
import TreeItem from "views/templates/doc/tree/TreeItem";
import TreeIcon from "views/commons/tree/TreeIcon";
import CommonUtil from "utils/common-util";

export default function DeptTransferDialogTree(
  {
      row
    , checkedKeys
    , setCheckedKeys
  }) {

  const deptCode = row.data.u_dept_code;
  const { enqueueSnackbar } = useSnackbar();

  const treeRef = useRef(null);

  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const [isProgressing, setProgressing] = useState(false);

  useEffect(() => {
    init();
    return () => {
      setCheckedKeys([]);
    };
  }, []);

  const init = async () => {
    const treeData = makeDefaultFolder();
    for (const item of treeData) {
      const isDeptBox = item.key === "DPC"
      if(isDeptBox) {
        item.children = await getFoldersAsTree();
      }
    }
    setTreeData(treeData);
  }

  const getFoldersAsTree = async () => {
    // DFO = 부서함
    // 임시 progressing component.
    setProgressing(true);
    const response = await DeptTransferApi.getFoldersAsTree({
      uFolType: "DFO",
      uCabinetCode: row.data.u_cabinet_code,
      uUpFolId: " "
    });
    setProgressing(false);
    return response.data.response;
  }

  const getChildrenByKey = (key) => {
    if (CATEGORY_FOLDER.PROJECT.key === key) {
      return makeDefaultProjectFolder();
    }
    if (CATEGORY_FOLDER.RESEARCH.key === key) {
      return makeDefaultResearchFolder();
    }
    return [];
  }

  const getTreeItem = (item) => {
    return {
      key: item.key,
      title: <TreeItem>{item.desc}</TreeItem>,
      type: TREE_TYPE.CATEGORY.key,
      data: item,
      children: getChildrenByKey(item.key)
    };
  }

  const makeDefaultFolder = () => {
    const excludeingKey = 'RSC|SHR|EXP';
    const excludeKeyForTransfer = (item) => !excludeingKey.includes(item.key);
    return Object.values(CATEGORY_FOLDER)
      .filter(excludeKeyForTransfer)
      .map(getTreeItem);
  };

  const makeDefaultFolderByType = (type) => {
    return Object.values(type)
      .map(getTreeItem);
  }

  const makeDefaultProjectFolder = () => makeDefaultFolderByType(PROJECT_FOLDER);

  const makeDefaultResearchFolder = () => makeDefaultFolderByType(RESEARCH_FOLDER);

  /**
   * 하위 트리 불러오기
   */
  const loadData = async (node) => {
    console.log('loadData', node);
    const splitedNodeKey = node.key.split("_");
    const key = splitedNodeKey[0];
    const categoryKey = splitedNodeKey[1];
    if (CommonUtil.isObjectId(key)) {
      await loadFolderChildren(key, categoryKey);
    } else if (CommonUtil.isPjtCode(key)) {
      await loadProjectChildren(key, categoryKey);
    } else if (CommonUtil.isRschCode(key)) {
      await loadResearchChildren(key, categoryKey);
    } else {
      if (key === CATEGORY_FOLDER.DEPT.key) await loadDeptChildren();
      if (key === PROJECT_FOLDER.MAIN.key) await loadLiveMainProjectChildren();
      if (key === PROJECT_FOLDER.JOIN.key) await loadLiveJoinProjectChildren();
      if (key === PROJECT_MAIN_FOLDER.FINISHED.key) await loadFinishedMainProjectChildren();
      if (key === PROJECT_JOIN_FOLDER.FINISHED.key) await loadFinishedJoinProjectChildren();
      if (key === RESEARCH_FOLDER.MAIN.key) await loadLiveMainResearchChildren();
      if (key === RESEARCH_FOLDER.JOIN.key) await loadLiveJoinResearchChildren();
      if (key === RESEARCH_MAIN_FOLDER.FINISHED.key) await loadFinishedMainResearchChildren();
      if (key === RESEARCH_JOIN_FOLDER.FINISHED.key) await loadFinishedJoinResearchChildren();
      if (key === CATEGORY_FOLDER.SHARE.key) await loadShareChildren();
    }
  };

  /**
   * 부서함 하위 불러오기
   */
  const loadDeptChildren = async () => {
    try {
      const approvalTreeData = mapCategory(Object.values(DEPT_FOLDER));

      const response = await DataApi.getDataChildren({ params: { dataId: deptCode, hamType: HAM_TYPE.DEPT.key, checkHasChildren: true } });

      const children = mapData(response.data.response, CATEGORY_FOLDER.DEPT.key);
      setTreeDataChildren(CATEGORY_FOLDER.DEPT.key, [...approvalTreeData, ...children]);
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
        params: { dataId: deptCode, hamType: HAM_TYPE.DEPT.key, folderType: "PCL", checkHasChildren: true },
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
        params: { dataId: deptCode, hamType: HAM_TYPE.DEPT.key, folderType: "RCL", checkHasChildren: true },
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
    // 트리 복사
    const copiedTree = CommonUtil.mapTree(treeData, {
      mapping: (item) => ({ ...item }),
    });

    // 부모 노드에게 붙여넣기
    const parentNode = CommonUtil.findTree(copiedTree, {
      value: key,
    });
    parentNode.children = children;

    setTreeData(copiedTree);
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
        data: item
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
          isLeaf: !item.hasFolderChildren && !item.hasProjectChildren && !item.hasResearchChildren,
        };
      } else if (item.dataType === DATA_TYPE.DOCUMENT.key) {
        return {
          key: keyMade,
          title: item.uFolName,
          type: TREE_TYPE.DATA.key,
          data: item
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
        isLeaf: !item.hasFolderChildren,
      };
    });
  };

  const toggleTreeNodeCheckbox = (checkedKeys) => {
    console.log('checkedKeys', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const toggleTreeNodeExpanded = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };

  return (
    <>
      <div style={{height: "5px"}}>
        {isProgressing && <LinearProgress color="secondary" />}
      </div>
      <Tree
        ref={treeRef}
        treeData={treeData}
        icon={({ data, expanded }) => <TreeIcon type={data.data.nodeTypeCode} expanded={expanded} />}
        checkedKeys={checkedKeys}
        onCheck={toggleTreeNodeCheckbox}
        expandedKeys={expandedKeys}
        onExpand={toggleTreeNodeExpanded}
        selectable={false}
        checkable
      />
    </>
  );
}
