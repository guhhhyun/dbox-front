import { forwardRef } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./ShareGroupAuthGrid.module.css";

console.debug("ShareGroupAuthDeptGrid.js");

const ShareGroupAuthDeptGrid = forwardRef(function ({ onGridReady, rowData, onSelectionChanged }, ref) {
  // 컬럼 기본값 정의
  const defaultColDef = {
    resizable: true,
    sortable: true,
    rowSelection: "multiple",
  };

  // 컬럼 정의
  const columnDefs = [
    {
      width: 50,
      // headerCheckboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      // resizable: false,
    },
    {
      headerName: "그룹사",
      field: "uCodeName1",
      flex: 1,
    },
    {
      headerName: "부서명",
      field: "orgNm",
    },
    {
      headerName: "구분",
      field: "rObjectId",
    },
  ];

  return (
    <div className="ag-theme-balham" style={{ height: 400 }}>
      <AgGridReact
        ref={ref}
        className={styles.height100per}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        rowData={rowData}
        suppressClickEdit
        onSelectionChanged={onSelectionChanged}
      >
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
});

export default ShareGroupAuthDeptGrid;
