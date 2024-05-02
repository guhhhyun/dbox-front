import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import CodeApi from "apis/code-api";
import HistoryAuthGrid from "views/templates/manager/group/manageauth/historyauth/HistoryAuthGrid";

console.debug("HistoryAuthGridContainer.js");

const HistoryAuthGridContainer = forwardRef(({ setShow, setList, getUserData, setDataChk }, ref) => {
  const user = useSelector((state) => state.session.user);
  const [gridApi, setGridApi] = useState(null);
  const [checkedType, setCheckedType] = useState(new Array());
  const gridRef = useRef(null);

  const comCode = user.mgr.companyComCode;

  useImperativeHandle(ref, () => ({
    getSearchData,
    getData,
  }));

  const getSearchData = (response) => {
    gridRef.current.api.setRowData(response.data.response);
  };

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeLogviewAuthList({
        params: {
          uCodeType: "CONFIG_LOGVIEW_AUTH",
          uCodeVal1: comCode,
          codeType: "LOGVIEW_AUTH_ITEM",
        },
      });

      setCheckedType(response.data.response);
      gridRef.current.api.setRowData(response.data.response);
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

  const getUser = (params, name) => {
    setDataChk(true);
    getUserData(params, name);
  };

  const onRowSelected = (event) => {
    setShow(true);
    setList(gridApi.getModel().rowsToDisplay);
  };

  return (
    <HistoryAuthGrid
      ref={gridRef}
      onGridReady={onGridReady}
      checkedType={checkedType}
      setCheckedType={setCheckedType}
      getUser={getUser}
      onRowSelected={onRowSelected}
    />
  );
});

export default HistoryAuthGridContainer;
