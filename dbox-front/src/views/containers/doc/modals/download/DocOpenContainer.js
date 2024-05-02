import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import DocAuthRequestModal from "views/templates/doc/modals/auth/DocAuthRequestModal";
import DocOpenModal from "views/templates/doc/modals/download/DocOpenModal";

console.debug("DocAuthRequestModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px",
  },
});

const DocOpenModalContainer = forwardRef(function ({ data }, ref) {
  const classes = useStyles();

  const [opened, setOpened] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal,
    clickRead,
    clickEdit,
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
   * 편집 모드 클릭
   */
  const clickEdit = () => {
    window.WSFileOpen(data.rObjectId, data.rVersionLabel[data.rVersionLabel.length - 1], data.objectName, "2");
  };

  /**
   * 읽기 모드 클릭
   */
  const clickRead = () => {
    window.WSFileOpen(data.rObjectId, data.rVersionLabel[data.rVersionLabel.length - 1], data.objectName, "4");
  };

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="문서 열기"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="default" onClick={clickEdit} className={classes.btnAction}>
            편집모드
          </Button>
          <Button color="default" onClick={clickRead} className={classes.btnAction}>
            읽기전용
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      <DocOpenModal />
    </DynamicButtonModalDialog>
  );
});

export default DocOpenModalContainer;
