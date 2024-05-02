import { useDispatch, useSelector } from "react-redux";
import DocDefaultHeader from "views/templates/doc/grid/header/DocDefaultHeader";
import { setDocGridColumn } from "stores/setting";
import { GRID_SORT } from "constants/code-constants";

console.debug("DocDefaultHeaderContainer.js");

export default function DocDefaultHeaderContainer(props) {
  const { pageKey, displayName, column, columnApi, api, onContextMenu } = props;

  const dispatcher = useDispatch();
  const docGridColumn = useSelector((state) => state.setting.docGridColumn);
  const sort = docGridColumn[pageKey]?.find((item) => item.colId === column.colId)?.sort || null;

  /**
   * 정렬 클릭
   */
  const clickSort = () => {
    let nextDirection;
    switch (sort) {
      case GRID_SORT.DESC:
        nextDirection = GRID_SORT.ASC;
        break;
      case GRID_SORT.ASC:
        nextDirection = GRID_SORT.NO_SORT;
        break;
      default:
        nextDirection = GRID_SORT.DESC;
    }

    columnApi.applyColumnState({
      state: [
        {
          colId: column.colId,
          sort: nextDirection,
        },
      ],
    });

    const columnState = columnApi.getColumnState();
    dispatcher(
      setDocGridColumn({
        ...docGridColumn,
        [pageKey]: columnState,
      }),
    );
  };

  /**
   * 필터 클릭
   */
  const clickFilter = () => {
    // filterRef.current.openModal();
  };

  /**
   * 컨텍스트 메뉴 열기
   */
  const openContextMenu = (event) => {
    onContextMenu(event, column);
  };

  return <DocDefaultHeader name={displayName} sort={sort} onSortClick={clickSort} onFilterClick={clickFilter} onContextMenu={openContextMenu} />;
}
