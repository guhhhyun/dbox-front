import { Fragment, forwardRef, useEffect } from "react";
import { Box} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";

import styles from "./HistoryEtcForm.module.css";

import HistorySearchAttachFormContainer from "views/containers/history/etc/HistorySearchAttachFormContainer";
import HistoryMessengerGridContainer from "views/containers/history/etc/HistoryMessengerGridContainer";

console.log("HistoryMessengerForm.js");

const HistoryMessengerForm = forwardRef(({onSearchTreeData, getSearchData, comCode}, ref) => {

  return (
    <Fragment>
      <h3>
        <ListAltIcon />
        외부 메신저 연동 이력
      </h3>

      <Box p={3}>
          <HistorySearchAttachFormContainer onSearchCompany={onSearchTreeData} getSearchData={getSearchData} />
        </Box>

      <div className={styles.gridBox}>
        <HistoryMessengerGridContainer onSearchTreeData={onSearchTreeData} comCode={comCode} ref={ref} />
      </div>

    </Fragment>
  );
});
 
export default HistoryMessengerForm;