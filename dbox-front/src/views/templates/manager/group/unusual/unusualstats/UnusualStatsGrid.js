import { Fragment, forwardRef, useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ModalDialog from "views/commons/dialog/ModalDialog";
import UnusualStatsChartContainer from "views/containers/manager/group/unusual/unusualstats/UnusualStatsChartContainer";
import styles from "./UnusualStats.module.css";

console.debug("UnusualStatsGrid.js");

const UnusualStatsGrid = forwardRef(function (
  { onQuickFilterChanged, onGridReady, rowData, openModal, opened, onModalClose, onRowSelected, search, result, data, cntResult, month },
  ref,
) {
  useEffect(() => {}, [cntResult]);

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
      headerName: "사용자 정보",
      headerGroup: "info",
      childrenHeaderName01: "회사",
      childrenHeaderName02: "부서",
      childrenHeaderName03: "사용자",
      childrenField01: "comName",
      childrenField02: "deptName",
      childrenField03: "userName",

      width: 100,
    },
    {
      headerName: "다운로드",
      searchKeyword: "DL",
      cnt: cntResult?.uCountDownload ? cntResult.uCountDownload : 0,
      childrenHeaderName01: {
        template: "<p>식별<br/>횟수</p>",
      },
      childrenHeaderName02: {
        template: "<p>안내<br/>횟수</p>",
      },
      childrenHeaderName03: {
        template: "<p>개인<br/>(전월)</p>",
      },
      childrenHeaderName04: {
        template: "<p>부서<br/>(전월)</p>",
      },
      childrenField01: "uDownloadCntOver",
      childrenField02: "uDownloadCntWarn",
      childrenField03: "uDownloadCntLmonUser",
      childrenField04: "uDownloadCntLmonDept",
      width: 50,
    },
    {
      headerName: "반출",
      searchKeyword: "TO",
      cnt: cntResult?.uCountTakeout ? cntResult.uCountTakeout : 0,
      childrenHeaderName01: {
        template: "<p>식별<br/>횟수</p>",
      },
      childrenHeaderName02: {
        template: "<p>안내<br/>횟수</p>",
      },
      childrenHeaderName03: {
        template: "<p>개인<br/>(전월)</p>",
      },
      childrenHeaderName04: {
        template: "<p>부서<br/>(전월)</p>",
      },
      childrenField01: "uTakeoutCntOver",
      childrenField02: "uTakeoutCntWarn",
      childrenField03: "uTakeoutCntLmonUser",
      childrenField04: "uTakeoutCntLmonDept",
      width: 50,
    },
    {
      headerName: "권한신청",
      searchKeyword: "AR",
      cnt: cntResult?.uCountReqPermit ? cntResult.uCountReqPermit : 0,
      childrenHeaderName01: {
        template: "<p>식별<br/>횟수</p>",
      },
      childrenHeaderName02: {
        template: "<p>안내<br/>횟수</p>",
      },
      childrenHeaderName03: {
        template: "<p>개인<br/>(전월)</p>",
      },
      childrenHeaderName04: {
        template: "<p>부서<br/>(전월)</p>",
      },
      childrenField01: "uAuthreqCntOver",
      childrenField02: "uAuthreqCntWarn",
      childrenField03: "uAuthreqCntLmonUser",
      childrenField04: "uAuthreqCntLmonDept",
      width: 50,
    },
    {
      headerName: "출력",
      searchKeyword: "PT",
      cnt: cntResult?.uCountPrint ? cntResult.uCountPrint : 0,
      childrenHeaderName01: {
        template: "<p>식별<br/>횟수</p>",
      },
      childrenHeaderName02: {
        template: "<p>안내<br/>횟수</p>",
      },
      childrenHeaderName03: {
        template: "<p>개인<br/>(전월)</p>",
      },
      childrenHeaderName04: {
        template: "<p>부서<br/>(전월)</p>",
      },
      childrenField01: "uPrintCntOver",
      childrenField02: "uPrintCntWarn",
      childrenField03: "uPrintCntLmonUser",
      childrenField04: "uPrintCntLmonDept",
      width: 50,
    },
    {
      headerName: "삭제",
      searchKeyword: "DT",
      cnt: cntResult?.uCountDelete ? cntResult.uCountDelete : 0,
      childrenHeaderName01: {
        template: "<p>식별<br/>횟수</p>",
      },
      childrenHeaderName02: {
        template: "<p>안내<br/>횟수</p>",
      },
      childrenHeaderName03: {
        template: "<p>개인<br/>(전월)</p>",
      },
      childrenHeaderName04: {
        template: "<p>부서<br/>(전월)</p>",
      },
      childrenField01: "uDeleteCntOver",
      childrenField02: "uDeleteCntWarn",
      childrenField03: "uDeleteCntLmonUser",
      childrenField04: "uDeleteCntLmonDept",
      width: 50,
    },

    {
      headerName: "상태",
      childrenHeaderName01: "지정일",
      childrenHeaderName02: "상태",
      childrenHeaderName03: "취합일",
      childrenField01: "uDesigDate",
      childrenField02: "uDesigStatus",
      childrenField03: "uLogDate",
      cellRenderer: (params) => {
        if (params.data.uDesigStatus) {
          return params.data.uDesigStatus === "Y" ? "해제" : "잠금";
        }
      },
      width: 130,
    },
  ];

  return (
    <Fragment>
      <ModalDialog open={opened} onClose={onModalClose} maxWidth="md" fullWidth>
        <UnusualStatsChartContainer search={search} result={result} cntResult={cntResult} data={data} month={month} />
      </ModalDialog>
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
          getRowStyle={getRowStyle}
          onQuickFilterChanged={onQuickFilterChanged}
          onRowSelected={onRowSelected}
        >
          {columnDefs.map((columnDef, index) =>
            columnDef.searchKeyword != null ? (
              (search === "A" || columnDef.searchKeyword === search) && (
                <AgGridColumn key={index} headerName={columnDef.headerName + "(" + columnDef.cnt + ")"}>
                  <AgGridColumn
                    key={index}
                    headerComponentParams={columnDef.childrenHeaderName01}
                    field={columnDef.childrenField01}
                    width={columnDef.width}
                  ></AgGridColumn>
                  <AgGridColumn
                    key={index}
                    headerComponentParams={columnDef.childrenHeaderName02}
                    field={columnDef.childrenField02}
                    width={columnDef.width}
                  ></AgGridColumn>
                  <AgGridColumn
                    key={index}
                    headerComponentParams={columnDef.childrenHeaderName03}
                    field={columnDef.childrenField03}
                    width={columnDef.width}
                  ></AgGridColumn>
                  <AgGridColumn
                    key={index}
                    headerComponentParams={columnDef.childrenHeaderName04}
                    field={columnDef.childrenField04}
                    width={columnDef.width}
                  ></AgGridColumn>
                </AgGridColumn>
              )
            ) : (
              <AgGridColumn key={index} headerName={columnDef.headerName}>
                <AgGridColumn key={index} headerName={columnDef.childrenHeaderName01} field={columnDef.childrenField01} width={columnDef.width}></AgGridColumn>
                <AgGridColumn
                  key={index}
                  headerName={columnDef.childrenHeaderName02}
                  field={columnDef.childrenField02}
                  width={columnDef.width}
                  cellRenderer={columnDef.cellRenderer ? columnDef.cellRenderer : ""}
                ></AgGridColumn>
                <AgGridColumn key={index} headerName={columnDef.childrenHeaderName03} field={columnDef.childrenField03} width={columnDef.width}></AgGridColumn>
              </AgGridColumn>
            ),
          )}
        </AgGridReact>
      </div>
    </div>
    </Fragment>
  );
});

export default UnusualStatsGrid;
