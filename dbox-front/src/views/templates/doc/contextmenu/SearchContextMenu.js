import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Typography } from "@material-ui/core";
import DocAuthRequestModalContainer from "views/containers/doc/modals/auth/DocAuthRequestModalContainer";
import ContextMenu from "views/commons/contextmenu/ContextMenu";
import styles from "./ContextMenu.module.css";


console.debug("SearchContextMenu.js");

const SearchContextMenu = forwardRef(function ({ data, onAuthRequestClick, ...extra }, ref) {
  const authRequestRef = useRef(null);

  useImperativeHandle(ref, () => ({
    authRequest: authRequestRef.current,
  }));

  return (
    <Fragment>
      <ContextMenu
        menus={[
          {
            element: <Typography className={styles.contextMenu}>권한 신청</Typography>,
            onClick: onAuthRequestClick,
          },
        ]}
        {...extra}
      />
      <DocAuthRequestModalContainer ref={authRequestRef} />
    </Fragment>
  );
});

export default SearchContextMenu;
