import { Fragment, forwardRef } from "react";
import { Box} from "@material-ui/core";

import styles from "./HistoryEtcForm.module.css";

import HistorySearchFormContainer from "views/containers/history/etc/HistorySearchFormContainer";
import HistoryDeleteGridContainer from "views/containers/history/etc/HistoryDeleteGridContainer";

console.log("HistoryDeleteForm.js");

const HistoryDeleteForm = forwardRef(({onSearchCompany, getSearchData, getData}, ref) => {

  return (
    <Fragment>
      <div className={styles.contentBox}>
        <Box p={3}>
          <HistorySearchFormContainer onSearchCompany={onSearchCompany} getSearchData={getSearchData}/>
        </Box>


        <div className={styles.gridBox}>
          <HistoryDeleteGridContainer ref={ref} />
        </div>
        
      </div>
    </Fragment>
  );
});
 
export default HistoryDeleteForm;