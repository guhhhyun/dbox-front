import { Fragment, useState, forwardRef } from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import LockManageSearchFormContainer from "views/containers/manager/group/unusual/lockmanage/LockManageSearchFormContainer";
import LockManageModalButtonContainer from "views/containers/manager/group/unusual/lockmanage/LockManageModalButtonContainer";
import LockManageGridContainer from "views/containers/manager/group/unusual/lockmanage/LockManageGridContainer";
import { ListAlt, Label } from "@material-ui/icons";
import styles from "./LockManage.module.css";

console.debug("LockManageForm.js");


const LockManageForm = forwardRef(({ onSearchCompany, getData }, ref) => {
  const [checkedList, setCheckedList] = useState("");

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
          <ListAlt /> 잠금 사용자 해제 처리
      </Typography>
      <Divider></Divider>
      <Box pt={4}>
        <LockManageSearchFormContainer onSearchCompany={onSearchCompany} />
        <Box className={styles.action}>
          <LockManageModalButtonContainer checkedList={checkedList} getData={getData} />
        </Box>
        <Box pt={4}>
          <Typography  variant="h4" gutterBottom className={styles.h4}>
            <Label color="primary"/>사용자 잠금 현황
          </Typography>
          <LockManageGridContainer ref={ref} setCheckedList={setCheckedList} />
        </Box>
      </Box>
    </Fragment>
  );
});

export default LockManageForm;
