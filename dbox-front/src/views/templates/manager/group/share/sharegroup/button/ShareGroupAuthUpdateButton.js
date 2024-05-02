import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ShareGroupAuthUpdateDialogContentContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthUpdateDialogContentContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

export default function ShareGroupAuthUpdateButton({
  confirmCreateOpened,
  onCreateOkClick,
  onCreateButtonClick,
  onCreateClose,
  getCheckValue,
  getCheckContentValue,
  shareGroupGridData,
  closeAlertDialog,
  alertModalOpened,
  clearOpened,
  closeClearModal,
}) {
  return (
    <div>
      <Button disabled={shareGroupGridData.length === 0 ? true : false} variant="contained" color="primary" disableElevation onClick={onCreateButtonClick}>
        수정
      </Button>
      <ConfirmDialog open={confirmCreateOpened} title="공유그룹 수정" onOkClick={onCreateOkClick} onClose={onCreateClose} maxWidth="sm" fullWidth>
        <ShareGroupAuthUpdateDialogContentContainer
          getCheckValue={getCheckValue}
          getCheckContentValue={getCheckContentValue}
          shareGroupGridData={shareGroupGridData}
        />
        <AlertDialog open={alertModalOpened} title="[알림]" content="내용을 모두 입력해주세요." onOkClick={closeAlertDialog} onClose={closeAlertDialog} />
      </ConfirmDialog>
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
