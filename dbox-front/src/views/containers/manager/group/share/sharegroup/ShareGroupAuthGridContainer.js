import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import ShareGroupApi from "apis/sharegroup-api";
import ShareGroupAuthGrid from "views/templates/manager/group/share/sharegroup/ShareGroupAuthGrid";

console.debug("ShareGroupAuthGridContainer.js");

const ShareGroupAuthGridContainer = forwardRef(({ onGridDataClick, comCode }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const getData = async (searchSelectData, searchTextData, selectComCode) => {
    if (comCode != "DKG") {
      selectComCode = comCode;
    } else if (comCode === "DKG") {
      selectComCode = selectComCode;
    } else {
      selectComCode = null;
    }

    try {
      const response = await ShareGroupApi.getShareGroupAll({
        params: {},
      });

      if (selectComCode === "ALL") {
        switch (searchSelectData) {
          case "전체": {
            if (searchTextData != "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uShareName.includes(searchTextData) || response.data.response[i].uShareDesc.includes(searchTextData)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                  gridRef.current.api.setRowData(searchResult);
                }
              }
              if (searchResult.length === 0) {
                gridRef.current.api.setRowData(searchResult);
              }
            } else if (searchTextData === "") {
              gridRef.current.api.setRowData(response.data.response);
            }
            break;
          }
          case "이름": {
            if (searchTextData != "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uShareName.includes(searchTextData)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                  gridRef.current.api.setRowData(searchResult);
                }
              }
              if (searchResult.length === 0) {
                gridRef.current.api.setRowData(searchResult);
              }
            } else if (searchTextData === "") {
              gridRef.current.api.setRowData(response.data.response);
            }
            break;
          }
          case "설명": {
            if (searchTextData != "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uShareDesc.includes(searchTextData)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                  gridRef.current.api.setRowData(searchResult);
                }
              }
              if (searchResult.length === 0) {
                gridRef.current.api.setRowData(searchResult);
              }
            } else if (searchTextData === "") {
              gridRef.current.api.setRowData(response.data.response);
            }
            break;
          }
          default:
            break;
        }
      } else {
        switch (searchSelectData) {
          case "전체": {
            if (searchTextData != "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (
                  (response.data.response[i].uComCode.includes(selectComCode) && response.data.response[i].uShareName.includes(searchTextData)) ||
                  response.data.response[i].uShareDesc.includes(searchTextData)
                ) {
                  searchResult = searchResult.concat(response.data.response[i]);
                  gridRef.current.api.setRowData(searchResult);
                }
              }
              if (searchResult.length === 0) {
                gridRef.current.api.setRowData(searchResult);
              }
            } else if (searchTextData === "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uComCode.includes(selectComCode)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                }
                gridRef.current.api.setRowData(searchResult);
              }
            }
            break;
          }
          case "이름": {
            if (searchTextData != "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uComCode.includes(selectComCode) && response.data.response[i].uShareName.includes(searchTextData)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                  gridRef.current.api.setRowData(searchResult);
                }
              }
              if (searchResult.length === 0) {
                gridRef.current.api.setRowData(searchResult);
              }
            } else if (searchTextData === "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uComCode.includes(selectComCode)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                }
                gridRef.current.api.setRowData(searchResult);
              }
            }
            break;
          }
          case "설명": {
            if (searchTextData != "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uComCode.includes(selectComCode) && response.data.response[i].uShareDesc.includes(searchTextData)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                  gridRef.current.api.setRowData(searchResult);
                }
              }
              if (searchResult.length === 0) {
                gridRef.current.api.setRowData(searchResult);
              }
            } else if (searchTextData === "") {
              let searchResult = [];
              for (let i = 0; i < response.data.response.length; i++) {
                if (response.data.response[i].uComCode.includes(selectComCode)) {
                  searchResult = searchResult.concat(response.data.response[i]);
                }
                gridRef.current.api.setRowData(searchResult);
              }
            }
            break;
          }
          default:
            break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    getData("전체", "", "ALL");
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();

    onGridDataClick(selectedRows[0]);
  };

  return <ShareGroupAuthGrid ref={gridRef} onGridReady={onGridReady} onSelectionChanged={onSelectionChanged} />;
});

export default ShareGroupAuthGridContainer;
