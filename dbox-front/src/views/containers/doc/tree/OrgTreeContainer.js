import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import queryString from "query-string";
import OrgTree from "views/templates/doc/tree/OrgTree";
import { FOLDER, useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import TreeItem from "views/templates/doc/tree/TreeItem";
import DataApi from "apis/data-api";
import DeptApi from "apis/dept-api";
import ProjectApi from "apis/project-api";
import ResearchApi from "apis/research-api";
import { PR_ALL, PR_DOING, PR_DONE, TREE_ALL, TREE_PROJECT, TREE_RESEARCH, TREE_SHARE, setPath } from "stores/doc";
import CommonUtil from "utils/common-util";
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
import { Async } from "react-async";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import { useRef } from "react";
// import { Async } from "react-async";
// import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";

console.debug("OrgTreeContainer.js");

export default function OrgTreeContainer({ pageKey }) {
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
  const treeType = useSelector((state) => state.doc.treeType[pageKey]);
  const prStatus = useSelector((state) => state.doc.prStatus[pageKey]);

  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [loadedKeys, setLoadedKeys] = useState([]);

  // state와 상관없이 최신 treeData를 가져오기 위한 ref 처리 (async 후 최신데이터를 참조하기 위함)
  const treeDataRef = useRef(treeData);
  const setTreeDataWithRef = (treeData) => {
    setTreeData(treeData);
    treeDataRef.current = treeData;
  };

  // 최초 접속 시 부서 정보 불러오기
  useEffect(() => {
    (async () => {
      try {
        // 부서 전체 데이터 조회
        const response = await DeptApi.getDeptList({ params: { deptId: user.comOrgId } });

        // 부서 트리 변환
        const deptTreeData = CommonUtil.mapTree([response.data.response], {
          mapping: (item) => ({
            key: item.dept.orgId,
            title: item.dept.orgNm,
            type: TREE_TYPE.DEPT.key,
            data: item,
            checkable: false,
          }),
          setChildren: (item, mappedChildren) => {
            const children = makeDefaultFolder(item.dept.orgId);
            const result = [...children, ...mappedChildren];
            return result.length > 0 ? result : undefined;
          },
        });

        // 트리 세팅
        setTreeDataWithRef(deptTreeData);
      } catch (error) {
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      }
    })();
  }, []);

  // treeType과 status가 변할 때 마다 부서 하위의 내용 변경
  useEffect(() => {
    const deptTreeData = CommonUtil.mapTree(treeData, {
      mapping: (item) => item,
      setChildren: (item, mappedChildren) => {
        const result = mappedChildren ? mappedChildren.filter((item) => CommonUtil.isDeptCode(item.key)) : [];
        return result.length > 0 ? result : undefined;
      },
    });

    setTreeDataWithRef(deptTreeData);

    setLoadedKeys([]);
  }, [treeType, prStatus]);

  // 탭 또는 아이디가 바뀌었을 경우 경로 설정
  useEffect(() => {
    if (sidebarTab === SIDEBAR_TAB.ORG.key && nodeId) {
      // 전체 path에 대해 열기
      (async () => {
        try {
          const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
          const key = parsedNodeId.key;
          const categoryKey = parsedNodeId.categoryKey;
          const deptKey = parsedNodeId.deptKey;

          // 부서 경로 열기 및 선택
          const pathResponse = await DeptApi.getDeptPath({ params: { orgId: user.orgId } });
          const deptPaths = pathResponse.data.response.deptIdPath.split(">");

          if (CommonUtil.isDeptCode(key)) {
            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...deptPaths]);

            setExpandedKeys(newExpandedKeys);
          } else if (CommonUtil.isObjectId(key)) {
            // 폴더 경로
            const response = await DataApi.getDataPaths({ params: { dataId: key } });
            const dataPaths = response.data.response.map((item) => CommonUtil.makeNodeId(item.rObjectId, categoryKey, deptKey));

            // 카테고리 경로
            const categoryPath = CommonUtil.getCategoryPath(categoryKey, deptKey);

            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...deptPaths, ...categoryPath, ...dataPaths]);

            setExpandedKeys(newExpandedKeys);
          } else if (CommonUtil.isPjtCode(key) || CommonUtil.isRschCode(key)) {
            // 카테고리 경로
            const categoryPath = CommonUtil.getCategoryPath(categoryKey, deptKey);

            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...deptPaths, ...categoryPath, nodeId]);

            setExpandedKeys(newExpandedKeys);
          } else {
            // 카테고리 경로
            const categoryPath = CommonUtil.getCategoryPath(key, deptKey);

            // 기존 expandedKeys와 새로 열릴 key 합치고 중복제거
            const newExpandedKeys = CommonUtil.toDistinct([...expandedKeys, ...deptPaths, ...categoryPath]);

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
    // ORG 탭에서만 적용
    if (sidebarTab === SIDEBAR_TAB.ORG.key && nodeId && treeData) {
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
          if (item.type === TREE_TYPE.DEPT.key) {
            return item.data.dept.orgNm;
          } else if (item.type === TREE_TYPE.CATEGORY.key) {
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
  const makeDefaultFolder = (deptKey) => {
    if (treeType === TREE_ALL || treeType === TREE_SHARE) {
      const filtered = Object.values(CATEGORY_FOLDER)
        .filter((item) => ![CATEGORY_FOLDER.SHARE.key, CATEGORY_FOLDER.TAKEOUT.key, CATEGORY_FOLDER.TRASH.key].includes(item.key)) // 공유협업, 반출함, 휴지통 제외
        .filter((item) => user.comOrgId === COM_CODE.DKS.key || CATEGORY_FOLDER.RESEARCH.key !== item.key); // 동국제강이 아닐 경우 연구과제 제외
      const rootTreeData = mapCategory(filtered, deptKey);

      return rootTreeData;
    } else {
      return [];
    }
  };

  /**
   * 프로젝트 기본 폴더 데이터 만들기
   */
  const makeDefaultProjectFolder = (deptKey) => {
    const projectCount = ProjectApi.getProjectCount({ params: { deptCode: deptKey, withListOpen: true } });
    const projectTreeData = Object.values(PROJECT_FOLDER).map((item) => {
      const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
      return {
        key: keyMade,
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
      };
    });

    return projectTreeData;
  };

  /**
   * 연구과제 기본 폴더 데이터 만들기
   */
  const makeDefaultResearchFolder = (deptKey) => {
    const researchCount = ResearchApi.getResearchCount({ params: { deptCode: deptKey, withListOpen: true } });
    const researchTreeData = Object.values(RESEARCH_FOLDER).map((item) => {
      const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
      return {
        key: keyMade,
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
      };
    });

    return researchTreeData;
  };

  /**
   * 하위 트리 불러오기
   */
  const loadData = async (node) => {
    // 하위에 로딩이 되지 않은 경우에만 불러오기
    if (!node.children || node.children.length === 0) {
      // 키값 파싱 (부서, 카테고리_부서, 데이터_카테고리_부서)
      const parsedNodeId = CommonUtil.parseNodeId(node.key, sidebarTab);
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
      } else {
        if (key === CATEGORY_FOLDER.DEPT.key) loadDeptChildren(deptKey);
        if (key === DEPT_FOLDER.APPROVAL.key) loadApprovalChildren(deptKey);
        if (key === CATEGORY_FOLDER.PROJECT.key) loadDefaultProjectChildren(deptKey);
        if (key === CATEGORY_FOLDER.RESEARCH.key) loadDefaultResearchChildren(deptKey);
        if (key === PROJECT_FOLDER.MAIN.key) loadLiveMainProjectChildren(deptKey);
        if (key === PROJECT_FOLDER.JOIN.key) loadLiveJoinProjectChildren(deptKey);
        if (key === PROJECT_MAIN_FOLDER.FINISHED.key) loadFinishedMainProjectChildren(deptKey);
        if (key === PROJECT_JOIN_FOLDER.FINISHED.key) loadFinishedJoinProjectChildren(deptKey);
        if (key === RESEARCH_FOLDER.MAIN.key) loadLiveMainResearchChildren(deptKey);
        if (key === RESEARCH_FOLDER.JOIN.key) loadLiveJoinResearchChildren(deptKey);
        if (key === RESEARCH_MAIN_FOLDER.FINISHED.key) loadFinishedMainResearchChildren(deptKey);
        if (key === RESEARCH_JOIN_FOLDER.FINISHED.key) loadFinishedJoinResearchChildren(deptKey);
      }
    }
  };

  /**
   * 기본 폴더 불러오기
   */
  const loadDefaultChildren = async (key) => {
    const children = makeDefaultFolder(key);
    setTreeDataChildren(key, children);
  };

  /**
   * 기본 프로젝트/투자 폴더 불러오기
   */
  const loadDefaultProjectChildren = (deptKey) => {
    const projectTreeData = makeDefaultProjectFolder(deptKey);

    const parentMade = CommonUtil.makeNodeId(CATEGORY_FOLDER.PROJECT.key, null, deptKey);
    setTreeDataChildren(parentMade, projectTreeData);
  };

  /**
   * 기본 연구과제 폴더 불러오기
   */
  const loadDefaultResearchChildren = (deptKey) => {
    const researchTreeData = makeDefaultResearchFolder(deptKey);

    const parentMade = CommonUtil.makeNodeId(CATEGORY_FOLDER.RESEARCH.key, null, deptKey);
    setTreeDataChildren(parentMade, researchTreeData);
  };

  /**
   * 부서함 하위 불러오기
   */
  const loadDeptChildren = async (deptKey) => {
    try {
      // 부서함 > 전자결재 표시
      const approvalTreeData = mapCategory(Object.values(DEPT_FOLDER), deptKey);

      // 부서 하위 폴더/문서 조회
      const response = await DataApi.getDataChildren({ params: { dataId: deptKey, hamType: HAM_TYPE.DEPT.key, checkHasChildren: true } });
      const children = mapData(response.data.response, CATEGORY_FOLDER.DEPT.key, deptKey);

      const parentMade = CommonUtil.makeNodeId(CATEGORY_FOLDER.DEPT.key, deptKey);
      setTreeDataChildren(parentMade, [...approvalTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 전자결재함 하위 불러오기
   */
  const loadApprovalChildren = async (deptKey) => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: user.orgId, hamType: HAM_TYPE.DEPT.key, folderType: "DWF", checkHasChildren: true } });
      const children = mapData(response.data.response, DEPT_FOLDER.APPROVAL.key, deptKey);

      const parentMade = CommonUtil.makeNodeId(DEPT_FOLDER.APPROVAL.key, deptKey);
      setTreeDataChildren(parentMade, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자함 하위 불러오기
   */
  const loadProjectChildren = async (pjtCode, categoryKey, deptKey) => {
    try {
      // 프로젝트/투자 하위 폴더/문서 조회
      const response = await DataApi.getDataChildren({ params: { dataId: pjtCode, hamType: HAM_TYPE.PROJECT.key, checkHasChildren: true } });
      const rowData = mapData(response.data.response, categoryKey, deptKey);

      const parentMade = CommonUtil.makeNodeId(pjtCode, categoryKey, deptKey);
      setTreeDataChildren(parentMade, rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제함 하위 불러오기
   */
  const loadResearchChildren = async (rschCode, categoryKey, deptKey) => {
    try {
      // 연구과제 하위 폴더/문서 조회
      const response = await DataApi.getDataChildren({ params: { dataId: rschCode, hamType: HAM_TYPE.RESEARCH.key, checkHasChildren: true } });
      const rowData = mapData(response.data.response, categoryKey, deptKey);

      const parentMade = CommonUtil.makeNodeId(rschCode, categoryKey, deptKey);
      setTreeDataChildren(parentMade, rowData);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 진행중 하위 불러오기
   */
  const loadLiveMainProjectChildren = async (deptKey) => {
    try {
      // 프로젝트 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const children = mapProject(response.data.response, PROJECT_FOLDER.MAIN.key, deptKey);

      // 완료함 표시
      const projectTreeData = mapCategory(Object.values(PROJECT_MAIN_FOLDER), deptKey);

      const parentMade = CommonUtil.makeNodeId(PROJECT_FOLDER.MAIN.key, null, deptKey);
      setTreeDataChildren(parentMade, [...projectTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 진행중 하위 불러오기 (treeType이 프로젝트/투자인 경우)
   */
  const loadLiveMainProjectChildrenForProjectTree = async (deptKey) => {
    try {
      // 프로젝트 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const children = mapProject(response.data.response, null, deptKey);

      // 전체 표시일 경우에만 완료함 표시
      if (prStatus === PR_ALL) {
        const projectTreeData = mapCategory(Object.values(PROJECT_MAIN_FOLDER), deptKey);
        setTreeDataChildren(deptKey, [...projectTreeData, ...children]);
      } else {
        setTreeDataChildren(deptKey, children);
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 참여 진행중 하위 불러오기
   */
  const loadLiveJoinProjectChildren = async (deptKey) => {
    try {
      // 프로젝트 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const children = mapProject(response.data.response, PROJECT_FOLDER.JOIN.key, deptKey);

      // 완료함 표시
      const projectTreeData = mapCategory(Object.values(PROJECT_JOIN_FOLDER), deptKey);

      const parentMade = CommonUtil.makeNodeId(PROJECT_FOLDER.JOIN.key, null, deptKey);
      setTreeDataChildren(parentMade, [...projectTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 주관 완료 하위 불러오기
   */
  const loadFinishedMainProjectChildren = async (deptKey) => {
    try {
      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey, hamType: HAM_TYPE.DEPT.key, folderType: "PCL", checkHasChildren: true },
      });
      const dataRowData = mapData(dataResponse.data.response, PROJECT_MAIN_FOLDER.FINISHED.key, deptKey);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const children = mapProject(response.data.response, PROJECT_MAIN_FOLDER.FINISHED.key, deptKey);

      const parentMade = CommonUtil.makeNodeId(PROJECT_MAIN_FOLDER.FINISHED.key, null, deptKey);
      setTreeDataChildren(parentMade, [...dataRowData, ...children]);
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
        params: { dataId: deptKey, hamType: HAM_TYPE.DEPT.key, folderType: "PCL", checkHasChildren: true },
      });
      const dataRowData = mapData(dataResponse.data.response, null, deptKey);

      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const children = mapProject(response.data.response, null, deptKey);

      setTreeDataChildren(deptKey, [...dataRowData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 프로젝트/투자 > 참여 완료 하위 불러오기
   */
  const loadFinishedJoinProjectChildren = async (deptKey) => {
    try {
      // 프로젝트/투자 조회
      const response = await ProjectApi.getProjectList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "Y", withListOpen: true } });
      const children = mapProject(response.data.response, PROJECT_JOIN_FOLDER.FINISHED.key, deptKey);

      const parentMade = CommonUtil.makeNodeId(PROJECT_JOIN_FOLDER.FINISHED.key, null, deptKey);
      setTreeDataChildren(parentMade, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 진행중 하위 불러오기
   */
  const loadLiveMainResearchChildren = async (deptKey) => {
    try {
      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const children = mapResearch(response.data.response, RESEARCH_FOLDER.MAIN.key, deptKey);

      // 완료함 조회
      const researchTreeData = mapCategory(Object.values(RESEARCH_MAIN_FOLDER), deptKey);

      const parentMade = CommonUtil.makeNodeId(RESEARCH_FOLDER.MAIN.key, null, deptKey);
      setTreeDataChildren(parentMade, [...researchTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 진행중 하위 불러오기 (treeType이 연구과제일 경우)
   */
  const loadLiveMainResearchChildrenForResearchTree = async (deptKey) => {
    try {
      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const children = mapResearch(response.data.response, RESEARCH_FOLDER.MAIN.key, deptKey);

      // 연구과제 트리가 아니거나 전체 표시일 경우에만 완료함 표시
      if (prStatus === PR_ALL) {
        const researchTreeData = mapCategory(Object.values(RESEARCH_MAIN_FOLDER), deptKey);
        setTreeDataChildren(deptKey, [...researchTreeData, ...children]);
      } else {
        setTreeDataChildren(deptKey, children);
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 또는 참여 진행중 하위 불러오기
   */
  const loadLiveJoinResearchChildren = async (deptKey) => {
    try {
      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "N", withListOpen: true } });
      const children = mapResearch(response.data.response, RESEARCH_FOLDER.JOIN.key, deptKey);

      // 완료함 조회
      const researchTreeData = mapCategory(Object.values(RESEARCH_JOIN_FOLDER), deptKey);

      const parentMade = CommonUtil.makeNodeId(RESEARCH_FOLDER.JOIN.key, null, deptKey);
      setTreeDataChildren(parentMade, [...researchTreeData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 완료 하위 불러오기
   */
  const loadFinishedMainResearchChildren = async (deptKey) => {
    try {
      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey, hamType: HAM_TYPE.DEPT.key, folderType: "RCL", checkHasChildren: true },
      });
      const dataRowData = mapData(dataResponse.data.response, RESEARCH_MAIN_FOLDER.FINISHED.key, deptKey);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const children = mapResearch(response.data.response, RESEARCH_MAIN_FOLDER.FINISHED.key, deptKey);

      const parentMade = CommonUtil.makeNodeId(RESEARCH_MAIN_FOLDER.FINISHED.key, null, deptKey);
      setTreeDataChildren(parentMade, [...dataRowData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 주관 완료 하위 불러오기 (treeType이 연구과제일 경우)
   */
  const loadFinishedMainResearchChildrenForResearchTree = async (deptKey) => {
    try {
      // 분류폴더 조회
      const dataResponse = await DataApi.getDataChildren({
        params: { dataId: deptKey, hamType: HAM_TYPE.DEPT.key, folderType: "RCL", checkHasChildren: true },
      });
      const dataRowData = mapData(dataResponse.data.response, null, deptKey);

      // 연구과제 조회
      const response = await ResearchApi.getResearchList({
        params: { ownJoin: OWN_JOIN.OWN, uFolId: DCTM_BLANK, deptCode: deptKey, finishYn: "Y", withListOpen: true },
      });
      const children = mapProject(response.data.response, null, deptKey);

      setTreeDataChildren(deptKey, [...dataRowData, ...children]);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 연구과제 > 참여 완료 하위 불러오기
   */
  const loadFinishedJoinResearchChildren = async (deptKey) => {
    try {
      // 연구과제 조회
      const response = await ResearchApi.getResearchList({ params: { ownJoin: OWN_JOIN.JOIN, deptCode: deptKey, finishYn: "Y", withListOpen: true } });
      const children = mapResearch(response.data.response, RESEARCH_JOIN_FOLDER.FINISHED.key, deptKey);

      const parentMade = CommonUtil.makeNodeId(RESEARCH_JOIN_FOLDER.FINISHED.key, null, deptKey);
      setTreeDataChildren(parentMade, children);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 폴더 하위 불러오기
   */
  const loadFolderChildren = async (key, categoryKey, deptKey) => {
    try {
      const response = await DataApi.getDataChildren({ params: { dataId: key, checkHasChildren: true } });
      const children = mapData(response.data.response, categoryKey, deptKey);

      // 완료함일 경우 같은 레벨의 프로젝트/투자 또는 연구과제도 조회
      if (categoryKey === PROJECT_MAIN_FOLDER.FINISHED.key) {
        const projectResponse = await ProjectApi.getProjectList({
          params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, uFolId: key, finishYn: "Y", withListOpen: true },
        });
        const projectRowData = mapProject(projectResponse.data.response, categoryKey, deptKey);

        const parentMade = CommonUtil.makeNodeId(key, categoryKey, deptKey);
        setTreeDataChildren(parentMade, [...children, ...projectRowData]);
      } else if (categoryKey === RESEARCH_MAIN_FOLDER.FINISHED.key) {
        const researchResponse = await ResearchApi.getResearchList({
          params: { ownJoin: OWN_JOIN.OWN, deptCode: deptKey, uFolId: key, finishYn: "Y", withListOpen: true },
        });
        const researchRowData = mapResearch(researchResponse.data.response, categoryKey, deptKey);

        const parentMade = CommonUtil.makeNodeId(key, categoryKey, deptKey);
        setTreeDataChildren(parentMade, [...children, ...researchRowData]);
      } else {
        const parentMade = CommonUtil.makeNodeId(key, categoryKey, deptKey);
        setTreeDataChildren(parentMade, children);
      }
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 카테고리 매핑
   */
  const mapCategory = (rowData, deptKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값 세팅
      const keyMade = CommonUtil.makeNodeId(item.key, null, deptKey);
      return {
        key: keyMade,
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
  const mapData = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      // 사이드바 탭에 맞게 키값 세팅
      const keyMade = CommonUtil.makeNodeId(item.rObjectId, categoryKey, deptKey);

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
  const mapProject = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      const keyMade = CommonUtil.makeNodeId(item.uPjtCode, categoryKey, deptKey);
      return {
        key: keyMade,
        title: <TreeItem>{item.uPjtName}</TreeItem>,
        type: TREE_TYPE.DATA.key,
        data: {
          dataType: DATA_TYPE.PROJECT.key,
          ...item,
        },
        checkable: false,
      };
    });
  };

  /**
   * 연구과제 데이터 매핑
   */
  const mapResearch = (rowData, categoryKey, deptKey) => {
    return rowData.map((item) => {
      const keyMade = CommonUtil.makeNodeId(item.uRschCode, categoryKey, deptKey);
      return {
        key: keyMade,
        title: <TreeItem>{item.uRschName}</TreeItem>,
        type: TREE_TYPE.DATA.key,
        data: {
          dataType: DATA_TYPE.RESEARCH.key,
          ...item,
        },
        checkable: false,
      };
    });
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

    // 부모 노드 찾기
    const parentNode = CommonUtil.findTree(copiedTree, {
      value: key,
    });

    // 부모 노드가 있을 경우 붙여넣기
    if (parentNode) parentNode.children = children;

    setTreeDataWithRef(copiedTree);
  };

  /**
   * 컨텍스트 메뉴 열기
   */
  const openSidebarContextMenu = ({ event, data }) => {
    event.preventDefault();
    event.stopPropagation();

    openContextMenu(
      FOLDER,
      {
        x: event.clientX,
        y: event.clientY,
      },
      data,
    );
  };

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, info) => {
    const parsed = queryString.parse(history.location.search);
    parsed[pageKeyNodeId] = info?.node?.key;
    parsed[pageKeySidebarTab] = SIDEBAR_TAB.ORG.key;
    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);
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
  const toggleTreeNodeExpanded = (expandedKeys, { expanded, node }) => {
    setExpandedKeys(expandedKeys);
  };

  /**
   * 로딩 여부 설정
   */
  const loadTreeNode = (loadedKeys, info) => {
    setLoadedKeys(loadedKeys);
  };

  return (
    <OrgTree
      treeData={treeData}
      loadData={loadData}
      status={prStatus}
      onSelect={selectTreeNode}
      selectedKeys={selectedKeys}
      onCheck={toggleTreeNodeCheckbox}
      checkedKeys={checkedKeys}
      onExpand={toggleTreeNodeExpanded}
      expandedKeys={expandedKeys}
      loadedKeys={loadedKeys}
      onLoad={loadTreeNode}
      onContextMenu={openSidebarContextMenu}
    />
  );
}
