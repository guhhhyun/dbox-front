import { Fragment, forwardRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./HistoryMessengerGrid.module.css";
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
      headerName: "사명",
      field: "companyName",
      width: 120,
    },
    {
      headerName: "부서",
      field: "deptName",
      width: 250,
    },
    {
      headerName: "신청자",
      field: "displayName",
      width: 100,
    },
    {
      headerName: "연동메신저",
      field: "uSystemName",
      width: 250,
    },
  ];

  const classes = useStyles();

  return (
    <Fragment>
      
      <div className="ag-theme-balham" style={{ height: 500 }}>
        <AgGridReact
          rowSelection={"single"}
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
