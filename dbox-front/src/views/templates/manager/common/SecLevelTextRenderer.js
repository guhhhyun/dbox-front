import React, { Fragment } from "react";

console.debug("SecLevelTextRenderer.js");

export default function SecLevelTextRenderer({ column, node, value }) {
  return node.data.uSecLevel === "S"
    ? "제한"
    : node.data.uSecLevel === "T"
    ? "팀내"
    : node.data.uSecLevel === "C"
    ? "사내"
    : node.data.uSecLevel === "G"
    ? "그룹사내"
    : "";
}
