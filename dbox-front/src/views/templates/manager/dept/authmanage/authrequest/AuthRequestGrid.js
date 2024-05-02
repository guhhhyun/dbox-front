import { Fragment, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./AuthRequestGrid.module.css";
import SelectboxRenderer from "views/templates/manager/common/SelectboxRenderer";
import InputTextRenderer from "views/templates/manager/common/InputTextRenderer";
import SecLevelTextRenderer from "views/templates/manager/common/SecLevelTextRenderer";
console.debug("AuthRequestGrid.js");

const AuthRequestGrid = forwardRef(({ onGridReady, rowData, onSelectionChanged, getSelectData }, ref) => {
  // select, text 값 가져오기 위한
  const frameworkComponents = {
    selectboxRenderer: SelectboxRenderer,
    inputTextRenderer: InputTextRenderer,
    secLevelTextRenderer: SecLevelTextRenderer,
  };

  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      tooltipComponent: "defaultTooltip",
    },
    rowSelection: "multiple",
    tooltipShowDelay: 1000,
    tooltipMouseTrack: true,
  };

  // 컬럼 정의
  const columnDefs = [
    {
      width: 50,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: "요청부서",
      field: "orgNm",
      width: 200,
    },
    {
      headerName: "요청자",
      field: "displayName",
      width: 100,
    },
    {
      headerName: "등급",
      field: "uSecLevel",
      width: 80,
      cellRenderer: "secLevelTextRenderer",
    },
    {
      headerName: "요청자료",
      field: "uReqDocName",
      width: 200,
    },
    {
      headerName: "요청사유",
      field: "uReqReason",
      width: 230,
    },
    {
      headerName: "요청일",
      field: "uReqDate",
      width: 180,
    },
    {
      headerName: "처리",
      field: "uReqStatus",
      width: 100,
      cellRenderer: "selectboxRenderer",
      cellRendererParams: { getSelectData, onSelectionChanged },
    },
    {
      headerName: "반려사유",
      field: "uRejectReason",
      width: 300,
      cellRenderer: "inputTextRenderer",
    },
  ];

  return (
    <div className="ag-theme-balham" style={{ height: 400 }}>
      <AgGridReact
        onSelectionChanged={onSelectionChanged}
        frameworkComponents={frameworkComponents}
        ref={ref}
        className={styles.height100per}
        onGridReady={onGridReady}
        rowData={rowData}
        suppressClickEdit
        gridOptions={gridOptions}
      >
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
});

export default AuthRequestGrid;
