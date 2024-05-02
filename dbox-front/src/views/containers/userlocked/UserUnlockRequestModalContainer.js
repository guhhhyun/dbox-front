import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import UserUnlockRequestModal from "views/templates/userlocked/UserUnlockRequestModal";

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const UserUnlockRequestModalContainer = forwardRef(function ({}, ref) {
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
   * 퇴사 여부
   */
  const changeRetire = (event) => {
    setRetire(event.target.value);
  };

  /**
   * 휴직 여부
   */
  const changeAbsence = (event) => {
    setAbsence(event.target.value);
  };

  /**
   * 리스크 인식 여부
   */
  const changeThreat = (event) => {
    setThreat(event.target.value);
  };

  /**
   * 잠금 해제 요청 클릭
   */
  const requestUserUnlock = () => {
    alert("잠금해제!!");
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="잠금 해제 신청"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={requestUserUnlock} className={classes.btnAction}>
            잠금 해제 신청
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      <UserUnlockRequestModal
        retire={retire}
        onRetireChange={changeRetire}
        absence={absence}
        onAbsenceChange={changeAbsence}
        threat={threat}
        onThreatChange={changeThreat}
      />
    </DynamicButtonModalDialog>
  );
});

export default UserUnlockRequestModalContainer;
