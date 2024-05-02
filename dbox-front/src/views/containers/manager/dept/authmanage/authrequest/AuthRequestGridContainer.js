import { forwardRef, useImperativeHandle, useRef } from "react";
import AuthRequestGrid from "views/templates/manager/dept/authmanage/authrequest/AuthRequestGrid";
import AuthRequestApi from "apis/authrequest-api";
import { useState } from "react";
import { set } from "js-cookie";

console.debug("AuthRequestGridContainer.js");

const AuthRequestGridContainer = forwardRef(({ getGridData, deptCode }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const [selectData, setSelectData] = useState();
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getSearchData,
    getData,
  }));

  const getSelectData = (selectData) => {
    setSelectData(selectData);
  };

  const getSearchData = (response) => {
    gridRef.current.api.setRowData(response.data.response);
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (userName, startDate, endDate) => {
    try {
      if (deptCode.length > 1) {
        var deptCodeList = [];
        for (let i = 0; i < deptCode.length; i++) {
          const response = await AuthRequestApi.selectAuthRequest({
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
        const response = await AuthRequestApi.selectAuthRequest({
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

  return (
    <AuthRequestGrid ref={gridRef} onGridReady={onGridReady} selectData={selectData} onSelectionChanged={onSelectionChanged} getSelectData={getSelectData} />
  );
});

export default AuthRequestGridContainer;
