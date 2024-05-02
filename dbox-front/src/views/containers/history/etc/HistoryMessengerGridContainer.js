import HistoryMessengerGrid from "views/templates/history/etc/HistoryMessengerGrid";
import ManageIdApi from "apis/manageid-api";
import HistoryDeleteApi from "apis/historydelete-api";


import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";

console.debug("HistoryMessengerGridContainer.js");

const HistoryMessengerGridContainer = forwardRef(({ onSearchTreeData, comCode }, ref) => {

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

  const onModalOpen = () => {
    setOpened(true);
  };

  const onModalClose = () => {
    setOpened(false);
  };

  /**
   * id 목록 데이터 불러오기
   */
  const getData = async (companyCode, deptCode, userCode, startDate, endDate, searchSelect, searchText) => {

    try {
      const response = await HistoryDeleteApi.selectHistoryMessengerAttachUser({
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
    
    
    // if (comCode === "DKG") {
    //   try {
    //     const response = await ManageIdApi.selectUserId({
    //       params: {
    //         comOrgId: treeCompanyData,
    //         orgId: treeDeptData,
    //         socialPerId: treeUserData,
    //       },
    //     });
    //     gridRef.current.api.setRowData(response.data.response);
    //     setSearchCompanyData(treeCompanyData);
    //     setSearchDeptData(treeDeptData);
    //     setSearchUserData(treeUserData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   try {
    //     const response = await ManageIdApi.selectUserId({
    //       params: {
    //         comOrgId: comCode,
    //         orgId: treeDeptData,
    //         socialPerId: treeUserData,
    //       },
    //     });
    //     gridRef.current.api.setRowData(response.data.response);
    //     setSearchCompanyData(treeCompanyData);
    //     setSearchDeptData(treeDeptData);
    //     setSearchUserData(treeUserData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    gridRef.current.api.setRowData(null);
    // getData();
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    var socialPerId = selectedRows[0] === undefined ? null : selectedRows[0].socialPerId;
    setGridIdData(selectedRows[0]);
    setUserId(socialPerId);
  };

  /**
   * 접속이력 데이터 불러오기
   */

  // const getLogData = async (userId) => {
  //   try {
  //     const response = await ManageIdApi.selectUserIdLog({
  //       params: {
  //         uUserId: userId,
  //       },
  //     });
  //     setUserLogData(response.data.response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getLogData(userId);
  // }, [userId]);

  return (
    <HistoryMessengerGrid
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
export default HistoryMessengerGridContainer;
