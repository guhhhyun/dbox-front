import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Typography } from "@material-ui/core";
import FolderPropertyModalContainer from "views/containers/doc/modals/property/FolderPropertyModalContainer";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import DeleteModalContainer from "views/containers/doc/modals/delete/DeleteModalContainer";
import DocTransferModalContainer from "views/containers/doc/modals/transfer/DocTransferModalContainer";
import MultipleAuthPropertyModalContainer from "views/containers/doc/modals/property/MultipleAuthPropertyModalContainer";
import styles from "./ContextMenu.module.css";
import lockIcon from "assets/imgs/icon-lock.svg";
import { FOL_STATUS } from "constants/code-constants";

console.debug("MultiFDContextMenu.js");

const MultiFDContextMenu = forwardRef(function (
  {
    data,
    onDeleteClick,
    onEditNameClick,
    onFolderPropertyClick,
    onMultipleAuthPropertyClick,
    onDownloadClick,
    onTransferClick,
    onMoveClick,
    onCopyClick,
    ...extra
  },
  ref,
) {
  const deleteRef = useRef(null);
  const folderPropertyRef = useRef(null);
  const multipleAuthPropertyRef = useRef(null);
  const transferRef = useRef(null);

  useImperativeHandle(ref, () => ({
    delete: deleteRef.current,
    folderProperty: folderPropertyRef.current,
    multipleAuthProperty: multipleAuthPropertyRef.current,
    transfer: transferRef.current,
  }));

  return (
    <Fragment>
      <ContextMenu
        menus={[
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>이동(Ctrl+X)</Typography>,
            onClick: onMoveClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>복사(Ctrl+C)</Typography>,
            onClick: onCopyClick,
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
            onClick: onFolderPropertyClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>권한 일괄 변경</Typography>,
            onClick: onMultipleAuthPropertyClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>다운로드</Typography>,
            onClick: onDownloadClick,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>자료이관</Typography>,
            onClick: onTransferClick,
          },
        ]}
        {...extra}
      />
      <DeleteModalContainer ref={deleteRef} />
      <FolderPropertyModalContainer ref={folderPropertyRef} />
      <MultipleAuthPropertyModalContainer ref={multipleAuthPropertyRef} />
      <DocTransferModalContainer ref={transferRef} />
    </Fragment>
  );
});

export default MultiFDContextMenu;
