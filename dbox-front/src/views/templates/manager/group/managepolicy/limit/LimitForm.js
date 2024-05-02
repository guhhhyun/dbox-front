import { Fragment } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LimitTableContainer from "views/containers/manager/group/managepolicy/limit/LimitTableContainer";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

import styles from "./Limit.module.css";

console.log("LimitForm.js");

export default function LimitForm({
  handleChange,
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
  saveLimit,
  opened,
  onButtonClick,
  onModalClose,
  closeWarnModal,
  warnOpened,
  comCode,
  clearOpened,
  closeClearModal,
}) {
  const okText = "예";
  const cancelText = "아니오";
  const title = "알림";

  return (
    <Fragment>
      <h3>
        <ListAltIcon />
        기능별 최대 처리량 설정
      </h3>

      <FormControl variant="outlined">
        <InputLabel>회사 명</InputLabel>
        {comCode === "DKG" ? (
          <Select margin="dense" name="company" defaultValue={"DKS"} onChange={handleChange} style={{ width: "150px" }}>
            <MenuItem value={"DKS"}>동국제강</MenuItem>
            <MenuItem value={"ITG"}>인터지스</MenuItem>
            <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
            <MenuItem value={"FEI"}>페럼인프라</MenuItem>
          </Select>
        ) : comCode != "DKG" ? (
          <Select margin="dense" name="company" defaultValue={comCode} style={{ width: "150px" }}>
            <MenuItem value={comCode}>
              {comCode === "DKS" ? "동국제강" : comCode === "ITG" ? "인터지스" : comCode === "UNC" ? "동국시스템즈" : comCode === "FEI" ? "페럼인프라" : ""}
            </MenuItem>
          </Select>
        ) : null}
      </FormControl>
      <Button onClick={onButtonClick} variant="contained" color="primary">
        수정
      </Button>
      <ConfirmDialog open={opened} title={title} okText={okText} cancelText={cancelText} onOkClick={saveLimit} onClose={onModalClose} maxWidth="sm" fullWidth>
        기능별 최대 처리량을 수정하시겠습니까?
      </ConfirmDialog>
      <ModalDialog open={warnOpened} title="알림" okText="닫기" onOkClick={closeWarnModal} onClose={closeWarnModal}>
        <Typography gutterBottom>설정값을 수정해주세요. </Typography>

        <Typography gutterBottom>※ 공백 혹은 최대 설정 초과값이 존재합니다. </Typography>
      </ModalDialog>
      <ModalDialog
        open={clearOpened}
        content="변경사항이 반영되었습니다."
        okText="닫기"
        onOkClick={closeClearModal}
        onClose={closeClearModal}
        maxWidth="sm"
        fullWidth
      ></ModalDialog>

      <div className={styles.gridBox}>
        <LimitTableContainer
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
        />
      </div>
    </Fragment>
  );
}
