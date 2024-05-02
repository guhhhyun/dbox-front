import { Fragment, useState, forwardRef } from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import UnlockHistorySearchFormContainer from "views/containers/manager/group/unusual/unlockhistory/UnlockHistorySearchFormContainer";
import UnLockHistoryModalButtonContainer from "views/containers/manager/group/unusual/unlockhistory/UnLockHistoryModalButtonContainer";
import UnlockHistoryGridContainer from "views/containers/manager/group/unusual/unlockhistory/UnlockHistoryGridContainer";
import { ListAlt, Label } from "@material-ui/icons";
import styles from "./UnlockHistory.module.css";

console.debug("UnlockHistoryForm.js");

//export default function UnlockHistoryForm() {
const UnlockHistoryForm = forwardRef(({ onSearchCompany, getData }, ref) => {
  const [checkedList, setCheckedList] = useState("");

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
          <ListAlt /> 사용자 잠금 해제 이력
      </Typography>
      <Divider></Divider>
      <Box pt={4}>
        <UnlockHistorySearchFormContainer onSearchCompany={onSearchCompany} />
        <Box className={styles.action}>
          <UnLockHistoryModalButtonContainer checkedList={checkedList} getData={getData} />
        </Box>
        <Box pt={4}>
          <Typography  variant="h4" gutterBottom className={styles.h4}>
            <Label color="primary"/>사용자 잠금 해제 이력
          </Typography>
          <UnlockHistoryGridContainer ref={ref} setCheckedList={setCheckedList} />
        </Box>
      </Box>
    </Fragment>
  );
});

export default UnlockHistoryForm;
