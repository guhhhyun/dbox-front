import fileSize from "filesize";
import { forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

const LockedDataGrid = forwardRef( (
  { onQuickFilterChanged, onGridReady, rowData, openModal, opened, content, onModalOkClick, onModalClose, onRowSelected },
  ref,
) => {
  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    suppressCellSelection: true,
    suppressMenu: true
  };

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
      field: "uCodeName1",
      width: 120,
      suppressMenu: true
    },
    {
      headerName: "소속팀",
      field: "regUserDetail.orgNm",
      width: 150,
      suppressMenu: true
    },
    {
      headerName: "최종 작성자",
      field: "regUserDetail.displayName",
      width: 130,
      suppressMenu: true
    },
    {
      headerName: "파일명",
      field: "objectName",

    },
    {
      headerName: "최종 수정일",
      field: "uUpdateDate",
      width: 150
    },
    {
      headerName: "크기",
      field: "rContentSize",
      cellRenderer: (params) => fileSize(params.data.rContentSize)
    },
    {
      headerName: "잠금자",
      field: "rLockOwner",
      width: 130
    },
    {
      headerName: "잠금일",
      field: "rLockDate",
      width: 150
    },
    {
      headerName: "해제",
      width: 100,
      cellStyle: () => ({ cursor: "pointer" }),
      cellRenderer: () => "[해제]",
      onCellClicked(params) {
        openModal(params);
      }
    },
  ];

  return (
    <>
      <ConfirmDialog open={opened} title="잠금 해제" content={content} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth/>
      <div className="ag-theme-balham" style={{ width: "100%", height: 400 }}>
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          ref={ref}
          onGridReady={onGridReady}
          rowData={rowData}
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

export default LockedDataGrid;
