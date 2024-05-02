import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Typography } from "@material-ui/core";
import DocTakeoutModalContainer from "views/containers/doc/modals/drm/DocTakeoutModalContainer";
import DocPropertyModalContainer from "views/containers/doc/modals/property/DocPropertyModalContainer";
import MultipleAuthPropertyModalContainer from "views/containers/doc/modals/property/MultipleAuthPropertyModalContainer";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import DeleteModalContainer from "views/containers/doc/modals/delete/DeleteModalContainer";
import DocTransferModalContainer from "views/containers/doc/modals/transfer/DocTransferModalContainer";
import styles from "./ContextMenu.module.css";
import copyLinkIcon from "assets/imgs/icon-copyLink.svg";
import { CATEGORY_FOLDER } from "constants/code-constants";

console.debug("DocContextMenu.js");

const DocContextMenu = forwardRef(function (
  {
    data,
    nodeId,
    onUrlCopyClick,
    onTakeoutClick,
    onDocPropertyClick,
    onDeleteClick,
    onEditNameClick,
    onMultipleAuthPropertyClick,
    onDownloadClick,
    onTransferClick,
    onMoveClick,
    onCopyClick,
    ...extra
  },
  ref,
) {
  const isTakeout = CATEGORY_FOLDER.TAKEOUT.key === nodeId?true:false; 
  const deleteRef = useRef(null);
  const takeoutRef = useRef(null);
  const docPropertyRef = useRef(null);
  const multipleAuthPropertyRef = useRef(null);
  const transferRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    delete: deleteRef.current,
    takeout: takeoutRef.current,
    docProperty: docPropertyRef.current,
    multipleAuthProperty: multipleAuthPropertyRef.current,
    transfer: transferRef.current,
  }));

  return (
    <Fragment>
      <ContextMenu
        menus={[
          {
            element: (
              <Typography className={styles.contextMenu}>
                <img src={copyLinkIcon} /> URL Copy
              </Typography>
            ),
            onClick: onUrlCopyClick,
            disabled: isTakeout,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>복호화반출 요청</Typography>,
            onClick: onTakeoutClick,
            disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>완료하기(Closed)</Typography>,
            onClick: () => {
              alert("완료하기(Closed)");
            },
            disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>Live 전환</Typography>,
            disabled: isTakeout,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>이동(Ctrl+X)</Typography>,
            onClick: onMoveClick,
            disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>복사(Ctrl+C)</Typography>,
            onClick: onCopyClick,
            disabled: isTakeout,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>삭제(D)</Typography>,
            onClick: onDeleteClick,
            disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>이름바꾸기(M)</Typography>,
            onClick: onEditNameClick,
            disabled: isTakeout,
          },
          {
            divider: true,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>속성</Typography>,
            onClick: onDocPropertyClick,
            disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>권한 일괄 변경</Typography>,
            onClick: onMultipleAuthPropertyClick,
            disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>다운로드</Typography>,
            onClick: onDownloadClick,
            // disabled: isTakeout,
          },
          {
            element: <Typography className={`${styles.contextMenu} ${styles.contextMenuPdr}`}>자료이관</Typography>,
            onClick: onTransferClick,
            disabled: isTakeout,
          },
        ]}
        {...extra}
      />
      <DeleteModalContainer ref={deleteRef} />
      <DocTakeoutModalContainer ref={takeoutRef} />
      <DocPropertyModalContainer ref={docPropertyRef} />
      <MultipleAuthPropertyModalContainer ref={multipleAuthPropertyRef} />
      <DocTransferModalContainer ref={transferRef} />
    </Fragment>
  );
});

export default DocContextMenu;
