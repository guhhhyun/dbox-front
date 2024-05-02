import { Fragment, forwardRef, useState, useEffect } from "react";
import { Checkbox } from "@material-ui/core";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./HistoryAuthGrid.module.css";
import CheckboxRenderer from "views/templates/manager/common/CheckboxRenderer";

console.debug("HistoryAuthGrid.js");

const HistoryAuthGrid = forwardRef(function ({ onQuickFilterChanged, onGridReady, checkedType, setCheckedType, rowData, getUser, onRowSelected }, ref) {
  const frameworkComponents = {
    checkboxRenderer: CheckboxRenderer,
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
    tooltipShowDelay: 1000,
    tooltipMouseTrack: true,
  };

  // 컬럼 정의
  const columnDefs = [
    {
      headerName: "이력현황",
      field: "codeName",
      width: 120,
    },
    {
      headerName: "소속사",
      field: "code.uCodeVal3",
      width: 80,
      cellRenderer: "checkboxRenderer",
    },
    {
      headerName: "부서",
      field: "code.uCodeName1",
      width: 70,
      cellRenderer: "checkboxRenderer",
    },
    {
      headerName: "Chairman",
      field: "code.uCodeName2",
      width: 90,
      cellRenderer: "checkboxRenderer",
    },
    {
      headerName: "직속임원",
      field: "code.uCodeName3",
      width: 90,
      cellRenderer: "checkboxRenderer",
    },
    {
      headerName: "추가사용자",
      field: "cnt",
      width: 110,
      cellRenderer: (params) => {
        return params.value !== 0 ? params.value + "명" : "0명";
      },
      onCellClicked(params) {
        getUser(params.data.code, params.data.codeName);
      },
    },
  ];

  return (
    <Fragment>
      <div className="ag-theme-balham" style={{ height: 400 }}>
        <AgGridReact
          rowSelection={"single"}
          rowMultiSelectWithClick={true}
          ref={ref}
          className={styles.height100per}
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
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

export default HistoryAuthGrid;
