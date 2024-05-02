import { forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./ShareGroupAuthGrid.module.css";

console.debug("ShareGroupAuthGrid.js");

const ShareGroupAuthGrid = forwardRef(function ({ onQuickFilterChanged, onGridReady, rowData, onSelectionChanged }, ref) {
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
 

  const hashValueGetter = (params) => {
    let seq = params.node.rowIndex + 1;
    return seq;
  };

  // 컬럼 정의
  const columnDefs = [
    {
      headerName: "NO",
      valueGetter: hashValueGetter,
      field: "",
      width: 50,
    },
    {
      headerName: "회사",
      field: "uCodeName1",
      width: 120,
    },
    {
      headerName: "이름",
      field: "uShareName",
      cellRenderer: "nameRenderer",
      width: 200,
    },
    {
      headerName: "설명",
      field: "uShareDesc",
      width: 250,
    },
    {
      headerName: "작성일",
      field: "uCreateDate",
      width: 130,
    },
  ];

  return (
    <div className="ag-theme-balham" style={{ height: 400 }}>
      <AgGridReact
        rowSelection="single"
        onSelectionChanged={onSelectionChanged}
        ref={ref}
        className={styles.height100per}
        onGridReady={onGridReady}
        rowData={rowData}
        suppressClickEdit
        gridOptions={gridOptions}
        onQuickFilterChanged={onQuickFilterChanged}
      >
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
});

export default ShareGroupAuthGrid;
