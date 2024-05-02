import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Typography } from "@material-ui/core";
import FolderPropertyModalContainer from "views/containers/doc/modals/property/FolderPropertyModalContainer";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import DeleteModalContainer from "views/containers/doc/modals/delete/DeleteModalContainer";
import DocTransferModalContainer from "views/containers/doc/modals/transfer/DocTransferModalContainer";
import MultipleAuthPropertyModalContainer from "views/containers/doc/modals/property/MultipleAuthPropertyModalContainer";
import DocPasteModalContainer from "views/containers/doc/modals/paste/DocPasteModalContainer";
import styles from "./ContextMenu.module.css";
import lockIcon from "assets/imgs/icon-lock.svg";

console.debug("ResearchContextMenu.js");

export default function ResearchContextMenu({
  data,
  onFixClick,
  onPasteClick,
  onDeleteClick,
  onEditNameClick,
  onResearchPropertyClick,
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
            onClick: onResearchPropertyClick,
          },
        ]}
        {...extra}
      />
    </Fragment>
  );
}
