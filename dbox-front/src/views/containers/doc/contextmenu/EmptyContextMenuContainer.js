import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import EmptyContextMenu from "views/templates/doc/contextmenu/EmptyContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import DataApi from "apis/data-api";
import TemplateApi from "apis/template-api";
import DeptApi from "apis/dept-api";
import CommonUtil from "utils/common-util";
import {
  CATEGORY_FOLDER,
  CLIPBOARD_TYPE,
  FOL_STATUS,
  PROJECT_FOLDER,
  PROJECT_MAIN_FOLDER,
  RESEARCH_FOLDER,
  RESEARCH_MAIN_FOLDER,
} from "constants/code-constants";
import ProjectRegisterModalContainer from "views/containers/doc/modals/property/ProjectRegisterModalContainer";
import ResearchRegisterModalContainer from "views/containers/doc/modals/property/ResearchRegisterModalContainer";
import { ALERT_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import ProjectApi from "apis/project-api";
import ResearchApi from "apis/research-api";

console.debug("EmptyContextMenuContainer.js");

export default function EmptyContextMenuContainer({ open, pageKey, pos, gridRef }) {
  const { closeContextMenu } = useContextMenu();
  const { enqueueSnackbar } = useSnackbar();
  const { openDialog } = useGlobalDialog();

  const user = useSelector((state) => state.session.user);
  const nodeId = useSelector((state) => state.doc.id[pageKey]);
  const sidebarTab = useSelector((state) => state.doc.tab[pageKey]);

  const [templateFiles, setTemplateFiles] = useState([]);

  const contextMenuRef = useRef(null);
  const projectPropertyRef = useRef(null);
  const researchPropertyRef = useRef(null);

  useEffect(() => {
    if (nodeId && sidebarTab && user) {
      (async () => {
        try {
          const parsedNodeId = CommonUtil.parseNodeId(nodeId, sidebarTab);
          const key = parsedNodeId.key;
          const deptKey = parsedNodeId.deptKey;

          let comOrgId;
          // 폴더일 경우
          if (CommonUtil.isObjectId(key)) {
            // 소유부서의 소속 회사 구하기
            const dataOneResponse = await DataApi.getDataOne({ params: { dataId: key } });
            comOrgId = dataOneResponse.data.response.ownDeptDetail.comOrgId;
          }
          // 연구과제일 경우
          else if (CommonUtil.isPjtCode(key)) {
            // TODO 프로젝트/투자 기준 소속회사 구하기
          }
          // 연구과제일 경우
          else if (CommonUtil.isRschCode(key)) {
            // TODO 연구과제 기준 소속회사 구하기
          }
          // 조직탭 카테고리 폴더일 경우
          else if (deptKey) {
            const deptOneResponse = await DeptApi.getDeptOne({ params: { deptId: deptKey } });
            comOrgId = deptOneResponse.data.response.comOrgId;
          }
          // 부서탭 카테고리 폴더일 경우
          else {
            comOrgId = user.comOrgId;
          }

          // 템플릿 파일 리스트 조회 및 설정
          const response = await TemplateApi.getTemplateList({ params: { comOrgId } });
          setTemplateFiles(response.data.response);
        } catch (error) {
          CommonUtil.printAuthorizedError(error, enqueueSnackbar);
        }
      })();
    }
  }, [nodeId, sidebarTab, user]);

  /**
   * 새 폴더 생성
   */
  const clickNewFolder = async () => {
    const parsedNodeId = CommonUtil.parseNodeId(nodeId);
    const key = parsedNodeId.key;
    const categoryKey = parsedNodeId.categoryKey;

    // 폴더일 경우
    if (CommonUtil.isObjectId(key)) {
      // 상위폴더가 잠금상태일 경우 새폴더 불가
      const dataOneResponse = await DataApi.getDataOne({ params: { dataId: key } });
      if (dataOneResponse.data.response.uFolStatus === FOL_STATUS.LOCK.key) {
        openDialog(ALERT_DIALOG, {
          title: "새 폴더 생성 불가",
          children: <Fragment>잠금 상태의 폴더 하위에는 생성할 수 없습니다.</Fragment>,
        });
        return;
      }
    }

    if (key === PROJECT_FOLDER.MAIN.key) {
      projectPropertyRef.current.openModal();
    } else if (key === RESEARCH_FOLDER.MAIN.key) {
      researchPropertyRef.current.openModal();
    } else if (key === PROJECT_MAIN_FOLDER.FINISHED.key) {
      gridRef.current.enableNewProjectFolder();
    } else if (key === RESEARCH_MAIN_FOLDER.FINISHED.key) {
      gridRef.current.enableNewResearchFolder();
    } else {
      gridRef.current.enableNewFolder();
    }
  };

  /**
   * 새로고침
   */
  const clickRefresh = () => {
    window.location.reload();
  };

  /**
   * 업로드
   */
  const clickUpload = () => {
    window.RAONKUPLOAD.OpenFileDialog(window.KUPLOAD_ID);
  };

  /**
   * 템플릿 파일
   */
  const clickTemplateFile = async (file) => {
    const parsedNodeId = CommonUtil.parseNodeId(nodeId);
    const key = parsedNodeId.key;

    // 폴더일 경우
    if (CommonUtil.isObjectId(key)) {
      // 상위폴더가 잠금상태일 경우 새 템플릿 불가
      const dataOneResponse = await DataApi.getDataOne({ params: { dataId: key } });
      if (dataOneResponse.data.response.uFolStatus === FOL_STATUS.LOCK.key) {
        openDialog(ALERT_DIALOG, {
          title: "새 템플릿 생성 불가",
          children: <Fragment>잠금 상태의 폴더 하위에는 생성할 수 없습니다.</Fragment>,
        });
        return;
      }
    }
    gridRef.current.enableNewTemplateFile(file);
  };

  /**
   * 자료 붙여넣기
   */
  const clickPaste = async () => {
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

  return (
    <Fragment>
      <EmptyContextMenu
        ref={contextMenuRef}
        open={open}
        posX={pos?.x}
        posY={pos?.y}
        templateFiles={templateFiles}
        onNewFolderClick={clickNewFolder}
        onRefreshClick={clickRefresh}
        onUploadClick={clickUpload}
        onTemplateFileClick={clickTemplateFile}
        onPasteClick={clickPaste}
        onClose={closeContextMenu}
      />
      <ProjectRegisterModalContainer ref={projectPropertyRef} />
      <ResearchRegisterModalContainer ref={researchPropertyRef} />
    </Fragment>
  );
}
