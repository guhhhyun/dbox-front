import { Fragment } from "react";
import { Typography } from "@material-ui/core";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import styles from "./ContextMenu.module.css";

console.debug("ProjectContextMenu.js");

export default function ProjectContextMenu({
  data,
  onFixClick,
  onPasteClick,
  onDeleteClick,
  onEditNameClick,
  onProjectPropertyClick,
  onMultipleAuthPropertyClick,
  onDownloadClick,
  onTransferClick,
  ...extra
}) {
  return (
    <Fragment>
      <ContextMenu
        menus={[
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>완료함으로 이동</Typography>,
            onClick: onFixClick,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>이동(Ctrl+X)</Typography>,
            onClick: () => {
              alert("이동(Ctrl+X)");
            },
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>복사(Ctrl+C)</Typography>,
            onClick: () => {
              alert("복사(Ctrl+C)");
            },
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>붙여넣기</Typography>,
            onClick: onPasteClick,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>삭제(D)</Typography>,
            onClick: onDeleteClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>이름바꾸기(M)</Typography>,
            onClick: onEditNameClick,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>속성</Typography>,
            onClick: onProjectPropertyClick,
          },
        ]}
        {...extra}
      />
    </Fragment>
  );
}
