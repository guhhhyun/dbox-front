import React from "react";

console.debug("StoragePeriodListModalContainer.js");

export default function StoragePeriodListModalContainer({ paramNumValue }) {
  return paramNumValue === 1
    ? "휴지통 대기 리스트"
    : paramNumValue === 2
    ? "휴지통 폐기 리스트"
    : paramNumValue === 3
    ? "개별폐기 대기 리스트"
    : paramNumValue === 4
    ? "개별폐기 폐기 리스트"
    : paramNumValue === 5
    ? "보존연한 대기 리스트"
    : paramNumValue === 6
    ? "보존연한 폐기 리스트"
    : null;
}
