import { forwardRef } from "react";
import { Typography } from "@material-ui/core";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import styles from "./ContextMenu.module.css";

console.debug("ResearchRootContextMenu.js");

const ResearchRootContextMenu = forwardRef(function ({ onNewResearchClick, ...extra }, ref) {
  return (
    <ContextMenu
      menus={[
        {
          element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>연구과제 생성</Typography>,
          onClick: onNewResearchClick,
        },
      ]}
      {...extra}
    />
  );
});

export default ResearchRootContextMenu;
