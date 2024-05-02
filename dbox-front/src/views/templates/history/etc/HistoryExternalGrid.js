import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./HistoryExternalGrid.module.css";
import { Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("HistoryMessengerGrid.js");

const HistoryMessengerGrid = forwardRef(function (
  {
    onGridReady,
    onSelectionChanged,
    gridIdData,
    opened,
    onModalOpen,
    onModalClose,
    userLogData,
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
    // {
    //   checkboxSelection: true,
    //   width: 50,
    // },
    {
      headerName: "회사",
      field: "attachComCodeName",
      width: 120,
    },
    {
      headerName: "부서",
      field: "attachCabinetCodeName",
      width: 150,
    },

    
    {
      headerName: "작성자ID",
      field: "uJobUser",
      width: 100,
      hide:true
    },

    {
      headerName: "작성자",
      field: "attachReqUserName",
      width: 100,
    },
    {
      headerName: "반출일자",
      field: "attachJobDateFormat",
      width: 100,
    },
    {
      headerName: "외부 사이트(메신저 포함)",
      field: "uSystemName",
      width: 250,
    },
    {
      headerName: "자료 List",
      field: "attachListName",
      width: 300,
      //cellRenderer: () => {
      //  return "[List]";
      //},
      onCellClicked(params) {
        onModalOpen(params);
      },
    },

  ];

  const classes = useStyles();

  return (
    <Fragment>
      <ModalDialog title="자료" open={opened} onClose={onModalClose} onOkClick={onModalClose} okText="닫기" maxWidth="sm" fullWidth>
        <div className={styles.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">자료명</TableCell>
                <TableCell align="center">사이즈</TableCell>
                <TableCell align="center">작성자</TableCell>
                
              </TableRow>
            </TableHead>
            {userLogData.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {userLogData.map((x, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{x.uDocName}</TableCell>
                    <TableCell align="center">{x.contentsize}</TableCell>
                    <TableCell align="left">{x.displayName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </ModalDialog>
      
      <div className="ag-theme-balham" style={{ height: 500 }}>
        <AgGridReact
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
          ref={ref}
          className={styles.height100per}
          onGridReady={onGridReady}
          suppressClickEdit
          gridOptions={gridOptions}
          pagination="true"
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

export default HistoryMessengerGrid;
