import LimitTable from "views/templates/manager/group/managepolicy/limit/LimitTable";
import { useState, useRef, useImperativeHandle, useEffect, forwardRef } from "react";
import LimitApi from "apis/limit-api";

console.debug("LimitTableContainer.js");

export default function LimitTableContainer({
  limitData,
  regValue,
  copyValue,
  moveValue,
  delValue,
  transValue,
  sizeValue,
  temRegValue,
  temSizeValue,
  temTermValue,
  handleRegChange,
  handleCopyChange,
  handleMoveChange,
  handleDelChange,
  handleTransChange,
  handleSizeChange,
  handleTemRegChange,
  handleTemSizeChange,
  handleTemTermChange,
}) {
  const [columnPcModal, setColumnPcModal] = useState(false);
  const [columnModal, setColumnModal] = useState(false);

  /**
   *  컬럼 설명 부분
   */
  const openColumnPcModal = () => {
    setColumnPcModal(true);
  };

  const openColumnModal = () => {
    setColumnModal(true);
  };

  const closeColumnModal = () => {
    setColumnModal(false);
    setColumnPcModal(false);
  };

  return (
    <LimitTable
      limitData={limitData}
      regValue={regValue}
      copyValue={copyValue}
      moveValue={moveValue}
      delValue={delValue}
      transValue={transValue}
      sizeValue={sizeValue}
      temRegValue={temRegValue}
      temSizeValue={temSizeValue}
      temTermValue={temTermValue}
      handleRegChange={handleRegChange}
      handleCopyChange={handleCopyChange}
      handleMoveChange={handleMoveChange}
      handleDelChange={handleDelChange}
      handleTransChange={handleTransChange}
      handleSizeChange={handleSizeChange}
      handleTemRegChange={handleTemRegChange}
      handleTemSizeChange={handleTemSizeChange}
      handleTemTermChange={handleTemTermChange}
      openColumnPcModal={openColumnPcModal}
      openColumnModal={openColumnModal}
      closeColumnModal={closeColumnModal}
      columnPcModal={columnPcModal}
      columnModal={columnModal}
    />
  );
}
