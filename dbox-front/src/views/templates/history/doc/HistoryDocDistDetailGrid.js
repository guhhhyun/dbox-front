import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./HistoryDocDistributionGrid.module.css";

console.debug("HistoryDocDistDetailGrid.js");

const HistoryDocDistDetailGrid = forwardRef(function (
  { onGridReady, rowData, onSortClick, onFilterClick, height,
    onQuickFilterChanged, onRowSelected, search, result, data, cntResult, month },
  ref,
) {


    // 컬럼 기본값 정의
    const gridOptions = {
      headerHeight: 50,
      rowHeight: 36,
      defaultColDef: {
        resizable: true,
        sortable: true,
        rowSelection: "multiple",
      },
      rowStyle: {
        background: "#ffffff",
        border: "none",
      },
    };


  //row Colour
  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#F7F9FC" };
    }
  };


  // 컬럼 정의
  const columnDefs = [
    {
      headerName: "문서명",
      field: "uDocName",
      searchKeyword: null,
      width: 300,
    },
    {
      headerName: "분류",
      field: "logJobCodeName",
      width: 70,
    },
    {
      headerName: "버전",
      field: "uDocVersion",
      width: 100,
    },
    {
      headerName: "사이즈",
      field: "logFileSizeName",
      width: 100,
    },
    {
      headerName: "자료 소유부서",
      field: "logOwnDeptName",
      width: 120,
    },
    {
      headerName: "실행부서",
      field: "logActDeptName",
      width: 100,
    },
    {
      headerName: "실행자",
      field: "displayName",
      width: 80,
    },
    {
      headerName: "날짜",
      field: "uJobDate",
      width: 100,
    },
    {
      headerName: "결재정보",
      field: "uApprovDate",
      width: 100,
    },

    {
      headerName: "상태",
      field: "logDocStatusName",
      width: 70,
    },

    {
      headerName: "보안등급",
      field: "logSecLevelName",
      width: 100,
    },

    {
      headerName: "변경전",
      field: "logBeforeChangeName",
      width: 100,
    },
    {
      headerName: "변경후",
      field: "logAfterChangeName",
      width: 100,
    },
    {
      headerName: "대상",
      field: "uApprovDate",
      width: 100,
    },

  ];

  return (
    <Fragment>
      <div className="ag-theme-balham" style={{ height: 250 }}>
        <AgGridReact
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
          ref={ref}
          className={styles.height100per}
          onGridReady={onGridReady}
          rowData={rowData}
          suppressClickEdit
          gridOptions={gridOptions}
          getRowStyle={getRowStyle}
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

export default HistoryDocDistDetailGrid;
