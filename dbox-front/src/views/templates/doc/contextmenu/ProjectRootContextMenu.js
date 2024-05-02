import { forwardRef } from "react";
import { Typography } from "@material-ui/core";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import styles from "./ContextMenu.module.css";

console.debug("ProjectRootContextMenu.js");

const ProjectRootContextMenu = forwardRef(function ({ onNewProjectClick, ...extra }, ref) {
  return (
    <ContextMenu
      menus={[
        {
          element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>프로젝트/투자 생성</Typography>,
          onClick: onNewProjectClick,
        },
      ]}
      {...extra}
    />
  );
});

export default ProjectRootContextMenu;
