import { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ResizableBox } from "react-resizable";
import DocSidebarContainer from "views/containers/doc/layout/DocSidebarContainer";
import DocHeaderContainer from "views/containers/doc/layout/DocHeaderContainer";
import DocGridContainer from "views/containers/doc/grid/DocGridContainer";
import { PAGE_KEY } from "constants/code-constants";
import styles from "./DocMain.module.css";
import { ContextMenuProvider } from "views/containers/doc/contextmenu/ContextMenuProvider";

console.debug("DocMain.js");

const DocMain = forwardRef(function ({ divided, resizeHeight, onResize, onPrimarySearchClick, onSecondarySearchClick }, ref) {
  const fullHeight = window.innerHeight;

  const primaryRef = useRef(null);
  const primaryGridRef = useRef(null);
  const secondaryGridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    primaryGrid: primaryGridRef.current,
    secondaryGrid: secondaryGridRef.current,
  }));

  return (
    <Fragment>
      <div ref={primaryRef} className={`${styles.content} ${styles.defaultContent}`}>
        <ContextMenuProvider pageKey={PAGE_KEY.PRIMARY} gridRef={primaryGridRef}>
          <DocSidebarContainer pageKey={PAGE_KEY.PRIMARY} />
          <div className={styles.main}>
            <DocHeaderContainer onSearchClick={onPrimarySearchClick} pageKey={PAGE_KEY.PRIMARY} />
            <div className={styles.contentBox}>
              <DocGridContainer ref={primaryGridRef} height={divided ? fullHeight - (resizeHeight + 100) : fullHeight - 100} pageKey={PAGE_KEY.PRIMARY} />
            </div>
          </div>
        </ContextMenuProvider>
      </div>
      {divided && (
        <ResizableBox
          height={resizeHeight}
          axis={"y"}
          handle={<div className={styles.resizerX} />}
          resizeHandles={["n"]}
          style={{ overflow: "hidden" }}
          onResize={onResize}
          style={{padding:"0px"}}
        >
          <div className={styles.content} style={{ height: resizeHeight }}>
            <ContextMenuProvider pageKey={PAGE_KEY.SECONDARY} gridRef={secondaryGridRef}>
              <DocSidebarContainer pageKey={PAGE_KEY.SECONDARY} />
              <div className={styles.main}>
                <DocHeaderContainer onSearchClick={onSecondarySearchClick} pageKey={PAGE_KEY.SECONDARY} divided />
                <div className={styles.contentBox}>
                  <DocGridContainer ref={secondaryGridRef} height={resizeHeight - 100} pageKey={PAGE_KEY.SECONDARY} />
                </div>
              </div>
            </ContextMenuProvider>
          </div>
        </ResizableBox>
      )}
    </Fragment>
  );
});

export default DocMain;
