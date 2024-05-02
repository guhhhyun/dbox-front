import { Fragment, forwardRef, useImperativeHandle, useRef } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styles from "./RoleManagement.module.css";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import RoleManagementTableContainer from "views/containers/manager/group/manageauth/rolemanagement/RoleManagementTableContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("RoleManagementForm.js");

const RoleManagementForm = forwardRef(
  (
    {
      roleTableData,
      handleChange,
      tableValue,
      openAlertDialog,
      closeAlertDialog,
      alertModalOpened,
      companyHandleChange,
      deptHandleChange,
      auditHandleChange,
      companyCheckValue,
      deptCheckValue,
      auditCheckValue,
      updatePolicy,
      modalDialogOpen,
      clearOpened,
      closeClearModal,
    },
    ref,
  ) => {
    const user = useSelector((state) => state.session.user);
    const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

    return (
      <Fragment>
        <h3>
          <ListAltIcon />
          업무역할별 권한 관리
        </h3>
        <FormControl variant="outlined">
          <InputLabel>접근 권한</InputLabel>

          <Select margin="dense" name="company" onChange={handleChange} defaultValue={"G"} style={{ width: "200px" }}>
            <MenuItem value={"G"}>기본 접근 권한</MenuItem>
            <MenuItem value={"P"}>개인정보 접근 권한</MenuItem>
          </Select>
        </FormControl>
        <Button disabled={comCode === "DKG" ? false : true} onClick={openAlertDialog} variant="contained" color="primary">
          설정 저장
        </Button>
        <ConfirmDialog
          open={alertModalOpened}
          title="업무 역할별 정책 변경"
          content="설정값을 변경하시겠습니까?"
          okText="예"
          cancelText="아니요"
          onOkClick={updatePolicy}
          onClose={closeAlertDialog}
          maxWidth="sm"
          fullWidth
        ></ConfirmDialog>
        <ModalDialog open={modalDialogOpen} title="알림">
          <Typography gutterBottom>부서 문서관리자 정책 변경 중입니다. </Typography>
          <Typography gutterBottom>작업이 완료되면 자동으로 창이 닫힙니다. (약 30초 소요)</Typography>
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
          <RoleManagementTableContainer
            roleTableData={roleTableData}
            tableValue={tableValue}
            companyHandleChange={companyHandleChange}
            deptHandleChange={deptHandleChange}
            auditHandleChange={auditHandleChange}
            companyCheckValue={companyCheckValue}
            deptCheckValue={deptCheckValue}
            auditCheckValue={auditCheckValue}
          />
        </div>
      </Fragment>
    );
  },
);

export default RoleManagementForm;
