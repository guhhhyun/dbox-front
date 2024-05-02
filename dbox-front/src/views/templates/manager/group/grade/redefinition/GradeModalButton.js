import { Fragment } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("GradeModalButton.js");

export default function GradeModalButton({ opened, onButtonClick, onModalOkClick, onModalClose, clearOpened, closeClearModal }) {
  const okText = "예";
  const cancelText = "아니오";
  const title = "알림";

  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  return (
    <Fragment>
      <Button disabled={comCode != "DKG"} variant="contained" onClick={onButtonClick} color="primary" disableElevation style={{ float: "right" }}>
        저 장
      </Button>
      <ConfirmDialog
        open={opened}
        title={title}
        okText={okText}
        cancelText={cancelText}
        onOkClick={onModalOkClick}
        onClose={onModalClose}
        maxWidth="sm"
        fullWidth
      >
        보안 등급을 재정의 하시겠습니까?
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
    </Fragment>
  );
}
