import { Fragment } from "react";
import { FormControl, InputLabel, MenuItem, Button, Select, makeStyles, withStyles } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("ApprovalForm.js");

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

export default function ApprovalForm({
  onCompanyChange,
  onApprovalChange,
  onButtonClick,
  openWarnModal,
  onModalOkClick,
  onModalClose,
  opened,
  warnOpened,
  closeWarnModal,
  approvalDefaultValue,
  approvalData,
  comCode,
  closeClearModal,
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
          <StyledSelect defaultValue={""} value={comCode}>
            <MenuItem value={comCode}>
              {comCode === "DKS" ? "동국제강" : comCode === "ITG" ? "인터지스" : comCode === "UNC" ? "동국시스템즈" : comCode === "FEI" ? "페럼인프라" : ""}
            </MenuItem>
          </StyledSelect>
        )}
      </StyledFormControl>

      <StyledFormControl variant="outlined">
        <StyledInputLabel>자료이관 승인 조건</StyledInputLabel>
        <StyledSelect value={approvalDefaultValue} onChange={onApprovalChange}>
          <MenuItem value={"N"}>승인 후 자료이관</MenuItem>
          <MenuItem value={"Y"}>미승인 자료이관</MenuItem>
        </StyledSelect>
      </StyledFormControl>
      <Button
        disabled={approvalData.length === 0 ? true : false}
        onClick={onButtonClick}
        variant="contained"
        size="small"
        disableElevation
        style={{ backgroundColor: "#00234b", color: "#ffffff" }}
      >
        적용
      </Button>
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
