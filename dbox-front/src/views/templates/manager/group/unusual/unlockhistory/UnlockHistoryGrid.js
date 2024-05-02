import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

import styles from "./UnlockHistoryGrid.module.css";

console.debug("UnlockHistoryGrid.js");

const UnlockHistoryGrid = forwardRef(function (
  { onQuickFilterChanged, onGridReady, rowData, openModal, opened, content, onModalOkClick, onModalClose, onRowSelected },
  ref,
) {
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
      headerCheckboxSelection: false,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: "그룹사",
      field: "uCodeName1",
    },
    {
      headerName: "소속팀",
      field: "orgNm",
    },
    {
      headerName: "해제 대상자",
      field: "uDisplayName",
    },
    {
      headerName: "해제 사유",
      field: "uUndesigReason",
    },
    {
      headerName: "처리자",
      field: "unLockUserName",
    },
    {
      headerName: "해제 처리일",
      field: "uUndesigDate",
    },
    {
      headerName: "재잠금",
      field: "uLockStatus",
      cellRenderer: (params) => {
        return params.data.uLockStatus === "U" ? "[잠금]" : "";
      },
      onCellClicked(params) {
        if (params.data.uLockStatus === "U") {
          openModal(params);
        }
      },
    },
  ];

  return (
    <Fragment>
      <ConfirmDialog open={opened} content={content} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth></ConfirmDialog>
      <div className="ag-theme-balham">
        <div className={styles.gridBox} style={{ height: 300 }}>
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
      </div>
    </Fragment>
  );
});

export default UnlockHistoryGrid;
