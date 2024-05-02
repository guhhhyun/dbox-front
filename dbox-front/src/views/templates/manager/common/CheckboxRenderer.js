import React, { useState } from "react";

console.debug("CheckboxRenderer.js");

export default function CheckboxRenderer({ column, data, node, valueFormatted, value }) {
  const checkedHandler = (event) => {
    let checked = event.target.checked;
    if (checked === false) node.setDataValue(column.colId, "N");
    if (checked === true) node.setDataValue(column.colId, "Y");
  };

  return <input type="checkbox" onChange={checkedHandler} checked={value === "Y" ? true : false} />;
}
