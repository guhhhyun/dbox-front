import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DocVersionUpModal from "views/templates/doc/modals/version/DocVersionUpModal";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const DocVersionUpModalContainer = forwardRef(function (props, ref) {
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
   * 덮어쓰기
   */
  const overwrite = () => {
    alert("overwrite");
  };

  /**
   * 버전갱신
   */
  const increaseVersion = () => {
    alert("increaseVersion");
  };

  /**
   * 건너뛰기
   */
  const ignore = () => {
    alert("ignore");
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={overwrite} className={classes.btnAction}>
            덮어쓰기
          </Button>
          <Button color="primary" onClick={increaseVersion} className={classes.btnAction}>
            버전갱신
          </Button>
          <Button color="primary" onClick={ignore} className={classes.btnAction}>
            건너뛰기
          </Button>
        </Fragment>
      }
      title="자료버전 갱신"
      maxWidth="xs"
      fullWidth
    >
      <DocVersionUpModal />
    </DynamicButtonModalDialog>
  );
});

export default DocVersionUpModalContainer;
