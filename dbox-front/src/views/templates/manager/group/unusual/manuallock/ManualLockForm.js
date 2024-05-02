import { Fragment, useState, forwardRef } from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import ManualSearchFormContainer from "views/containers/manager/group/unusual/manuallock/ManualSearchFormContainer";
import ManualLockModalButtonContainer from "views/containers/manager/group/unusual/manuallock/ManualLockModalButtonContainer";
import ManualLockGridContainer from "views/containers/manager/group/unusual/manuallock/ManualLockGridContainer";
import RequestLockContainer from "views/containers/manager/group/unusual/manuallock/RequestLockContainer";
import { ListAlt } from "@material-ui/icons";
import styles from "./ManualLock.module.css";

console.debug("ManualLockForm.js");

const ManualLockForm = forwardRef(({ onSearchCompany, getData }, ref) => {
  const [checkedList, setCheckedList] = useState("");

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
          <ListAlt /> 사용자 잠금 처리
      </Typography>
      <Divider></Divider>
      <Box pt={4} pb={4}>
        <ManualSearchFormContainer onSearchCompany={onSearchCompany} />
        <Box className={styles.action}>
          <ManualLockModalButtonContainer checkedList={checkedList} getData={getData} />
        </Box>
        <Box pt={4}>
          <Typography variant="overline" gutterBottom>
            ※ 사용자 잠금 대상 List는 1회 이상 특이사용 기준값을 초과한 경우
          </Typography>
          <ManualLockGridContainer ref={ref} setCheckedList={setCheckedList} />
        </Box>
      </Box>
      <RequestLockContainer />
    </Fragment>
  );
});

export default ManualLockForm;
