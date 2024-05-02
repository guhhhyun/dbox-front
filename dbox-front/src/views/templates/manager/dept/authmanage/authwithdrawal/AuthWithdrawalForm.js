import { Fragment, forwardRef } from "react";
import { Box, Button } from "@material-ui/core";
import AuthWithdrawalGridContainer from "views/containers/manager/dept/authmanage/authwithdrawal/AuthWithdrawalGridContainer";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styles from "./AuthWithdrawal.module.css";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import AuthRequestSearchFormContainer from "views/containers/manager/dept/authmanage/authrequest/AuthRequestSearchFormContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("AuthWithdrawalForm.js");

const AuthWithdrawalForm = forwardRef(
  (
    {
      onSearchCompany,
      opened,
      buttonOption,
      openModal,
      closeModal,
      onModalOkClick,
      getGridData,
      errorMsg,
      alertOpened,
      closeAlertModal,
      deptCode,
      getData,
      clearOpened,
      closeClearModal,
    },
    ref,
  ) => {
    return deptCode != "" ? (
      <Fragment>
        <h3>
          <ListAltIcon />
          조회권한 처리결과 및 권한 일괄 회수
        </h3>
        <AuthRequestSearchFormContainer mgrDeptCode={deptCode} onSearchCompany={onSearchCompany} getData={getData} />
        <Box p={3} className={styles.action}>
          <Button variant="contained" onClick={openModal} color="primary">
            {buttonOption.buttonName}
          </Button>
          <AlertDialog open={alertOpened} content={errorMsg} onOkClick={closeAlertModal} onClose={closeAlertModal} />
          <ConfirmDialog
            open={opened}
            title={buttonOption.title}
            content={buttonOption.content}
            okText={buttonOption.okText}
            cancelText={buttonOption.cancelText}
            onOkClick={onModalOkClick}
            onClose={closeModal}
            maxWidth="sm"
            fullWidth
          ></ConfirmDialog>
          <ModalDialog
            open={clearOpened}
            content="변경사항이 반영되었습니다."
            okText="닫기"
            onOkClick={closeClearModal}
            onClose={closeClearModal}
            maxWidth="sm"
            fullWidth
          ></ModalDialog>
        </Box>

        <div className={styles.gridBox}>
          <AuthWithdrawalGridContainer getGridData={getGridData} deptCode={deptCode} ref={ref} />
        </div>
      </Fragment>
    ) : null;
  },
);
export default AuthWithdrawalForm;
