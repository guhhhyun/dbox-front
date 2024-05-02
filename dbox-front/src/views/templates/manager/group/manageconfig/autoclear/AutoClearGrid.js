import fileSize from "filesize";
import {forwardRef} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import FormatUtil from "utils/format-util";

const AutoClearGrid = forwardRef( ({ onGridReady, getDataByDocKeyToClose }, ref) => {

  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    suppressCellSelection: true,
    suppressMenu: true,
    rowStyle: { cursor: "pointer" }
  };

  const onRowSelected = (event) => {
    if (event.node.selected) {
      const row = event.data
      const uDocKey = row.u_doc_key;
      getDataByDocKeyToClose(uDocKey)
    }
  }

  const hashValueGetter = (params) => {
    return params.node.rowIndex + 1;
  };

// 컬럼 정의
  const columnDefs = [
    {
      headerName: "번호",
      valueGetter: hashValueGetter,
      width: 60,
      suppressMenu: true
    },
    {
      headerName: "그룹사",
      field: "u_code_name1",
      width: 120,
      suppressMenu: true
    },
    {
      headerName: "소속부서",
      field: "org_nm",
      width: 150
    },
    {
      headerName: "작성자",
      field: "display_name",
      width: 80
    },
    {
      headerName: "문서명",
      field: "object_name",
      width: 350
    },
    {
      headerName: "크기",
      field: "r_content_size",
      width: 100,
      cellRenderer: (params) => fileSize(params.data.r_content_size)
    },
    {
      headerName: "버전 수",
      field: "version_count",
      width: 80
    },
    {
      headerName: "Closed 일시",
      field: "u_closed_date",
      width: 150
    },
    {
      headerName: "Closed 경과기간",
      field: "u_update_date",
      width: 150,
      cellRenderer: (params) => {
        return FormatUtil.formatElapsedTime(params.data.u_closed_date);
      }
    },
    {
      headerName: "非사용기간",
      field: "last_use_date",
      cellRenderer: (params) => {
        return FormatUtil.formatElapsedTime(params.data.last_use_date);
      }
    }
  ];

  return (
    <>
      <div className="ag-theme-balham" style={{ width: "100%", height: 265 }}>
        <AgGridReact
          ref={ref}
          pagination={true}
          paginationPageSize={5}
          rowSelection={"single"}
          onGridReady={onGridReady}
          onRowSelected={onRowSelected}
          gridOptions={gridOptions}
        >
          {columnDefs.map((columnDef, index) => (
            <AgGridColumn key={index} {...columnDef}/>
          ))}
        </AgGridReact>
      </div>
    </>
  );
});

export default AutoClearGrid;
