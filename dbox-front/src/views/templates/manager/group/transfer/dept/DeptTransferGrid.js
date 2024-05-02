import fileSize from "filesize";
import {forwardRef} from "react";
import {AgGridReact} from "ag-grid-react/lib/agGridReact";
import {AgGridColumn} from "ag-grid-react/lib/agGridColumn";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import FormatUtil from "utils/format-util";

function getFileSize(row) {
  const contentSize = row.data.content_size;
  return contentSize === 0 ? '-' : fileSize(contentSize);
}

const DeptTransferGrid = forwardRef(({ setRow }, ref) => {

  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    suppressCellSelection: true,
    rowStyle: { cursor: "pointer" }
  };

  const onRowSelected = (row) => {
    if (row.node.selected) {
      setRow(row)
    }
  }

  const hashValueGetter = (params) => {
    return params.node.rowIndex + 1;
  };

  const columnDefs = [
    {
      headerName: "번호",
      valueGetter: hashValueGetter,
      width: 60,
      menuTabs: [],
      cellStyle: { textAlign: "center" }
    },
    {
      headerName: "부서",
      field: "u_send_dept_name",
      menuTabs: []
    },
    {
      headerName: "미이관 자료",
      field: "content_count",
      menuTabs: [],
      cellRenderer: (params) => `${params.data.content_count}건`
    },
    {
      headerName: "파일용량",
      field: "content_size",
      menuTabs: [],
      cellRenderer: getFileSize
    },
    {
      headerName: "미이관 일수",
      field: "u_reg_date",
      menuTabs: [],
      cellRenderer: (params) => {
        return FormatUtil.formatElapsedTime(params.data.u_end_date);
      }
    }
  ];

  return (
    <div className="ag-theme-balham" style={{width: "100%", height: 265}}>
      <AgGridReact
        ref={ref}
        pagination={true}
        paginationPageSize={10}
        rowSelection={"single"}
        onRowSelected={onRowSelected}
        gridOptions={gridOptions}
      >
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}/>
        ))}
      </AgGridReact>
    </div>
  );
});

export default DeptTransferGrid;
