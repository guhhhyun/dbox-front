import { forwardRef, useImperativeHandle, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import queryString from "query-string";
import SearchExclusionDeptGrid from "views/templates/manager/group/share/searchblind/SearchExclusionDeptGrid";
import NodeApi from "apis/node-api";
import CommonUtil from "utils/common-util";

console.debug("SearchExclusionDeptGridContainer.js");

const SearchExclusionDeptGridContainer = forwardRef(function ({ height, gridKey }, ref) {
  // gridKey가 주어질 경우 그에 맞는 nodeId 키값 생성 (2분할 화면을 위해 필요)
  const gridKeyNodeId = `${gridKey ? `${gridKey}NodeId` : "nodeId"}`;

  const user = useSelector((state) => state.session.user);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const gridRef = useRef(null);

  // 리스트 조회 기준
  const options = {
    nodeTypeCodes: ["FOLDER", "DOCUMENT", "TRASH", "DIRECTORY"],
    orders: [
      { field: "useYn", direction: "asc" },
      { field: "sortKey", direction: "asc" },
      { field: "dkName", direction: "asc" },
      { field: "regDate", direction: "asc" },
    ],
    mode: "detail",
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  /**
   * 데이터 불러오기
   */
  const getData = async (nodeId) => {
    try {
      options.nodeId = nodeId || queryString.parse(document.location.search)[gridKeyNodeId] || user?.group?.nodeId;
      const response = await NodeApi.getNodeChildren({ params: options });
      gridRef.current.api.setRowData(response.data.result.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar({
        severity: "error",
        title: "Error",
        message: error.message,
      });
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = () => {
    getData();
  };

  /**
   * 이름 더블클릭
   */
  const doubleClickName = (params) => {
    if (params.data.nodeTypeCode === "DOCUMENT") {
      const link = document.createElement("a");
      link.setAttribute("download", params.data.name);
      link.style.display = "none";
      document.body.appendChild(link);
      link.setAttribute("href", `/api/nodes/${encodeURIComponent(params.data.uuid)}/content?token=${CommonUtil.getSessionStorageItem("token")}`);
      link.click();
      document.body.removeChild(link);
    } else {
      const parsed = queryString.parse(document.location.search);
      parsed[gridKeyNodeId] = params.data.nodeId;
      const stringified = queryString.stringify(parsed);
      history.push(`/doc?${stringified}`);
      getData(params.data.nodeId);
    }
  };

  /**
   * 정렬 클릭
   */
  const clickSort = (
    {
      column: {
        colDef: { field },
      },
    },
    direction,
  ) => {
    switch (field) {
      case "name":
        options.orders = options.orders.map((item) => (item.field === "dkName" ? { ...item, direction } : item));
        break;
      default:
    }
    getData();
  };

  /**
   * 필터 클릭
   */
  const clickFilter = (props) => {
    alert("clickFilter " + props.displayName);
  };

  // 클릭 셀 정보
  let clickedCell = null;

  // 더블클릭 체크
  let dbclickTimer = null;

  /**
   * 셀 편집하기
   */
  const startEditName = ({ api, colDef: { field }, rowIndex, event: { detail } }) => {
    // 더블클릭일 경우 직전 클릭 이벤트 제거 후 종료
    if (dbclickTimer && detail > 1) {
      clearTimeout(dbclickTimer);
      return;
    }

    // 더블클릭 여부를 확인하기 위해 300ms 지연
    dbclickTimer = setTimeout(() => {
      // 1000ms 내 두번 클릭 시 셀 편집
      if (clickedCell && clickedCell.colKey === field && clickedCell.rowIndex === rowIndex) {
        api.startEditingCell(clickedCell);
        clickedCell = null;
      } else {
        // 직전 클릭된 셀 정보 저장
        clickedCell = {
          colKey: field,
          rowIndex,
        };

        // 1000ms 뒤 클릭된 셀 정보 제거
        setTimeout(() => {
          clickedCell = null;
        }, 1000);
      }
      dbclickTimer = null;
    }, 300);
  };

  /**
   * 셀 편집 끄기
   */
  const stopEditName = (api) => {
    api.stopEditing();
  };

  return (
    <SearchExclusionDeptGrid
      ref={gridRef}
      onGridReady={onGridReady}
      onNameDoubleClick={doubleClickName}
      onNameClick={startEditName}
      onNameClickAway={stopEditName}
      onSortClick={clickSort}
      onFilterClick={clickFilter}
      height={height}
    />
  );
});

export default SearchExclusionDeptGridContainer;
