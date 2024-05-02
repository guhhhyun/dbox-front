import {forwardRef} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const TransferApprovalGrid = forwardRef(({ setRObjectId, setChecked }, ref,) => {

  const onSelectionChanged = () => {
    const selectedRows = gridOptions.api.getSelectedRows();
    const rObjectId = (item) => item.r_object_id
    const rObjectIds = selectedRows.map(rObjectId);
    setChecked(rObjectIds)
  }

  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    pagination: true,
    paginationPageSize: 10,
    rowSelection: "multiple",
    rowMultiSelectWithClick: true,
    onSelectionChanged: onSelectionChanged,
    isRowSelectable: params => params.data.u_req_status !== "A"
  };

  // 컬럼 정의
  const columnDefs = [
    {
      width: 50,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    {
      headerName: "신청자",
      field: "req_user_name",
    },
    {
      headerName: "요청명",
      field: "u_req_title",
      cellStyle: { cursor: "pointer" },
      onCellClicked: (params) => setRObjectId(params.data.r_object_id)
    },
    {
      headerName: "송신부서",
      field: "send_cab_name"
    },
    {
      headerName: "수신부서",
      field: "rcev_cab_name"
    },
    {
      headerName: "요청일",
      field: "u_req_date"
    },
    {
      headerName: "처리일",
      field: "u_approve_date"
    },
    {
      headerName: "이관사유",
      field: "u_req_reason"
    },
    {
      headerName: "승인자",
      field: "approver",
    }
  ];

  return (
    <div className="ag-theme-balham" style={{width: "100%", height: 265}}>
      <AgGridReact ref={ref} gridOptions={gridOptions}>
        {columnDefs.map((columnDef, index) => (
          <AgGridColumn key={index} {...columnDef}/>
        ))}
      </AgGridReact>
    </div>
  );
});

export default TransferApprovalGrid;
