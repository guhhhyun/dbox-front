import { Fragment, forwardRef, useRef, useImperativeHandle } from "react";
import { CircularProgress } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import DocDefaultRendererContainer from "views/containers/doc/grid/renderers/DocDefaultRendererContainer";
import DocNameRendererContainer from "views/containers/doc/grid/renderers/DocNameRendererContainer";
import DocCreatorRendererContainer from "views/containers/doc/grid/renderers/DocCreatorRendererContainer";
import DocFeedbackRendererContainer from "views/containers/doc/grid/renderers/DocFeedbackRendererContainer";
import DocApprovalRendererContainer from "views/containers/doc/grid/renderers/DocApprovalRendererContainer";
import DocVersionRendererContainer from "views/containers/doc/grid/renderers/DocVersionRendererContainer";
import DocDefaultEditorContainer from "views/containers/doc/grid/editors/DocDefaultEditorContainer";
import DocNameEditorContainer from "views/containers/doc/grid/editors/DocNameEditorContainer";
import DocLockStatusModal from "views/templates/doc/modals/agent/DocLockStatusModal";
import DocDefaultTooltip from "views/templates/doc/grid/tooltips/DocDefaultTooltip";
import KUpload from "views/commons/kupload/KUpload";
import FormatUtil from "utils/format-util";
import CommonUtil from "utils/common-util";
import styles from "./DocGrid.module.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React from "react";
import { cloneElement } from "react";
import DefaultHeader from "views/commons/aggrid/DefaultHeader";

console.debug("DocGrid.js");

const DocGrid = forwardRef(function (
  {
    pageKey,
    onGridReady,
    rowData,
    onNameDoubleClicked,
    onCellEditingStarted,
    onCellEditingStopped,
    onKeyDown,
    onContextMenu,
    onBeforeMouseEvent,
    onDropData,
    opened,
    closeModal,
    docModalObj,
    onSortChanged,
    onFilterChanged,
    onColumnResized,
    onColumnMoved,
  },
  ref,
) {
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    grid: gridRef.current,
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
    getRowNodeId: (data) => data.key,
    multiSortKey: "ctrl",
    onSortChanged: onSortChanged,
    onFilterChanged: onFilterChanged,
    onColumnResized: onColumnResized,
    onColumnMoved: onColumnMoved,
  };

  // 렌더러 설정
  const frameworkComponents = {
    loadingCellRenderer: CircularProgress,
    defaultRenderer: (props) => <DocDefaultRendererContainer {...props} onContextMenu={onContextMenu} />,
    nameRenderer: (props) => <DocNameRendererContainer {...props} pageKey={pageKey} onContextMenu={onContextMenu} />,
    creatorRenderer: (props) => <DocCreatorRendererContainer {...props} onContextMenu={onContextMenu} />,
    feedbackRenderer: (props) => <DocFeedbackRendererContainer {...props} onContextMenu={onContextMenu} />,
    approvalRenderer: (props) => <DocApprovalRendererContainer {...props} onContextMenu={onContextMenu} />,
    versionRenderer: (props) => <DocVersionRendererContainer {...props} onContextMenu={onContextMenu} />,
    defaultEditor: forwardRef((props, ref) => <DocDefaultEditorContainer ref={ref} {...props} pageKey={pageKey} />),
    nameEditor: forwardRef((props, ref) => <DocNameEditorContainer ref={ref} {...props} pageKey={pageKey} />),
    defaultTooltip: DocDefaultTooltip,
  };

  // 컬럼 정의
  const columnDefs = [
    {
      headerName: "이름(파일 명)",
      headerTooltip: "이름(파일 명)",
      field: "name",
      tooltipField: "name",
      initialFlex: 1,
      minWidth: 200,
      filter: "defaultFilter",
      cellRenderer: "nameRenderer",
      cellEditor: "nameEditor",
      editable: true,
      onCellDoubleClicked: onNameDoubleClicked,
    },
    //반출 컬럼 시작
    {
      headerName: "반출 구분",
      headerTooltip: "반출 구분",
      field: "apprType",
      tooltipField: "apprType",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "반출 요청일",
      headerTooltip: "반출 요청일",
      field: "reqDate",
      tooltipField: "reqDate",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "반출 종료일",
      headerTooltip: "반출 종료일",
      field: "limitDate",
      tooltipField: "limitDate",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "결재 여부",
      headerTooltip: "결재 여부",
      field: "reqStatus",
      tooltipField: "reqStatus",
      initialWidth: 90,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "문서함 구분",
      headerTooltip: "문서함 구분",
      field: "hamType",
      tooltipField: "hamType",
      initialWidth: 90,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "원본 위치",
      headerTooltip: "원본 위치",
      field: "folPath",
      tooltipField: "folPath",
      initialWidth: 150,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    //반출 컬럼 끝
    {
      headerName: "시행년도",
      headerTooltip: "시행년도",
      field: "startYear",
      tooltipField: "startYear",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "주관부서",
      headerTooltip: "주관부서",
      field: "ownDept",
      tooltipField: "ownDept",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "책임자",
      headerTooltip: "책임자",
      field: "chief",
      tooltipField: "chief",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "상태",
      headerTooltip: "상태",
      field: "status",
      tooltipField: "status",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "작성자",
      headerTooltip: "작성자",
      field: "creator",
      tooltipField: "creator",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "creatorRenderer",
    },
    {
      headerName: "피드백",
      headerTooltip: "피드백",
      field: "feedback",
      tooltipField: "feedback",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "feedbackRenderer",
      cellStyle: () => ({ textAlign: "left" }),
    },
    {
      headerName: "결재/Link정보",
      headerTooltip: "결재/Link정보",
      field: "approval",
      tooltipField: "approval",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "approvalRenderer",
    },
    {
      headerName: "최종결재자",
      headerTooltip: "최종결재자",
      field: "lastApprover",
      tooltipField: "lastApprover",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "수정일",
      headerTooltip: "수정일",
      field: "modDate",
      tooltipField: "modDate",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "만료일",
      headerTooltip: "만료일",
      field: "expireDate",
      tooltipField: "expireDate",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "버전",
      headerTooltip: "버전",
      field: "version",
      tooltipField: "version",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "versionRenderer",
      valueFormatter: ({ value }) => (CommonUtil.isNumber(value) ? Math.floor(value) : value),
      cellStyle: () => ({ textAlign: "left" }),
    },
    {
      headerName: "크기",
      headerTooltip: "크기",
      field: "size",
      tooltipField: "size",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      valueFormatter: ({ value }) => FormatUtil.formatFileSize(value),
      cellStyle: () => ({ textAlign: "right" }),
    },
    {
      headerName: "보안등급",
      headerTooltip: "보안등급",
      field: "secLevel",
      tooltipField: "secLevel",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "생성일",
      headerTooltip: "생성일",
      field: "createDate",
      tooltipField: "createDate",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      valueFormatter: ({ value }) => FormatUtil.formatDate(value),
      cellStyle: () => ({ textAlign: "center" }),
    },
    {
      headerName: "태그",
      headerTooltip: "태그 : 검색 또는 부서별 해당 자료의 관리 목적상 입력 관리 할 수 있습니다.\n(텍스트 30자 이내)",
      field: "tag",
      tooltipField: "tag",
      initialWidth: 100,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
      cellEditor: "defaultEditor",
      editable: true,
    },
    {
      headerName: "확장자",
      headerTooltip: "확장자",
      field: "ext",
      tooltipField: "ext",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
    {
      headerName: "분류",
      headerTooltip: "분류",
      field: "classify",
      tooltipField: "classify",
      initialWidth: 80,
      filter: "defaultFilter",
      cellRenderer: "defaultRenderer",
    },
  ];

  return (
    <Fragment>
      <KUpload
        className={`ag-theme-balham ${styles.height100per}`}
        onKeyDown={onKeyDown}
        onContextMenu={onContextMenu}
        onBeforeMouseEvent={onBeforeMouseEvent}
        onDropData={onDropData}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
          rowData={rowData}
          gridOptions={gridOptions}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
          suppressClickEdit
          suppressContextMenu
          suppressClipboardApi
          suppressClipboardPaste
        >
          {columnDefs.map((columnDef) => (
            <AgGridColumn key={columnDef.field} {...columnDef}></AgGridColumn>
          ))}
        </AgGridReact>
      </KUpload>

      <DocLockStatusModal opened={opened} closeModal={closeModal} docModalObj={docModalObj} />
    </Fragment>
  );
});

export default DocGrid;
