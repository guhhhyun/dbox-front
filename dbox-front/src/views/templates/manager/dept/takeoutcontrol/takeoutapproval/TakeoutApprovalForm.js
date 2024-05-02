import { Fragment, forwardRef } from "react";
import { Box, Button } from "@material-ui/core";
import AuthRequestGridContainer from "views/containers/manager/dept/authmanage/authrequest/AuthRequestGridContainer";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styles from "./TakeoutApproval.module.css";
import AuthRequestSearchFormContainer from "views/containers/manager/dept/authmanage/authrequest/AuthRequestSearchFormContainer";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("TakeoutApprovalForm.js");

const TakeoutApprovalForm = forwardRef(
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
    return (
      <Fragment>
        <h3>
          <ListAltIcon />
          복호화 반출 승인 처리
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
          <AuthRequestGridContainer getGridData={getGridData} deptCode={deptCode} ref={ref} />
        </div>
      </Fragment>
    );
  },
);

export default TakeoutApprovalForm;
