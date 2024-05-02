import { useEffect, useRef } from "react";
import { ClickAwayListener } from "@material-ui/core";
import ContentIcon from "views/commons/icon/ContentIcon";

console.debug("DocNameEditor.js");

export default function DocNameEditor({ type, value, onChange, onClickAway }) {
  const editorRef = useRef(null);

  useEffect(() => {
    setTimeout(() => editorRef.current?.focus());
  }, []);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div style={{ display: "flex" }}>
        <ContentIcon type={type} />
        <input type="text" ref={editorRef} value={value} onChange={onChange} style={{ flex: 1 }} />
      </div>
    </ClickAwayListener>
  );
}
