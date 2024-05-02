import { Fragment, forwardRef } from "react";
import ManageIdGridContainer from "views/containers/manager/group/managepolicy/manageid/ManageIdGridContainer";
import ManageIdSearchContainer from "views/containers/manager/group/managepolicy/manageid/ManageIdSearchContainer";
import ListAltIcon from "@material-ui/icons/ListAlt";

import styles from "./ManageId.module.css";

console.debug("ManageIdForm.js");

const ManageIdForm = forwardRef(({ onSearchTreeData, comCode }, ref) => {
  return (
    <Fragment>
      <h3>
        <ListAltIcon />
        사용자 ID 관리 설정
      </h3>

      <ManageIdSearchContainer onSearchTreeData={onSearchTreeData} comCode={comCode} />

      <h5>※ 특이사용자로 잠금 처리된 사용자는 해당 페이지에서 사용처리할 수 없습니다.</h5>
      <div className={styles.gridBox}>
        <ManageIdGridContainer onSearchTreeData={onSearchTreeData} comCode={comCode} ref={ref} />
      </div>
    </Fragment>
  );
});
export default ManageIdForm;
