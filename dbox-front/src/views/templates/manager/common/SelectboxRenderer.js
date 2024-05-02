import React, { Fragment } from "react";

console.debug("SelectboxRenderer.js");

export default function SelectboxRenderer({ column, node, value, getSelectData, onSelectionChanged }) {
  const selectHandler = (event) => {
    node.setDataValue(column.colId, event.target.value);
    getSelectData(event.target.value);

    onSelectionChanged();
    node.setDataValue("uRejectReason", "");
  };

  return (
    <Fragment>
      <select onChange={selectHandler}>
        <option value="R">선택</option>
        <option value="A">승인</option>
        <option value="D">반려</option>
      </select>
    </Fragment>
  );
}
