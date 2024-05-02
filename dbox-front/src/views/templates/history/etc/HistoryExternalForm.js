import { Fragment, forwardRef } from "react";
import { Box} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";

import styles from "./HistoryEtcForm.module.css";

import HistorySearchAttachFormContainer from "views/containers/history/etc/HistorySearchAttachFormContainer";
import HistoryExternalGridContainer from "views/containers/history/etc/HistoryExternalGridContainer";


console.log("HistoryExternalForm.js");

const HistoryExternalForm = forwardRef(({onSearchTreeData, getSearchData, comCode}, ref) => {

  return (
    <Fragment>
      <h3>
        <ListAltIcon />
        외부 사이트 파일 반출 이력
      </h3>

      <Box p={3}>
          <HistorySearchAttachFormContainer onSearchCompany={onSearchTreeData} getSearchData={getSearchData}  />
        </Box>

    <div className={styles.gridBox}>
        <HistoryExternalGridContainer onSearchTreeData={onSearchTreeData} comCode={comCode} ref={ref} />
      </div>

    </Fragment>
  );
});
 
export default HistoryExternalForm;