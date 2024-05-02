import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ShareGroupAuthDialogTreeContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthDialogTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

export default function ShareGroupAuthAddDeptButton({
  confirmShareGroupOpened,
  onConfirmOkClick,
  onConfirmButtonClick,
  onConfirmClose,
  clickTreeOrgId,
  shareGroupGridData,
  closeAlertDialog,
  alertModalOpened,
  clearOpened,
  closeClearModal,
}) {
  return (
    <div>
      <Button disabled={shareGroupGridData.length === 0 ? true : false} variant="contained" color="secondary" disableElevation onClick={onConfirmButtonClick}>
        부서추가
      </Button>

      <ConfirmDialog
        open={confirmShareGroupOpened}
        title="공유그룹에 추가할 부서 선택"
        onOkClick={onConfirmOkClick}
        onClose={onConfirmClose}
        maxWidth="sm"
        fullWidth
      >
        <AlertDialog open={alertModalOpened} title="[알림]" content="부서를 선택해주세요." onOkClick={closeAlertDialog} onClose={closeAlertDialog} />
        <ShareGroupAuthDialogTreeContainer clickTreeOrgId={clickTreeOrgId} shareGroupGridData={shareGroupGridData} />
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
