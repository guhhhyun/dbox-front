import { forwardRef } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./AuthWithdrawalGrid.module.css";
import StatusTextRenderer from "views/templates/manager/common/StatusTextRenderer";
import SecLevelTextRenderer from "views/templates/manager/common/SecLevelTextRenderer";

console.debug("AuthWithdrawalGrid.js");

const AuthWithdrawalGrid = forwardRef(({ onGridReady, rowData, onSelectionChanged }, ref) => {
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

  const frameworkComponents = {
    statusTextRenderer: StatusTextRenderer,
    secLevelTextRenderer: SecLevelTextRenderer,
  };

  const isRowSelectable = (node) => {
    return node.data ? node.data.uReqStatus != "D" && node.data.uReqStatus != "C" : false;
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
      headerName: "상태",
      field: "uReqStatus",
      width: 80,
      cellRenderer: "statusTextRenderer",
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
      width: 100,
    },
    {
      headerName: "승인자",
      field: "uApprover",
      width: 130,
    },
    {
      headerName: "반려사유",
      field: "uRejectReason",
      width: 300,
    },
  ];

  return (
    <div className="ag-theme-balham" style={{ height: 400 }}>
      <AgGridReact
        ref={ref}
        className={styles.height100per}
        onGridReady={onGridReady}
        rowData={rowData}
        suppressClickEdit
        gridOptions={gridOptions}
        isRowSelectable={isRowSelectable}
        frameworkComponents={frameworkComponents}
        onSelectionChanged={onSelectionChanged}
      >
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
});

export default AuthWithdrawalGrid;
