import { forwardRef, useImperativeHandle, useState } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { CircularProgress } from "@material-ui/core";
import ContextMenuLayout from "views/commons/contextmenu/ContextMenuLayout";
import DefaultHeader from "views/commons/aggrid/DefaultHeader";
import DocNameEditor from "views/commons/aggrid/DocNameEditor";
import DocNameRenderer from "views/commons/aggrid/DocNameRenderer";
import FormatUtil from "utils/format-util";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import styles from "./HistoryItemGrid.module.css";

console.debug("HistoryItemGrid.js");

const HistoryItemGrid = forwardRef(function ({ onGridReady, rowData, onNameDoubleClick, onNameClick, onNameClickAway, onSortClick, onFilterClick, height }, ref) {
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


  // 렌더러 설정
  const frameworkComponents = {
    agColumnHeader: (props) => <DefaultHeader {...props} onSortClick={onSortClick} onFilterClick={onFilterClick} />,
    loadingCellRenderer: CircularProgress,
    nameRenderer: DocNameRenderer,
    nameEditor: forwardRef(({ value, data, api }, ref) => {
      const [nameValue, setNameValue] = useState(value);

      useImperativeHandle(ref, () => ({
        getValue: () => nameValue,
      }));

      return (
        <DocNameEditor
          type={data.nodeTypeCode}
          value={nameValue}
          onChange={(event) => {
            setNameValue(event.target.value);
          }}
          onClickAway={() => {
            onNameClickAway(api);
          }}
        />
      );
    }),
  };

  // 컬럼 정의
  const columnDefs = [
    {
      width: 50,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: "부서",
      field: "name",
      flex: 1,
      width: 100,
      cellRenderer: "nameRenderer",
      cellEditor: "nameEditor",
      editable: true,
      onCellClicked: onNameClick,
      onCellDoubleClicked: onNameDoubleClick,
    },
    {
      headerName: "사용자",
      field: "document.size",
      width: 200,
      valueFormatter: ({ value }) => FormatUtil.formatFileSize(value),
      cellStyle: () => ({ textAlign: "right" }),
    },
    {
      headerName: "사유",
      field: "securityLevel",
      width: 300,
    },
    {
      headerName: "기준 초과일",
      field: "regDate",
      width: 100,
      valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "잠금",
      field: "tag",
      width: 100,
    },
  ];

  return (
    <ContextMenuLayout
      className={styles.height100per}
      menus={[
        {
          name: "메뉴1",
          onClick: () => {
            alert("메뉴1클릭");
          },
        },
        {
          name: "메뉴2",
          children: [
            {
              name: "메뉴2하위1",
              onClick: () => {
                alert("메뉴2하위1클릭");
              },
            },
            {
              name: "메뉴2하위2",
              onClick: () => {
                alert("메뉴2하위2클릭");
              },
            },
            {
              name: "메뉴2하위3",
              children: [
                {
                  name: "메뉴2하위3하위1",
                  onClick: () => {
                    alert("메뉴2하위3하위1클릭");
                  },
                },
                {
                  name: "메뉴2하위3하위2",
                  onClick: () => {
                    alert("메뉴2하위3하위2클릭");
                  },
                },
              ],
            },
          ],
        },
        {
          name: "메뉴3",
          onClick: () => {
            alert("메뉴3클릭");
          },
        },
      ]}
    >
      <div className="ag-theme-balham" style={{ height: 400 }}>
        <AgGridReact
          ref={ref}
          className={styles.height100per}
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
          rowData={rowData}
          suppressClickEdit
          gridOptions={gridOptions}
        >
          {columnDefs.map((columnDef, index) => (
            <AgGridColumn key={index} {...columnDef}></AgGridColumn>
          ))}
        </AgGridReact>
      </div>
    </ContextMenuLayout>
  );
});

export default HistoryItemGrid;
