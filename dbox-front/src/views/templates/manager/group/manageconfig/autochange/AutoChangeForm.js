import { Fragment } from "react";
import { FormControl, InputLabel, MenuItem, Button, Select, withStyles } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("AutoChangeForm.js");

const StyledFormControl = withStyles((theme) => ({
  root: {
    width: "150px",
    marginRight: theme.spacing(1),
  },
}))(FormControl);

const StyledSelect = withStyles((theme) => ({
  root: {
    padding: "7.5px",
  },
}))(Select);

const StyledInputLabel = withStyles((theme) => ({
  outlined: {
    transform: "translate(14px, 9px) scale(1)",
  },
}))(InputLabel);

const StyledButton = withStyles((theme) => ({
  root: {
    height: "34px",
    backgroundColor: "#00234b",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#00234b",
    },
  },
}))(Button);

export default function AutoChangeForm({
  onCompanyChange,
  onAutoChange,
  onButtonClick,
  onModalOkClick,
  onModalClose,
  opened,
  autoChangeData,
  autoChangeDefaultValue,
  comCode,
  openWarnModal,
  closeWarnModal,
  closeClearModal,
  warnOpened,
  clearOpened,
}) {
  return (
    <Fragment>
      <StyledFormControl variant="outlined">
        <StyledInputLabel>회사 명</StyledInputLabel>
        {comCode === "DKG" ? (
          <StyledSelect defaultValue={""} onChange={onCompanyChange}>
            <MenuItem value={"DKS"}>동국제강</MenuItem>
            <MenuItem value={"ITG"}>인터지스</MenuItem>
            <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
            <MenuItem value={"FEI"}>페럼인프라</MenuItem>
          </StyledSelect>
        ) : (
          <StyledSelect value={comCode}>
            <MenuItem value={comCode}>
              {comCode === "DKS" ? "동국제강" : comCode === "ITG" ? "인터지스" : comCode === "UNC" ? "동국시스템즈" : comCode === "FEI" ? "페럼인프라" : ""}
            </MenuItem>
          </StyledSelect>
        )}
      </StyledFormControl>

      <StyledFormControl variant="outlined">
        <StyledInputLabel>Closed 자동처리기간</StyledInputLabel>
        <StyledSelect value={autoChangeDefaultValue} onChange={onAutoChange}>
          <MenuItem value={"30"}>30일</MenuItem>
          <MenuItem value={"45"}>45일</MenuItem>
          <MenuItem value={"60"}>60일</MenuItem>
          <MenuItem value={"90"}>90일</MenuItem>
          <MenuItem value={"120"}>120일</MenuItem>
          <MenuItem value={"150"}>150일</MenuItem>
          <MenuItem value={"180"}>180일</MenuItem>
        </StyledSelect>
      </StyledFormControl>
      <StyledButton disabled={autoChangeData.length === 0 ? true : false} onClick={onButtonClick} variant="contained" size="small" disableElevation>
        적용
      </StyledButton>
      <ConfirmDialog
        open={opened}
        content="적용하시겠습니까?"
        okText="예"
        cancelText="아니요"
        onOkClick={onModalOkClick}
        onClose={onModalClose}
        maxWidth="sm"
        fullWidth
      ></ConfirmDialog>
      <ModalDialog
        open={warnOpened}
        content="회사명을 선택해주세요."
        okText="확인"
        onOkClick={closeWarnModal}
        onClose={closeWarnModal}
        maxWidth="sm"
        fullWidth
      ></ModalDialog>
      <ModalDialog
        open={clearOpened}
        content="변경사항이 반영되었습니다."
        okText="닫기"
        onOkClick={closeClearModal}
        onClose={closeClearModal}
        maxWidth="sm"
        fullWidth
      ></ModalDialog>
    </Fragment>
  );
}
