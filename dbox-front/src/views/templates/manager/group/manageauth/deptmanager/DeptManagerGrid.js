import {forwardRef, useState} from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { COM_CODE } from "constants/code-constants";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import {Typography} from "@material-ui/core";

const DeptManagerGrid = forwardRef( ({ deleteDeptManager }, ref,) => {

  const [objectId, setObjectId] = useState("");
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState("");

  const getContent = (params) => {
    const data = params.data;
    const comCode = data.com_org_id;
    const orgNm = data.org_nm;
    const uComCode = data.u_com_code;
    const uDeptName = data.u_dept_name;
    const displayName = data.display_name;
    const pstnName = data.pstn_name;
    const objectId = data.r_object_id;
    setObjectId(objectId);
    return (
      <>
        <Typography variant="body1">
          {COM_CODE[comCode]?.desc} {orgNm} 부서문서관리자로 등록된,
        </Typography>
        <Typography variant="body1">
          {COM_CODE[uComCode]?.desc} {uDeptName} {displayName} {pstnName}의 권한을 해제합니다.
        </Typography>
      </>
    )
  }

  const onModalOkClick = async () => {
    await deleteDeptManager(objectId);
    onModalClose();
  };

  const onModalClose = () => {
    setOpened(false);
  };

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
      headerName: "회사",
      field: "u_com_code",
      cellRenderer: (params) => {
        const data = params.data;
        if(data) {
          const comCode = data.u_com_code;
          return COM_CODE[comCode]?.desc
        }
      }
    },
    {
      headerName: "자료소유부서",
      field: "u_dept_name",
    },
    {
      headerName: "관리자",
      field: "display_name"
    },
    {
      headerName: "직책/직급",
      field: "pstn_name"
    },
    {
      headerName: "관리자 소속사",
      field: "com_org_id",
      cellRenderer: (params) => {
        const comCode = params.data.com_org_id;
        if(comCode) {
          return COM_CODE[comCode].desc
        }
      }
    },
    {
      headerName: "관리자 소속부서",
      field: "org_nm",
    },
    {
      headerName: "Unmatch 관리자",
      cellRenderer: (params) => {
        const uDeptCode = params.u_dept_code
        const orgId = params.org_id;
        return uDeptCode === orgId ? 'X' : 'O';
      },
    },
    {
      headerName: "권한해제",
      width: 100,
      cellStyle: () => ({cursor: "pointer"}),
      cellRenderer: () => "[권한해제]",
      onCellClicked(params) {
        console.log('params', params);
        setContent(getContent(params));
        setOpened(true);
      }
    }
  ];

  return (
    <>
      <ConfirmDialog open={opened} title="권한 해제" children={content} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth/>
      <div className="ag-theme-balham" style={{ width: "100%", height: 265 }}>
        <AgGridReact
          ref={ref}
          pagination={true}
          paginationPageSize={10}
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

export default DeptManagerGrid;
