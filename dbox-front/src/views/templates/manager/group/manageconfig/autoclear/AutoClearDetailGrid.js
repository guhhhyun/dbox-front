import fileSize from "filesize";
import {forwardRef} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

const AutoClearDetailGrid = forwardRef( (
  { openModal, opened, content, onModalOkClick, onModalClose }, ref
) => {

  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    suppressCellSelection: true,
    suppressMenu: true
  };

  // 컬럼 정의
  const columnDefs = [

    {
      headerName: "그룹사",
      field: "u_code_name1",
      width: 120,
      suppressMenu: true
    },
    {
      headerName: "소속부서",
      field: "org_nm",
      width: 80
    },
    {
      headerName: "작성자",
      field: "display_name",
      width: 80
    },
    {
      headerName: "문서명",
      field: "object_name"
    },
    {
      headerName: "크기",
      field: "r_content_size",
      cellRenderer: (params) => fileSize(params.data.r_content_size)
    },
    {
      headerName: "버전",
      field: "r_version_label",
    },
    {
      headerName: "Closed 일시",
      field: "u_closed_date",
    },
    {
      headerName: "Closed 경과기간",
      field: "u_update_date",
    },
    {
      headerName: "非사용기간",
      field: "u_update_date"
    },
    {
      headerName: "삭제",
      width: 100,
      cellStyle: () => ({ cursor: "pointer" }),
      cellRenderer: () => "[삭제]",
      onCellClicked(params) {
        openModal(params);
      }
    }
  ];

  return (
    <>
      <ConfirmDialog open={opened} title="버전 삭제" content={content} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth/>
      <div className="ag-theme-balham" style={{ width: "100%", height: 265 }}>
        <AgGridReact
          ref={ref}
          pagination={true}
          paginationPageSize={5}
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

export default AutoClearDetailGrid;
