import { Fragment } from "react";
import { Button, TextField, withStyles } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import styles from "./LockManage.module.css";

console.debug("UnlockModalButton.js");

const StyledButton = withStyles((theme) => ({
  root: {
    height: "34px",
    backgroundColor: "#00234b",
    color: "#ffffff",
    "&:hover": {
        backgroundColor: "#00234b"
    }
  },
}))(Button);


export default function UnlockModalButton({ buttonOption, opened, onButtonClick, onModalOkClick, onModalClose, onRequestReasonChanged }) {
  return (
    <Fragment>
      <StyledButton variant="contained" onClick={onButtonClick}>
        {buttonOption.buttonName}
      </StyledButton>
      <ConfirmDialog open={opened} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth>
        <div className={styles.content}>{buttonOption.content}</div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="requestReason"
          autoFocus
          onChange={(event) => onRequestReasonChanged(event.target.value)}
        />
      </ConfirmDialog>
    </Fragment>
  );
}
