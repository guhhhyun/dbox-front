import { forwardRef, useImperativeHandle, useRef } from "react";
import AuthWithdrawalGrid from "views/templates/manager/dept/authmanage/authwithdrawal/AuthWithdrawalGrid";
import AuthRequestApi from "apis/authrequest-api";
import { useState } from "react";

console.debug("AuthWithdrawalGridContainer.js");

const AuthWithdrawalGridContainer = forwardRef(({ getGridData, deptCode }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getSearchData,
    getData,
  }));

  const getSearchData = (response) => {
    gridRef.current.api.setRowData(response.data.response);
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (userName, startDate, endDate) => {
    try {
      if (deptCode.length > 1) {
        let deptCodeList = [];
        for (let i = 0; i < deptCode.length; i++) {
          const response = await AuthRequestApi.selectAuthWithdrawal({
            params: {
              uReqDeptCode: deptCode[i],
              displayName: userName,
              startDate: startDate,
              endDate: endDate,
            },
          });
          deptCodeList = deptCodeList.concat(response.data.response);
        }
        gridRef.current.api.setRowData(deptCodeList);
      } else if (deptCode.length === 1) {
        const response = await AuthRequestApi.selectAuthWithdrawal({
          params: {
            uReqDeptCode: deptCode,
            displayName: userName,
            startDate: startDate,
            endDate: endDate,
          },
        });
        gridRef.current.api.setRowData(response.data.response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    getData();
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    getGridData(selectedRows);
  };

  return <AuthWithdrawalGrid ref={gridRef} onGridReady={onGridReady} onSelectionChanged={onSelectionChanged} />;
});

export default AuthWithdrawalGridContainer;
