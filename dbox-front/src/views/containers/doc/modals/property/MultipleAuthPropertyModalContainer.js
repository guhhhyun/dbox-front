import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import MultipleAuthPropertyModal from "views/templates/doc/modals/property/MultipleAuthPropertyModal";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

console.debug("MultipleAuthPropertyModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const MultipleAuthPropertyModalContainer = forwardRef(function (props, ref) {
  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState(0);
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
   * 탭 전환
   */
  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  /**
   * 권한 일괄 변경
   */
  const saveAuths = () => {
    setConfirmOpened(true);
  };

  /**
   * 권한 일괄 변경 진행
   */
  const continueSavingAuths = () => {
    setConfirmOpened(false);
    setOpened(false);
  };

  /**
   * 권한 일괄 변경 취소
   */
  const cancelSavingAuths = () => {
    setConfirmOpened(false);
  };

  const classes = useStyles();
  
  return (
    <DynamicButtonModalDialog
      open={opened}
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={saveAuths} className={classes.btnAction}>
            확인
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
          <Button disabled className={classes.btnAction}>적용</Button>
        </Fragment>
      }
      title="권한 일괄 변경"
      maxWidth="xs"
      fullWidth
    >
      <MultipleAuthPropertyModal tab={tab} onTabChange={changeTab} />
      <ConfirmDialog
        open={confirmOpened}
        content={"선택하신 폴더에 대해서만 변경됩니다.(하위 폴더/문서 제외)\n권한 설정을 진행하시겠습니까?"}
        onOkClick={continueSavingAuths}
        onClose={cancelSavingAuths}
      />
    </DynamicButtonModalDialog>
  );
});

export default MultipleAuthPropertyModalContainer;
