import { forwardRef } from "react";
import { Typography } from "@material-ui/core";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import styles from "./ContextMenu.module.css";


console.debug("TrashContextMenu.js");

const TrashContextMenu = forwardRef(function (props, ref) {
  return (
    <ContextMenu
      ref={ref}
      menus={[
        {
          element: <Typography className={styles.contextMenu}>폐기하기</Typography>,
          onClick: () => {
            alert("폐기하기");
          },
        },
        {
          element: <Typography className={styles.contextMenu}>복원하기</Typography>,
          onClick: () => {
            alert("복원하기");
          },
        },
        {
          divider: true,
        },
        {
          element: <Typography className={styles.contextMenu}>속성</Typography>,
          onClick: () => {
            alert("속성");
          },
        },
      ]}
      {...props}
    />
  );
});

export default TrashContextMenu;
