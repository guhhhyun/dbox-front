import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

import styles from "./ManualLockGrid.module.css";

console.debug("ManualLockGrid.js");

const ManualLockGrid = forwardRef(function (
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
      width: 50,
      headerCheckboxSelection: false,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: "회사",
      field: "uCodeName1",
      width: 120,
    },
    {
      headerName: "부서",
      field: "orgNm",
      width: 150,
    },
    {
      headerName: "사용자",
      field: "uDisplayName",
      width: 130,
    },
    {
      headerName: "사유",
      field: "uDeigReason",
      width: 250,
    },
    {
      headerName: "기준초과일",
      field: "uLimitOverDate",
      width: 130,
    },
    {
      headerName: "잠금",
      field: "uLockStatus",
      width: 100,
      cellRenderer: () => {
        return "[잠금]";
      },
      onCellClicked(params) {
        openModal(params);
      },
    },
  ];

  return (
    <Fragment>
      <ConfirmDialog open={opened} content={content} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth></ConfirmDialog>
      <div className="ag-theme-balham">
        <div className={styles.gridBox} style={{ height: 300 }}>
          <AgGridReact
            pagination={true}
            paginationPageSize={10}
            cacheBlockSize={10}
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

export default ManualLockGrid;
