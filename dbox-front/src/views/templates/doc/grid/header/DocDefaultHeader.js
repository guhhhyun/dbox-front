import { FilterList, ArrowUpward, ArrowDownward, ImportExport } from "@material-ui/icons";
import { GRID_SORT } from "constants/code-constants";
import styles from "./DocDefaultHeader.module.css";

console.debug("DocDefaultHeader.js");

function SortIcon({ direction, onClick }) {
  return direction === GRID_SORT.ASC ? (
    <ArrowUpward className={styles.icon} onClick={onClick} />
  ) : direction === GRID_SORT.DESC ? (
    <ArrowDownward className={styles.icon} onClick={onClick} />
  ) : (
    <ImportExport className={styles.icon} onClick={onClick} />
  );
}

export default function DocDefaultHeader({ name, sort, filter, onSortClick, onFilterClick, onContextMenu }) {
  const sortEnabled = typeof onSortClick === "function";
  const filterEnabled = typeof onFilterClick === "function";

  return (
    <div className={styles.header} onContextMenu={onContextMenu}>
      <div className={styles.text}>
        <span>{name}</span>
        {sortEnabled && <SortIcon direction={sort} onClick={onSortClick} />}
      </div>
      {filterEnabled && <FilterList className={styles.icon} onClick={onFilterClick} />}
      {/* <FilterModal
        ref={filterRef}
        onModalOkClick={applyFilter}
        columns={props.columnApi.getAllColumns().map((item) => ({
          name: item.colDef.headerName,
        }))}
      /> */}
    </div>
  );
}
