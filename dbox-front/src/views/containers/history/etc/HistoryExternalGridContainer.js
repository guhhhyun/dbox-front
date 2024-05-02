import HistoryExternalGrid from "views/templates/history/etc/HistoryExternalGrid";
import ManageIdApi from "apis/manageid-api";
import HistoryDeleteApi from "apis/historydelete-api";


import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";

console.debug("HistoryExternalGridContainer.js");

const HistoryExternalGridContainer = forwardRef(({ onSearchTreeData, comCode }, ref) => {

  const [gridApi, setGridApi] = useState(null);
  const [gridIdData, setGridIdData] = useState();
  const [opened, setOpened] = useState(false);
  const [useOpened, setUseOpend] = useState(false);
  const [notUseOpened, setNotUseOpend] = useState(false);
  const [userId, setUserId] = useState();
  const [userLogData, setUserLogData] = useState([]);
  const [searchCompanyData, setSearchCompanyData] = useState();
  const [searchDeptData, setSearchDeptData] = useState();
  const [searchUserData, setSearchUserData] = useState();
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const onModalOpen = (params) => {
    
    // attachJobDateFormat
    // uAttachSystem
    // uCabinetCode

    getLogData(params.data.uJobUser, params.data.uCabinetCode, params.data.attachJobDateFormat, params.data.uAttachSystem);

    //alert('onModalOpen 조ㅓㅇ')

    // setOpened(true);
  };

  const onModalClose = () => {
    setOpened(false);
  };

  /**
   * id 목록 데이터 불러오기
   */
  const getData = async (companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText) => {

      try {
        const response = await HistoryDeleteApi.selectHistoryExternalAttach({
          params: {
            company: companyCode,
            dept: deptCode,
            user: userCode,
            searchSelect: searchSelect,
            searchText: searchText,
            startDate: startDate,
            endDate: endDate,
          },
        });
        gridRef.current.api.setRowData(response.data.response);
        //setSearchCompanyData(treeCompanyData);
        //setSearchDeptData(treeDeptData);
        //setSearchUserData(treeUserData);
      } catch (error) {
        console.error(error);
      }
    
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    gridRef.current.api.setRowData(null);
    // getData();
    //setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    
    // 사용안함
    // var selectedRows = gridApi.getSelectedRows();
    // var socialPerId = selectedRows[0] === undefined ? null : selectedRows[0].socialPerId;
    // setGridIdData(selectedRows[0]);
    // setUserId(socialPerId);
  };

  /**
   * 자료 List 세부정보
   */
  const getLogData = async (userId, uCabinetCode, attachJobDateFormat, uAttachSystem) => {
    
    // params.data.uJobUser, params.data.uCabinetCode, params.data.attachJobDateFormat, params.data.uAttachSystem

    // selectHistoryExternalAttachDetail
    //alert("getLogData 실행 " + userId);
    try {
      const response = await HistoryDeleteApi.selectHistoryExternalAttachDetail({
        params: {
          uUserId: userId,
          uJobDate: attachJobDateFormat,
          uCabinetCode:uCabinetCode,
          uAttachSystem:uAttachSystem,
        },
      });
      setUserLogData(response.data.response);


      //alert("팝업 open");
      setOpened(true);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    // alert('useEffect 사용안함.');
    // getLogData(userId);


  }, [userId]);

  return (
    <HistoryExternalGrid
      onGridReady={onGridReady}
      onSelectionChanged={onSelectionChanged}
      gridIdData={gridIdData}
      opened={opened}
      onModalOpen={onModalOpen}
      onModalClose={onModalClose}
      userLogData={userLogData}
      ref={gridRef}
    />
  );
});
export default HistoryExternalGridContainer;
