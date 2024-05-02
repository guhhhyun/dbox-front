import { Fragment, useRef } from "react";
import { IconButton, Popover } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import HelpPopper from "views/templates/doc/modals/help/HelpPopper";

console.debug("HelpPopperButton.js");

export default function HelpPopperButton({ opened, onButtonClick, onClose }) {
  const buttonRef = useRef(null);

  return (
    <Fragment>
      <IconButton ref={buttonRef} size="small" onClick={onButtonClick}>
        <Help />
      </IconButton>
      <Popover
        open={opened}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={onClose}
      >
        <HelpPopper />
      </Popover>
    </Fragment>
  );
}
