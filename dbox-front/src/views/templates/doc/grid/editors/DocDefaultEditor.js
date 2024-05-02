import { useEffect, useRef } from "react";
import { ClickAwayListener } from "@material-ui/core";

console.debug("DocDefaultEditor.js");

export default function DocDefaultEditor({ value, onChange, onClickAway }) {
  const editorRef = useRef();

  useEffect(() => {
    setTimeout(() => editorRef.current.focus());
  }, []);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div>
        <input ref={editorRef} type="text" value={value} onChange={onChange} />
      </div>
    </ClickAwayListener>
  );
}
