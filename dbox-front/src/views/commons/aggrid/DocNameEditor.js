import { useEffect, useRef } from "react";
import { ClickAwayListener } from "@material-ui/core";
import ContentIcon from "views/commons/icon/ContentIcon";

console.debug("DocNameEditor.js");

export default function DocNameEditor({ type, value, onChange, onClickAway }) {
  const refInput = useRef(null);

  useEffect(() => {
    setTimeout(() => refInput.current.focus());
  });

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div>
        <ContentIcon type={type} />
        <input type="text" ref={refInput} value={value} onChange={onChange} />
      </div>
    </ClickAwayListener>
  );
}
