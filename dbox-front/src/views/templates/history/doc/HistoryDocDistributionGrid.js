import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import styles from "./HistoryDocDistributionGrid.module.css";

console.debug("HistoryDocDistributionGrid.js");

const HistoryDocDistributionGrid = forwardRef(function (
  { onGridReady, rowData, onSortClick, onFilterClick, height,
    onQuickFilterChanged, onCellClicked, result, data, cntResult, month, searchCode },
  ref,
) {


  //alert(searchCode);

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
      headerName: "문서 정보",
      headerGroup: "info",
      childrenHeaderName01: "문서명",
      childrenField01: "uDocName",
      width: 400,
    },
    {
      searchKeyword:"PR",
      childHeadCount:"2",
      headerName: "권한",
      childrenHeaderName01: "신청",
      childrenHeaderName02: "부여",
      childrenField01: "cntPermitReq",
      childrenField02: "cntPermitApprove",
      width: 100,
    },
    {
      searchKeyword:"SC",
      childHeadCount:"1",
      headerName: "보안등급 변경",
      childrenHeaderName01: "변경",
      childrenField01: "cntSecChange",
      width: 100,
    },
    {
      searchKeyword:"ER",
      childHeadCount:"2",
      headerName: "복호화반출",
      childrenHeaderName01: "신청",
      childrenHeaderName02: "부여",
      childrenField01: "cntTakeReq",
      childrenField02: "cntTakeApprove",
      width: 100,
    },
    {
      searchKeyword:"PT",
      childHeadCount:"1",
      headerName: "인쇄",
      headerGroup: "print",
      childrenHeaderName01: "인쇄",
      childrenField01: "cntPrint",
      width: 100,
    },
    {
      searchKeyword:"AT",
      childHeadCount:"1",
      headerName: "첨부",
      childrenHeaderName01: "첨부",
      childrenField01: "cntAttach",
      width: 100,
    },

  ];

  return (
    <Fragment>
      <div className="ag-theme-balham" style={{ height: 300 }}>
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
          onCellClicked={onCellClicked}
        >
          {columnDefs.map((columnDef, index) =>
            (columnDef.searchKeyword != null  && columnDef.childHeadCount==="2" ) ? (
              (searchCode === "A" || columnDef.searchKeyword === searchCode) && 
              (
                // <AgGridColumn key={index} headerName={columnDef.headerName + "(" + columnDef.cnt + ")"}>
                <AgGridColumn key={index} headerName={columnDef.headerName}>
                  <AgGridColumn
                    key={index}
                    headerName={columnDef.childrenHeaderName01}
                    headerComponentParams={columnDef.childrenHeaderName01}
                    field={columnDef.childrenField01}
                    width={columnDef.width}
                  ></AgGridColumn>
                  <AgGridColumn
                    key={index}
                    headerName={columnDef.childrenHeaderName02}
                    headerComponentParams={columnDef.childrenHeaderName02}
                    field={columnDef.childrenField02}
                    width={columnDef.width}
                  ></AgGridColumn>
                </AgGridColumn>
              )
            ) :
            (columnDef.searchKeyword != null  && columnDef.childHeadCount=== "1" ) ? (
              (searchCode === "A" || columnDef.searchKeyword === searchCode) && 
              (
                // <AgGridColumn key={index} headerName={columnDef.headerName + "(" + columnDef.cnt + ")"}>
                <AgGridColumn key={index} headerName={columnDef.headerName}>
                  <AgGridColumn
                    key={index}
                    headerName={columnDef.childrenHeaderName01}
                    headerComponentParams={columnDef.childrenHeaderName01}
                    field={columnDef.childrenField01}
                    width={columnDef.width}
                  ></AgGridColumn>
                </AgGridColumn>
              )
            ) :  
            (
              <AgGridColumn key={index} headerName={columnDef.headerName}>
                <AgGridColumn 
                    key={index} 
                    headerName={columnDef.childrenHeaderName01} 
                    field={columnDef.childrenField01} 
                    width={columnDef.width}
                ></AgGridColumn>


                {/* <AgGridColumn
                  key={index}
                  headerName={columnDef.childrenHeaderName02}
                  field={columnDef.childrenField02}
                  width={columnDef.width}
                  cellRenderer={columnDef.cellRenderer ? columnDef.cellRenderer : ""}
                ></AgGridColumn> */}
                {/* <AgGridColumn key={index} headerName={columnDef.childrenHeaderName03} field={columnDef.childrenField03} width={columnDef.width}></AgGridColumn> */}
              </AgGridColumn>
            ),
          )}
        </AgGridReact>
      </div>
    </Fragment>


  );
});

export default HistoryDocDistributionGrid;
