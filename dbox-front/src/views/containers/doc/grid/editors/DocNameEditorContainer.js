import { useState } from "react";
import DocNameEditor from "views/templates/doc/grid/editors/DocNameEditor";
import { CATEGORY_FOLDER, DATA_TYPE, ICON_TYPE, TREE_TYPE } from "constants/code-constants";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

console.debug("DocNameEditorContainer.js");

const DocNameEditorContainer = forwardRef(function ({ value, data, api }, ref) {
  //  아이콘 타입 설정
  let iconType = ICON_TYPE.DOCUMENT.key;
  if (data?.type === TREE_TYPE.DEPT.key) {
    iconType = ICON_TYPE.FOLDER.key;
  } else if (data?.type === TREE_TYPE.CATEGORY.key) {
    if (data.data.key === CATEGORY_FOLDER.TRASH.key) iconType = ICON_TYPE.TRASH.key;
    else iconType = ICON_TYPE.FOLDER.key;
  } else if (data?.type === TREE_TYPE.DATA.key) {
    if (data.data.dataType === DATA_TYPE.FOLDER.key) {
      iconType = ICON_TYPE.FOLDER.key;
    } else {
      if (ICON_TYPE.EXCEL.exts.includes(data.data.uFileExt)) iconType = ICON_TYPE.EXCEL.key;
      if (ICON_TYPE.PPT.exts.includes(data.data.uFileExt)) iconType = ICON_TYPE.PPT.key;
      if (ICON_TYPE.WORD.exts.includes(data.data.uFileExt)) iconType = ICON_TYPE.WORD.key;
    }
  } else {
    if (data.data.dataType === DATA_TYPE.FOLDER.key) iconType = ICON_TYPE.FOLDER.key;
    else iconType = ICON_TYPE.DOCUMENT.key;
  }

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

  return <DocNameEditor type={iconType} value={editorValue} onChange={changeEditorValue} onClickAway={stopEditing} />;
});

export default DocNameEditorContainer;
