import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ShareGroupAuthDialogContentContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthDialogContentContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

export default function ShareGroupAuthCreateButton({
  confirmCreateOpened,
  onCreateOkClick,
  onCreateButtonClick,
  onCreateClose,
  onCheckValue,
  onCheckContentValue,
  onCheckComCode,
  closeAlertDialog,
  alertModalOpened,
  comCode,
  clearOpened,
  closeClearModal,
}) {
  return (
    <div>
      <Button variant="contained" color="primary" disableElevation onClick={onCreateButtonClick}>
        추가
      </Button>
      <ConfirmDialog open={confirmCreateOpened} title="새로운 공유그룹 추가" onOkClick={onCreateOkClick} onClose={onCreateClose} maxWidth="sm" fullWidth>
        <ShareGroupAuthDialogContentContainer
          comCode={comCode}
          onCheckValue={onCheckValue}
          onCheckContentValue={onCheckContentValue}
          onCheckComCode={onCheckComCode}
        />
      </ConfirmDialog>
      <AlertDialog open={alertModalOpened} title="[알림]" content="모든 내용을 입력해주세요." onOkClick={closeAlertDialog} onClose={closeAlertDialog} />
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
