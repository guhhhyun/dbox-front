import React, { Fragment } from "react";

console.debug("StatusTextRenderer.js");

export default function StatusTextRenderer({ column, node, value }) {
  return node.data.uReqStatus === "A" ? "승인" : node.data.uReqStatus === "D" ? "반려" : node.data.uReqStatus === "C" ? "회수" : null;
}
