import fileSize from "filesize";
import {forwardRef, useEffect} from "react";
import {AgGridReact} from "ag-grid-react/lib/agGridReact";
import {AgGridColumn} from "ag-grid-react/lib/agGridColumn";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function getFileSize(row) {
  const contentSize = row.data.content_size;
  return contentSize === 0 ? '-' : fileSize(contentSize);
}

const DeptTransferGrid = forwardRef(({ setChecked }, ref) => {

  const onSelectionChanged = () => {
    const selectedRows = gridOptions.api.getSelectedRows();
    const rObjectIds = selectedRows.map(item => item.r_object_id);
    if(rObjectIds.length > 0) {
      setChecked(rObjectIds)
    }
  }

  // 컬럼 기본값 정의
  const gridOptions = {
    headerHeight: 40,
    rowHeight: 36,
    suppressCellSelection: true,
    pagination: true,
    paginationPageSize: 10,
    rowSelection: "multiple",
    rowMultiSelectWithClick: true,
    onSelectionChanged: onSelectionChanged,
    rowStyle: { cursor: "pointer" }
  };

  const columnDefs = [
    {
      width: 50,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    {
      headerName: "문서수",
      field: "content_count",
      menuTabs: [],
      cellRenderer: (params) => `${params.data.content_count}건`
    },
    {
      headerName: "용량(MB)",
      field: "content_size",
      menuTabs: [],
      cellRenderer: getFileSize
    },
    {
      headerName: "수신부서",
      field: "org_nm",
      menuTabs: []
    }
  ];

  useEffect(() => {
    console.log('DeptTransferGrid useEffect()')
  }, []);

  return (
    <div className="ag-theme-balham" style={{width: "100%", height: 265}}>
      <AgGridReact
        ref={ref}
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
