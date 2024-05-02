import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { TextField } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import styles from "./LockManageGrid.module.css";

console.debug("LockManageGrid.js");

const LockManageGrid = forwardRef(function (
  { onQuickFilterChanged, onGridReady, rowData, openModal, opened, content, onModalOkClick, onModalClose, onRowSelected, onRequestReasonChanged },
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


  const isRowSelectable = (node) => {
    return node.data ? node.data.uWfFlag == 1 && node.data.uLockStatus === "L" : false;
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
      field: "uCodeName1",
      width: 100,
    },
    {
      headerName: "소속팀",
      field: "orgNm",
      width: 150,
    },
    {
      headerName: "잠금 대상자",
      field: "uDisplayName",
      width: 100,
    },
    {
      headerName: "잠금 사유",
      field: "uDeigReason",
      width: 230,
      cellRenderer: (params) => {
        return params.data.uLockType === "O" ? "특이사용자(" + params.data.uDeigReason + ")" : params.data.uDeigReason;
      },
    },
    {
      headerName: "잠금 구분",
      field: "uAutoYn",
      width: 80,
      cellRenderer: (params) => {
        return params.data.uAutoYn === "Y" ? "자동잠금" : "수동잠금";
      },
    },
    {
      headerName: "잠금 처리자",
      field: "lockUserName",
      width: 90,
    },
    {
      headerName: "알람수?",
      field: "informCnt",
      width: 70,
    },
    {
      headerName: "잠금일",
      field: "uDesigDate",
      width: 130,
    },
    {
      headerName: "해제",
      field: "uLockStatus",
      width: 60,
      cellRenderer: (params) => {
        return params.data.uWfFlag === "1" && params.data.uLockStatus === "L" ? "[해제]" : "";
      },
      onCellClicked(params) {
        if (params.data.uWfFlag === "1" && params.data.uLockStatus === "L") {
          openModal(params);
        }
      },
    },
  ];

  return (
    <Fragment>
      <ConfirmDialog open={opened} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth>
        <div className={styles.content}>{content}</div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="requestReason"
          autoFocus
          onChange={(event) => onRequestReasonChanged(event.target.value)}
        />
      </ConfirmDialog>
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
            isRowSelectable={isRowSelectable}
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

export default LockManageGrid;
