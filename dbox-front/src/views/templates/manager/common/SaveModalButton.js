import { Fragment } from "react";
import { Button, withStyles } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

console.debug("SaveModalButton.js");

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

export default function SaveModalButton({ buttonOption, opened, onButtonClick, onModalOkClick, onModalClose }) {
  return (
    <Fragment>
      <StyledButton variant="contained" onClick={onButtonClick}>
        {buttonOption.buttonName}
      </StyledButton>
      <ConfirmDialog
        open={opened}
        content={buttonOption.content}
        okText={buttonOption.okText}
        cancelText={buttonOption.cancelText}
        onOkClick={onModalOkClick}
        onClose={onModalClose}
        maxWidth="sm"
        fullWidth
      ></ConfirmDialog>
    </Fragment>
  );
}
