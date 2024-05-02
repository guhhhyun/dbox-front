import { Fragment } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AttachGridContainer from "views/containers/manager/group/attach/AttachGridContainer";
import AttachModalButtonContainer from "views/containers/manager/group/attach/AttachModalButtonContainer";

import styles from "./Attach.module.css";

console.log("AttachForm.js");

export default function AttachForm() {
  return (
    <Fragment>
      <div className={styles.sectionBox}>
        <h3>
          <ListAltIcon />
          D'Box 자료의 인터페이스 정책 설정
        </h3>
        <div className={styles.searchBtn}>
          <AttachModalButtonContainer />
        </div>
        <div className={styles.gridBox}>
          <AttachGridContainer />
        </div>
      </div>
    </Fragment>
  );
}
