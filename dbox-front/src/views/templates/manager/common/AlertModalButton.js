import { Fragment } from "react";
import { Button } from "@material-ui/core";
import AlertDialog from "views/commons/dialog/AlertDialog";

console.debug("AlertModalButton.js");

export default function AlertModalButton({ buttonName, content, opened, onButtonClick, onAlertDialogOkClick, onAlertDialogClose }) {
  return (
    <Fragment>
      <Button variant="contained" onClick={onButtonClick} color="primary">
        {buttonName}
      </Button>
      <AlertDialog open={opened} content={content} onOkClick={onAlertDialogOkClick} onClose={onAlertDialogClose} />
    </Fragment>
  );
}
