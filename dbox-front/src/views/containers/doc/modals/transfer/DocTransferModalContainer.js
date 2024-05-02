import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import DocTransferModal from "views/templates/doc/modals/transfer/DocTransferModal";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";

console.debug("DocTransferModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const DocTransferModalContainer = forwardRef(function (props, ref) {
  const [opened, setOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  /**
   * 모달 열기
   */
  const openModal = () => {
    setOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 이관
   */
  const transfer = () => {
    setOpened(false);
    setConfirmOpened(false);
  };

  /**
   * 모달 열기
   */
  const openConfirm = () => {
    setConfirmOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeConfirm = () => {
    setConfirmOpened(false);
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="조직도"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={openConfirm} className={classes.btnAction}>
            확인
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      <DocTransferModal />
      <ConfirmDialog open={confirmOpened} onOkClick={transfer} onClose={closeConfirm}>
        <Typography variant="subtitle2">기획팀으로 자료를 넘기시겠습니까?</Typography>
        <Typography variant="subtitle2">권한 설정을 진행하시겠습니까?</Typography>
        <TextField placeholder="이관 사유" fullWidth variant="outlined" style={{marginTop:'10px'}}/>
      </ConfirmDialog>
    </DynamicButtonModalDialog>
  );
});

export default DocTransferModalContainer;
