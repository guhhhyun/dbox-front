import { forwardRef } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./HistoryDeleteGrid.module.css";

console.debug("HistoryDeleteGride.js");

const HistoryDeleteGride = forwardRef(function (
  { onGridReady, rowData, onNameDoubleClick, onNameClick, onNameClickAway, onSortClick, onFilterClick, height },
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
    //  {
    //    width: 50,
    //    headerCheckboxSelection: true,
    //    headerCheckboxSelectionFilteredOnly: true,
    //    checkboxSelection: true,
    //    resizable: false,
    //  },
    // {
    //   headerName: "구분",
    //   field: "uReqType",
    //   flex: 1,
    //   width: 100,
    //   cellRenderer: "nameRenderer",
    //   cellEditor: "nameEditor",
    //   editable: true,
    //   onCellClicked: onNameClick,
    //   onCellDoubleClicked: onNameDoubleClick,
    // },
    {
      headerName: "구분",
      field: "reqTypeName", //"uDeptCode",
      width: 70,
    },
    {
      headerName: "소유부서",
      field: "cabinetCodeName", //"uDeptCode",
      width: 100,
    },
    {
      headerName: "요청자",
      field: "reqUserName",
      width: 100,
    },
    {
      headerName: "요청 사유",
      field: "uReqReason",
      width: 100,
    },
    {
      headerName: "경로",
      field: "uFolderPath",
      width: 100,
    },
    {
      headerName: "파일명",
      field: "uDocName",
      width: 100,
    },
    {
      headerName: "보안등급",
      field: "secLevelName",
      width: 100,
    },
    {
      headerName: "생성연도",
      field: "uCreateYear",
      width: 100,
    },
    {
      headerName: "보존연한",
      field: "uExpiredDate",
      width: 100,
    },
    {
      headerName: "요청일자",
      field: "uReqDate",
      width: 100,
      //valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      //cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "승인자",
      field: "approverName",
      width: 100,
    },
    {
      headerName: "승인일",
      field: "uApprovDate",
      width: 100,
      //valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      //cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "폐기일",
      field: "uDeleteDate",
      width: 100,
      //valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      //cellStyle: () => ({ textAlign: "center" }),
    }
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
        >
          {columnDefs.map((columnDef, index) => (
            <AgGridColumn key={index} {...columnDef}></AgGridColumn>
          ))}
        </AgGridReact>
      </div>
  );
});

export default HistoryDeleteGride;
