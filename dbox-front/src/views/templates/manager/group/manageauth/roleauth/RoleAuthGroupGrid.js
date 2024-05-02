import { forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./RoleAuthGroupGrid.module.css";

console.debug("RoleAuthGroupGrid.js");

const RoleAuthGroupGrid = forwardRef(function ({ onGridReady, rowData, onSelectionChanged }, ref) {
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
      field: "uAuthName",
      width: 200,
    },
    {
      headerName: "설명",
      field: "uAuthDesc",
      width: 250,
    },
  ];

  return (
    <div className="ag-theme-balham" style={{ height: 600 }}>
      <AgGridReact
        rowSelection={"single"}
        onSelectionChanged={onSelectionChanged}
        ref={ref}
        className={styles.height100per}
        onGridReady={onGridReady}
        rowData={rowData}
        suppressClickEdit
        gridOptions={gridOptions}
        // onQuickFilterChanged={onQuickFilterChanged}
      >
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
});

export default RoleAuthGroupGrid;
