import { Fragment, forwardRef, useImperativeHandle } from "react";
import { Typography } from "@material-ui/core";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import styles from "./ContextMenu.module.css";
import NewforlerIcon from "assets/imgs/icon-newFolder.svg";
import ContentIcon from "views/commons/icon/ContentIcon";
import { ICON_TYPE } from "constants/code-constants";

console.debug("EmptyContextMenu.js");

const EmptyContextMenu = forwardRef(function (
  { templateFiles, onNewFolderClick, onRefreshClick, onUploadClick, onTemplateFileClick, onPasteClick, ...extra },
  ref,
) {
  return (
    <Fragment>
      <ContextMenu
        menus={[
          {
            element: (
              <Typography className={styles.contextMenu}>
                {" "}
                <img src={NewforlerIcon} /> 새 폴더
              </Typography>
            ),
            onClick: onNewFolderClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>새로고침</Typography>,
            onClick: onRefreshClick,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>붙여넣기(P)</Typography>,
            onClick: onPasteClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>파일 업로드</Typography>,
            onClick: onUploadClick,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>새로만들기(W)</Typography>,
            children: [
              {
                element: (
                  <Typography className={styles.contextMenu}>
                    <img src={NewforlerIcon} /> 폴더(F)
                  </Typography>
                ),
                onClick: onNewFolderClick,
              },
              {
                divider: true,
              },
              ...templateFiles.map((item) => ({
                element: (
                  <Typography className={styles.contextMenu}>
                    <ContentIcon type={ICON_TYPE.PPT.key} /> {item.uTemplateName}
                  </Typography>
                ),
                onClick: () => onTemplateFileClick(item),
              })),
            ],
          },
        ]}
        {...extra}
      />
    </Fragment>
  );
});

export default EmptyContextMenu;
