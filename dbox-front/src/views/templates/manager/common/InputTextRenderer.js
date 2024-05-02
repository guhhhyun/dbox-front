import React, { Fragment } from "react";

console.debug("InputTextRenderer.js");

export default function InputTextRenderer({ column, node, value }) {
  const inputHandler = (event) => {
    if (node.data.uReqStatus === "D") {
      node.setDataValue(column.colId, event.target.value.trim());
    }
  };
  return node.data.uReqStatus === "D" ? (
    <Fragment>
      <input onChange={inputHandler} type="text"></input>
    </Fragment>
  ) : null;
}
