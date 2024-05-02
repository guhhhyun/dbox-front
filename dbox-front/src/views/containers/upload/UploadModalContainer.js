import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import UploadModal from "views/templates/upload/UploadModal";

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const UploadModalContainer = forwardRef(function ({}, ref) {
  const [opened, setOpened] = useState(false);
  const [retire, setRetire] = useState(false);
  const [absence, setAbsence] = useState(false);
  const [threat, setThreat] = useState(false);

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
   * 잠금 해제 요청 클릭
   */
  const requestUserUnlock = () => {
    alert("업로드 완료");
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      onClose={closeModal}
      title="파일 업로드"
      buttons={
        <Fragment>
          <Button color="primary" onClick={requestUserUnlock} className={classes.btnAction}>
            업로드
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      <UploadModal/>
    </DynamicButtonModalDialog>
  );
});

export default UploadModalContainer;
