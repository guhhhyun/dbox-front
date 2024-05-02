import { forwardRef, Fragment, useState } from "react";
import { Grid, Box, ButtonGroup, Button } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AlarmTableContainer from "views/containers/manager/group/manageauth/alarm/AlarmTableContainer";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

import styles from "./Alarm.module.css";
import AlarmCompanyButton from "views/templates/manager/group/manageauth/alarm/AlarmCompanyButton";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("AlarmForm.js");

const AlarmForm = forwardRef(
  (
    {
      onClickCompany,
      company,
      alarmSettingOpened,
      openAlarmSetting,
      closeAlarmSetting,
      onObjectIdValue,
      checkedAlarmValue,
      checkedEmailValue,
      checkedMmsValue,
      saveNotiConfig,
      comCode,
      clearOpened,
      closeClearModal,
    },
    ref,
  ) => {
    return (
      <Fragment>
        <Grid container className={styles.searchBox} spacing={2}>
          <AlarmCompanyButton comCode={comCode} company={company} onClickCompany={onClickCompany} />

          <div className={styles.searchBtn}>
            <Button onClick={openAlarmSetting} variant="contained" color="primary">
              설정 저장
            </Button>
            <ConfirmDialog
              open={alarmSettingOpened}
              title="알림 / 통보방식 변경"
              content="적용하시겠습니까?"
              okText="예"
              cancelText="아니요"
              onOkClick={saveNotiConfig}
              onClose={closeAlarmSetting}
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
          </div>
        </Grid>
        <Box p={3} className={styles.action}></Box>
        <h3>
          <ListAltIcon />
          알람/통보방식 관리
        </h3>
        <div className={styles.gridBox}>
          <AlarmTableContainer
            company={company}
            ref={ref}
            onObjectIdValue={onObjectIdValue}
            checkedAlarmValue={checkedAlarmValue}
            checkedEmailValue={checkedEmailValue}
            checkedMmsValue={checkedMmsValue}
            saveNotiConfig={saveNotiConfig}
          />
        </div>
      </Fragment>
    );
  },
);

export default AlarmForm;
