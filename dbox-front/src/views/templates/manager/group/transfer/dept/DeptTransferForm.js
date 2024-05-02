import { Fragment } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeptTransferContainer from "views/containers/manager/group/transfer/dept/DeptTransferContainer";

import styles from "./DeptTransfer.module.css";

export default function DeptTransferForm() {
  return (
    <Fragment>
      <h3>
        <ListAltIcon />
        부서별 이관
      </h3>
      <div className={styles.gridBox}>
        <DeptTransferContainer />
      </div>
    </Fragment>
  );
}
