import { Fragment } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DocManagerModalContainer from "views/containers/doc/modals/docmanager/DocManagerModalContainer";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import styles from "./DocManagerModalButton.module.css";


console.debug("DocManagerModalButton.js");

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

export default function DocManagerModalButton({ deptManagers, opened, onButtonClick, onModalOkClick, onModalClose }) {
  
  const classes = useStyles();

  return (
    <div className={styles.manager}>
      <Button style={{ backgroundColor: "#ffffff" }} onClick={onButtonClick}>
        <span className={styles.title}>정</span> <span style={{ marginRight: "6px" }}>{deptManagers.main}</span>{" "}
        <span className={styles.title} style={{ backgroundColor: "#4A5268" }}>
          부
        </span>{" "}
        <span>{deptManagers.sub}</span>
      </Button>
      <DynamicButtonModalDialog
        open={opened}
        onClose={onModalClose}
        title="부서문서관리자 설정"
        maxWidth="sm"
        buttons={
          <Fragment>
            <Button color="primary" onClick={onModalOkClick} className={classes.btnAction}>
              확인
            </Button>
            <Button color="default" onClick={onModalClose} className={classes.btnAction}>
              취소
            </Button>
          </Fragment>
        }
        fullWidth
      >
        <DocManagerModalContainer />
      </DynamicButtonModalDialog>
    </div>
  );
}
