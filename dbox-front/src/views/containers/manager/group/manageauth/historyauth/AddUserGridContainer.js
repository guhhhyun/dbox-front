import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import HisViewUserApi from "apis/hisviewuser-api";
import AddUserGrid from "views/templates/manager/group/manageauth/historyauth/AddUserGrid";

console.debug("AddUserGridContainer.js");

const AddUserGridContainer = forwardRef(({ setCheckedList }, ref) => {
  const user = useSelector((state) => state.session.user);
  const [gridApi, setGridApi] = useState(null);

  let hisCode = "";
  let searchValue = "";

  const comCode = user.mgr.companyComCode;
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getUserData,
    getSearchText,
  }));

  const getUserData = (params) => {
    hisCode = params;
    getData();
  };

  const getSearchText = (searchText, codeValue) => {
    searchValue = searchText;
    hisCode = codeValue;
    getData();
  };

  const getData = async () => {
    try {
      const response = await HisViewUserApi.getHisViewUserList({
        params: {
          uHisCode: hisCode,
          uComCode: comCode,
          displayName: searchValue,
        },
      });
      gridRef.current.api.setRowData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    //getData();
    setGridApi(params.api);
  };

  const onRowSelected = (event) => {
    setCheckedList(gridApi.getSelectedNodes());
  };

  return <AddUserGrid ref={gridRef} onGridReady={onGridReady} onRowSelected={onRowSelected} />;
});

export default AddUserGridContainer;
