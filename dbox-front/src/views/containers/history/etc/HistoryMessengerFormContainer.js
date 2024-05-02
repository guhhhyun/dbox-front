import { useRef } from "react";
import { useSelector } from "react-redux";
import HistoryMessengerForm from "views/templates/history/etc/HistoryMessengerForm";

console.debug("HistoryMessengerFormContainer.js");

export default function HistoryMessengerFormContainer() {

  const childRef  = useRef(null);
  const user      = useSelector((state) => state.session.user);
  const comCode   = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  const onSearchTreeData = (companyData, deptData, userData) => {
    childRef.current.getData(companyData, deptData, userData);
  };

  // 조회
  const getSearchData = (companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText) => {
    childRef.current.getData(companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText);
  }

  return <HistoryMessengerForm onSearchTreeData={onSearchTreeData} getSearchData={getSearchData}  comCode={comCode} ref={childRef} />;
}
