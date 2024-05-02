import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

export default function ShareGroupAuthDeleteButton({
  confirmDeleteOpened,
  onDeleteOkClick,
  onDeleteButtonClick,
  onDeleteClose,
  shareGroupGridData,
  clearOpened,
  closeClearModal,
}) {
  const okText = "예";
  const cancelText = "아니오";

  return (
    <div>
      <Button disabled={shareGroupGridData.length === 0 ? true : false} variant="contained" color="primary" disableElevation onClick={onDeleteButtonClick}>
        삭제
      </Button>

      <ConfirmDialog
        open={confirmDeleteOpened}
        okText={okText}
        cancelText={cancelText}
        title="공유그룹 삭제"
        content="선택한 공유그룹을 삭제하시겠습니까?"
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
