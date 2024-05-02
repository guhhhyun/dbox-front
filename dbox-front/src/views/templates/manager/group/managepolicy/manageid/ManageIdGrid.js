import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./ManageIdGrid.module.css";
import { Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("ManageIdGrid.js");

const ManageIdGrid = forwardRef(function (
  {
    onGridReady,
    onSelectionChanged,
    gridIdData,
    opened,
    onModalOpen,
    onModalClose,
    userLogData,
    onOkClick,
    onNotOkClick,
    useOpened,
    notUseOpened,
    onUseModalOpen,
    onUseModalClose,
    onNotUseModalOpen,
    onNotUseModalClose,
    clearOpened,
    closeClearModal,
  },
  ref,
) {
  const useStyles = makeStyles((theme) => ({
    buttonGroup: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
      float: "right",
      display: "flex",
    },
  }));

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

  const isRowSelectable = (node) => {
    return node.data ? node.data.uLockStatus != "L" : false;
  };

  // 컬럼 정의
  const columnDefs = [
    {
      width: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: "회사",
      field: "uCodeName1",
      width: 120,
    },
    {
      headerName: "상위그룹",
      field: "parentGroup",
      width: 100,
    },
    {
      headerName: "부서",
      field: "orgNm",
      width: 250,
    },
    {
      headerName: "임직원구분",
      field: "empType",
      width: 130,
      cellRenderer: (params) => {
        return params.value === "0" ? "임원" : params.value === "1" ? "관리직" : params.value === "2" ? "기능직" : params.value === "3" ? "협력업체" : null;
      },
    },
    {
      headerName: "현채인구분",
      field: "localEmpYn",
      width: 130,
      cellRenderer: (params) => {
        return params.value === "Y" ? "현채인" : "일반직";
      },
    },
    {
      headerName: "직급",
      field: "name",
      width: 70,
    },
    {
      headerName: "이름",
      field: "displayName",
      width: 100,
    },
    {
      headerName: "사용 ID명",
      field: "socialPerId",
      width: 250,
    },
    {
      headerName: "ID 접속현황",
      field: "",
      width: 100,
      cellRenderer: () => {
        return "[List]";
      },
      onCellClicked(params) {
        onModalOpen(params);
      },
    },
    {
      headerName: "ID 사용",
      field: "userState",
      width: 80,
      cellRenderer: (params) => {
        return params.value === null || params.value === "1" ? "미사용" : "사용";
      },
    },
  ];

  const classes = useStyles();

  return (
    <Fragment>
      <ModalDialog title="ID 접속현황" open={opened} onClose={onModalClose} onOkClick={onModalClose} okText="닫기" maxWidth="sm" fullWidth>
        <div className={styles.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID 구분</TableCell>
                <TableCell align="center">ID명</TableCell>
                <TableCell align="center">접속일</TableCell>
                <TableCell align="center">사용자PC IP 주소</TableCell>
              </TableRow>
            </TableHead>
            {userLogData.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {userLogData.map((x, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">개인 ID</TableCell>
                    <TableCell align="center">{x.uUserId}</TableCell>
                    <TableCell align="center">{x.uLoginDate.split(".", 1)}</TableCell>
                    <TableCell align="center">{x.uUserIp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </ModalDialog>
      <div className={classes.buttonGroup}>
        <Button disabled={gridIdData === undefined || gridIdData.length === 0 ? true : false} onClick={onUseModalOpen} variant="contained" color="primary">
          사용
        </Button>
        <Button disabled={gridIdData === undefined || gridIdData.length === 0 ? true : false} onClick={onNotUseModalOpen} variant="contained" color="primary">
          미사용
        </Button>
        <ConfirmDialog
          open={useOpened}
          title="사용자 ID 관리"
          content="선택한 사용자를 '사용'으로 처리하시겠습니까?"
          onOkClick={onOkClick}
          onClose={onUseModalClose}
          maxWidth="sm"
          fullWidth
        ></ConfirmDialog>
        <ConfirmDialog
          open={notUseOpened}
          title="사용자 ID 관리"
          content="선택한 사용자를 '미사용'으로 처리하시겠습니까?"
          onOkClick={onNotOkClick}
          onClose={onNotUseModalClose}
          maxWidth="sm"
          fullWidth
        ></ConfirmDialog>
        <ModalDialog
          open={clearOpened}
          content="변경사항이 반영되었습니다."
          okText="닫기"
          onOkClick={closeClearModal}
          onClose={closeClearModal}
          maxWidth="sm"
          fullWidth
        ></ModalDialog>
      </div>
      <div className="ag-theme-balham" style={{ height: 500 }}>
        <AgGridReact
          onSelectionChanged={onSelectionChanged}
          ref={ref}
          className={styles.height100per}
          onGridReady={onGridReady}
          suppressClickEdit
          gridOptions={gridOptions}
          pagination="true"
          paginationAutoPageSize="true"
          isRowSelectable={isRowSelectable}
          // onQuickFilterChanged={onQuickFilterChanged}
        >
          {columnDefs.map((columnDef, index) => (
            <AgGridColumn key={index} {...columnDef}></AgGridColumn>
          ))}
        </AgGridReact>
      </div>
    </Fragment>
  );
});

export default ManageIdGrid;
