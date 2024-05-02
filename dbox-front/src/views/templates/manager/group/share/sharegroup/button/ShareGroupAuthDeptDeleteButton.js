import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

export default function ShareGroupAuthDeptDeleteButton({
  confirmDeleteOpened,
  onDeleteOkClick,
  onDeleteButtonClick,
  onDeleteClose,
  deptGridData,
  clearOpened,
  closeClearModal,
}) {
  const okText = "예";
  const cancelText = "아니오";

  return (
    <div>
      <Button disabled={deptGridData === undefined ? true : false} variant="contained" color="secondary" disableElevation onClick={onDeleteButtonClick}>
        부서삭제
      </Button>

      <ConfirmDialog
        open={confirmDeleteOpened}
        okText={okText}
        cancelText={cancelText}
        title="공유그룹에서 선택 부서 삭제"
        content="선택한 부서를 공유그룹에서 삭제하시겠습니까?"
        onOkClick={onDeleteOkClick}
        onClose={onDeleteClose}
        maxWidth="sm"
        fullWidth
      ></ConfirmDialog>

      <ModalDialog
        open={clearOpened}
        content="변경사항이 반영되었습니다."
        okText="닫기"
        onOkClick={closeClearModal}
        onClose={closeClearModal}
        maxWidth="sm"
        fullWidth
      ></ModalDialog>
    </div>
  );
}
