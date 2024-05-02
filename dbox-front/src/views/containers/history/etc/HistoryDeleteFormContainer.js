import { useRef } from "react";
import HistoryDeleteForm from "views/templates/history/etc/HistoryDeleteForm";

console.debug("HistoryDeleteContainer.js");

export default function HistoryDeleteFormContainer() {

  const ref = useRef(null);

  const onSearchCompany = (response) => {
    ref.current.getSearchData(response);
  };
  
  const getData = () => {
    ref.current.getData();
  };


  // 조회
  const getSearchData = (companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText) => {
    ref.current.getData(companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText);
  }


  return <HistoryDeleteForm onSearchCompany={onSearchCompany} getSearchData={getSearchData} getData={getData} ref={ref} />;
}
