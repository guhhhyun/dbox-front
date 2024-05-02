import { useRef, useState } from "react";
import HistoryDocDistributionForm from "views/templates/history/doc/HistoryDocDistributionForm";

console.debug("HistoryDeleteContainer.js");

export default function HistoryDeleteFormContainer() {

  const ref       = useRef([]); // 일반, 상세 

  const [user, setUser]             = useState("");
  const [searchCode, setSearchCode] = useState("A");
  const [startDate, setStartDate]   = useState("");
  const [endDate, setEndDate]       = useState("");

  // 조건에 맞게 검색.
  const getSearchData = (params) => {

    // 1차 검색 내용 : 2차 상세 검색에 사용
    setUser(params.user);
    setStartDate(params.startDate);
    setEndDate(params.endDate);
    setSearchCode(params.state);

    ref.current[1].getDetailDataNull(); // 상세 초기화.
    ref.current[0].getData(params.companyCode, 
                                params.company,
                                params.dept,
                                params.user,
                                params.startDate,
                                params.endDate,
                                params.state,
                                params.searchSelect,
                                params.searchText);
  };

  const onDetailOpen = (params) => {
    // alert('onDetailOpen');
  };


  // 상세이력 조회
  const onCellClicked = (event) => {

    const column    = event.colDef;
    const colField  = column.field;

    ref.current[1].getDetailData(event.data.uDocKey, event.data.uDocName, event.data.uCabinetCode, colField, user, startDate, endDate);
  };
  
  return <HistoryDocDistributionForm searchCode={searchCode} getSearchData={getSearchData}  onDetailOpen={onDetailOpen} onCellClicked={onCellClicked} ref={ref} />;
}
