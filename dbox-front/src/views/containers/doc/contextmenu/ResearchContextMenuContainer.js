import { useRef, Fragment } from "react";
import { useSnackbar } from "notistack";
import ResearchContextMenu from "views/templates/doc/contextmenu/ResearchContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import { CONFIRM_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import ResearchPropertyModalContainer from "views/containers/doc/modals/property/ResearchPropertyModalContainer";
import ResearchApi from "apis/research-api";
import CommonUtil from "utils/common-util";

console.debug("ResearchContextMenuContainer.js");

export default function ResearchContextMenuContainer({ open, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();
  const { openDialog } = useGlobalDialog();
  const { enqueueSnackbar } = useSnackbar();

  const researchPropertyRef = useRef(null);

  /**
   * 완료함으로 이동 클릭
   */
  const clickFix = () => {
    openDialog(CONFIRM_DIALOG, {
      title: "확인",
      content: "완료함으로 이동하시겠습니까?",
      onOkClick: async () => {
        // 완료함으로 이동
        await requestResearchFix();

        // 확인창 닫기
        window.location.reload();
      },
    });
  };

  /**
   * 완료함으로 이동
   */
  const requestResearchFix = async () => {
    try {
      await ResearchApi.patchResearchFix({ params: { uRschCode: data.data.data.uRschCode } });
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
   * 연구과제 속성 열기
   */
  const openResearchProperty = () => {
    researchPropertyRef.current.openModal(data.data.data.uRschCode);
  };

  return (
    <Fragment>
      <ResearchContextMenu
        open={open}
        posX={pos?.x}
        posY={pos?.y}
        data={data}
        onFixClick={clickFix}
        onPasteClick={clickPaste}
        onDeleteClick={clickDelete}
        onEditNameClick={clickEditName}
        onResearchPropertyClick={openResearchProperty}
        onClose={closeContextMenu}
      />
      <ResearchPropertyModalContainer ref={researchPropertyRef} />
    </Fragment>
  );
}
