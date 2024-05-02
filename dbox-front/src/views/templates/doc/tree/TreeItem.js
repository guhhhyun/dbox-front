import { Fragment } from "react";
import { Typography } from "@material-ui/core";
import styles from "./TreeItem.module.css";

export default function TreeItem({ children, showCount, doneCount, doingCount }) {
  return (
    <Fragment>
      <Typography variant="body2" display="inline">
        {children}
      </Typography>
      {showCount && (
        <Typography variant="overline" color="secondary" className={styles.folderStatus}>
          완료 <span className={styles.fontBold}>{doneCount}</span> | 진행 <span className={styles.fontBold}>{doingCount}</span>
        </Typography>
      )}
    </Fragment>
  );
}
