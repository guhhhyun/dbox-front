import { Fragment } from "react";
import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

export default function ConfirmModalDialog({ option, opened, onButtonClick, onModalOkClick, onModalClose }) {
  return (
    <Fragment>
      <Button variant="contained" onClick={onButtonClick} color="primary">
        {option.buttonName}
      </Button>
      <ConfirmDialog
        open={opened}
        title={option.title}
        content={option.content}
        children={option.children}
        okText={option.okText}
        cancelText={option.cancelText}
        onOkClick={onModalOkClick}
        onClose={onModalClose}
        maxWidth="sm"
        fullWidth
      />
    </Fragment>
  );
}
