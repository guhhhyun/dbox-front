import { useRef, Fragment } from "react";
import { useSnackbar } from "notistack";
import ProjectContextMenu from "views/templates/doc/contextmenu/ProjectContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import { CONFIRM_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import ProjectPropertyModalContainer from "views/containers/doc/modals/property/ProjectPropertyModalContainer";
import ProjectApi from "apis/project-api";
import CommonUtil from "utils/common-util";

console.debug("ProjectContextMenuContainer.js");

export default function ProjectContextMenuContainer({ open, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();
  const { openDialog } = useGlobalDialog();
  const { enqueueSnackbar } = useSnackbar();

  const projectPropertyRef = useRef(null);

  /**
   * 완료함으로 이동 클릭
   */
  const clickFix = () => {
    openDialog(CONFIRM_DIALOG, {
      title: "확인",
      content: "완료함으로 이동하시겠습니까?",
      onOkClick: async () => {
        // 완료함으로 이동
        await requestProjectFix();

        // 확인창 닫기
        window.location.reload();
      },
    });
  };

  /**
   * 완료함으로 이동
   */
  const requestProjectFix = async () => {
    try {
      await ProjectApi.patchProjectFix({ params: { uPjtCode: data.data.data.uPjtCode } });
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 붙여넣기 클릭
   */
  const clickPaste = () => {};

  /**
   * 삭제 클릭
   */
  const clickDelete = () => {};

  /**
   * 이름바꾸기 클릭
   */
  const clickEditName = () => {};

  /**
   * 프로젝트/투자 속성 열기
   */
  const openProjectProperty = () => {
    projectPropertyRef.current.openModal(data.data.data.uPjtCode);
  };

  /**
   * 권한일괄변경 클릭
   */
  const clickMultipleAuthProperty = () => {};

  /**
   * 다운로드 클릭
   */
  const clickDownload = async () => {};

  /**
   * 자료이관 열기
   */
  const openTransfer = () => {};

  return (
    <Fragment>
      <ProjectContextMenu
        open={open}
        posX={pos?.x}
        posY={pos?.y}
        data={data}
        onFixClick={clickFix}
        onPasteClick={clickPaste}
        onDeleteClick={clickDelete}
        onEditNameClick={clickEditName}
        onProjectPropertyClick={openProjectProperty}
        onMultipleAuthPropertyClick={clickMultipleAuthProperty}
        onDownloadClick={clickDownload}
        onTransferClick={openTransfer}
        onClose={closeContextMenu}
      />
      <ProjectPropertyModalContainer ref={projectPropertyRef} />
    </Fragment>
  );
}
