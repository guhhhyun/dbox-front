import React from "react";
import {MenuItem} from "@material-ui/core";

export default function PeriodItems(to, suffix) {
  const numberArray = Array.from(new Array(to), (x, i) => i + 1);
  return numberArray.map((index) => {
    return (<MenuItem value={index}>{index}{suffix}</MenuItem>)
  });
};