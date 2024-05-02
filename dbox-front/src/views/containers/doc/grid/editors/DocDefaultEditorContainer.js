import { forwardRef, useImperativeHandle, useState } from "react";
import DocDefaultEditor from "views/templates/doc/grid/editors/DocDefaultEditor";

console.debug("DocDefaultEditorContainer.js");

const DocDefaultEditorContainer = forwardRef(function ({ value, api }, ref) {
  const [editorValue, setEditorValue] = useState(value);

  useImperativeHandle(ref, () => ({
    getValue: () => editorValue,
  }));

  /**
   * 에디터 내용 수정
   */
  const changeEditorValue = (event) => {
    setEditorValue(event.target.value);
  };

  /**
   * 에디터 상태 취소
   */
  const stopEditing = () => {
    api.stopEditing();
  };

  return <DocDefaultEditor value={editorValue} onChange={changeEditorValue} onClickAway={stopEditing} />;
});

export default DocDefaultEditorContainer;
