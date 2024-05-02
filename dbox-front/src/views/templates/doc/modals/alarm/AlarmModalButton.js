import { Fragment } from "react";
import { Badge, IconButton } from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import ModalDialog from "views/commons/dialog/ModalDialog";
import AlarmModalContainer from "views/containers/doc/modals/alarm/AlarmModalContainer";

console.debug("AlarmModalButton.js");

export default function AlarmModalButton({ alarmCount, opened, onButtonClick, onModalOkClick, onModalClose }) {
  return (
    <Fragment>
      <IconButton size="small" onClick={onButtonClick}>
        <Badge badgeContent={alarmCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>
      <ModalDialog open={opened} title="알 림" onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="lg" fullWidth>
        <AlarmModalContainer />
      </ModalDialog>
    </Fragment>
  );
}
