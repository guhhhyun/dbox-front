import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import styles from "./AddUserGrid.module.css";

console.debug("AddUserGrid.js");

const AddUserGrid = forwardRef(function ({ onQuickFilterChanged, onGridReady, rowData, onRowSelected }, ref) {
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
      headerName: "",
      field: "rObjectId",
      width: 50,
      headerCheckboxSelection: false,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: "그룹사",
      field: "uCodeName",
      width: 120,
    },
    {
      headerName: "사용자",
      field: "displayName",
      width: 130,
    },
  ];

  return (
    <Fragment>
      <div className="ag-theme-balham" style={{ height: 400 }}>
        <AgGridReact
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
          ref={ref}
          className={styles.height100per}
          onGridReady={onGridReady}
          rowData={rowData}
          suppressClickEdit
          gridOptions={gridOptions}
          onQuickFilterChanged={onQuickFilterChanged}
          onRowSelected={onRowSelected}
        >
          {columnDefs.map((columnDef, index) => (
            <AgGridColumn key={index} {...columnDef}></AgGridColumn>
          ))}
        </AgGridReact>
      </div>
    </Fragment>
  );
});

export default AddUserGrid;
