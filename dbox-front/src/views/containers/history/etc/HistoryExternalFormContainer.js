import { useRef } from "react";
import { useSelector } from "react-redux";
import HistoryExternalForm from "views/templates/history/etc/HistoryExternalForm";

console.debug("HistoryDeleteContainer.js");

export default function HistoryExternalFormContainer() {

  const childRef  = useRef(null);
  const user      = useSelector((state) => state.session.user);
  const comCode   = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  // 사용안함.
  const onSearchTreeData = (companyData, deptData, userData) => {
    childRef.current.getData(companyData, deptData, userData);
  };

  // 조회
  const getSearchData = (companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText) => {
    childRef.current.getData(companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText);
  }


  return <HistoryExternalForm onSearchTreeData={onSearchTreeData} getSearchData={getSearchData}   comCode={comCode} ref={childRef} />;
}
