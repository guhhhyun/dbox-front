import { forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./RoleAuthGroupGrid.module.css";
import { Fragment } from "react";

console.debug("RoleAuthGroupUserGrid.js");

const RoleAuthGroupUserGrid = forwardRef(function ({ onGridReady, rowData, onSelectionChanged }, ref) {
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
      checkboxSelection: true,
      width: 50,
    },
    {
      headerName: "그룹사",
      field: "uCodeName1",
      width: 100,
    },
    {
      headerName: "부서명",
      field: "orgNm",
      cellRenderer: "nameRenderer",
      width: 230,
    },
    {
      headerName: "사용자ID",
      field: "userId",
      width: 160,
    },
    {
      headerName: "사용자명",
      field: "displayName",
      width: 100,
    },
    {
      headerName: "직책/직급",
      field: "name",
      width: 100,
    },
  ];

  return (
    <Fragment>
      <div className="ag-theme-balham" style={{ height: 400 }}>
        <AgGridReact
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
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
    </Fragment>
  );
});

export default RoleAuthGroupUserGrid;
