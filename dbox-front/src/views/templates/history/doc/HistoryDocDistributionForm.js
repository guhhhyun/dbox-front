import { Fragment, forwardRef } from "react";
import { Box} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styles from "./HistoryDocForm.module.css";

import HistorySearchDistFormContainer from "views/containers/history/doc/HistorySearchDistFormContainer";
import HistoryDocDistributionGridContainer from "views/containers/history/doc/HistoryDocDistributionGridContainer";
import HistoryDocDistDetailGridContainer from "views/containers/history/doc/HistoryDocDistDetailGridContainer";

console.log("HistoryDocDistributionForm.js");

const HistoryDocDistributionForm = forwardRef(({ searchCode, getSearchData, getData, onDetailOpen, onCellClicked}, ref) => {

  return (
    <Fragment>
      <div className={styles.contentBox}>
        <Box p={3}>
          {/* <HistoryStandard /> */}
          <HistorySearchDistFormContainer getSearchData={getSearchData} />
        </Box>

        <div className={styles.gridBox}>
          <HistoryDocDistributionGridContainer searchCode={searchCode} onDetailOpen={onDetailOpen} onCellClicked={onCellClicked} ref={elem => (ref.current[0] = elem)} />
        </div>
        

        {/* <h3 className={styles.h3}><br/><Equalizer /> 상세이력<br/></h3> */}
        <h3>
        <br/> 
        <ListAltIcon /> 
        상세이력
        </h3>
        
        <div className={styles.gridBox}>
          <HistoryDocDistDetailGridContainer ref={elem => (ref.current[1] = elem)} />
        </div>

      </div>
    </Fragment>
  );
});
 
export default HistoryDocDistributionForm;