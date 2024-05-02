import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import DocCopyModal from "views/templates/doc/modals/paste/DocCopyModal";

console.debug("DocCopyModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const DocCopyModalContainer = forwardRef(function (props, ref) {
  const [opened, setOpened] = useState(false);

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
   * 복사
   */
  const copy = () => {
    alert("copy");
    setOpened(false);
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="복사"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={copy} className={classes.btnAction}>
            예
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            아니오
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      <DocCopyModal />
    </DynamicButtonModalDialog>
  );
});

export default DocCopyModalContainer;
