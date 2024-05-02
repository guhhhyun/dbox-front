import { Fragment } from "react";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, IconButton, FormControl, Select, MenuItem, Box, withStyles } from "@material-ui/core";
import { UnfoldMore } from "@material-ui/icons";
import DeptTreeContainer from "views/containers/doc/tree/DeptTreeContainer";
import OrgTreeContainer from "views/containers/doc/tree/OrgTreeContainer";
import { WIDTH_NARROW } from "views/containers/doc/layout/DocSidebarContainer";
import { PR_STATUSES, TREE_PROJECT, TREE_RESEARCH, TREE_TYPES } from "stores/doc";
import { SIDEBAR_TAB } from "constants/code-constants";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";
import styles from "./DocSidebar.module.css";
import background from "assets/imgs/tab.svg";
import { ResizableBox } from "react-resizable";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

console.debug("DocSidebar.js");

/**
 * Styling - Tab Button
 */
const StyledTab = withStyles((theme) => ({
  root: {
    minWidth: "20px",
    paddingTop: "20px",
    paddingLeft: "58px",
    zIndex: "1",
    color: "#ffffff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    "&.Mui-selected > span": {
      opacity: 1,
      color: "#00254c",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

/**
 * Styling - Selected Tab
 */
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    width: "132px !important",
    backgroundColor: "transparent",
    minHeight: "50px",
    paddingTop: "10px",
    "& > span": {
      maxWidth: "100%",
      width: "100%",
      background: `url(${background}) 0px -9px no-repeat`,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

/**
 * Styling - 조직 input
 */
const StyledFormControl = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        backgroundColor: "#f7f9fc",
        color: "#19457A",
        padding: "8.5px 14px",
        paddingRight: "32px",
      },
      "& fieldset": {
        borderColor: "#ffffff",
      },
      "&:hover fieldset": {
        borderColor: "#ffffff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffffff",
      },
    },
  },
}))(FormControl);

const TABS = ["부 서", "조 직"];
export const [TAB_DEPT, TAB_ORG] = TABS.keys();

export default function DocSidebar({
  pageKey,
  tab,
  tabIndex,
  onTabChange,
  treeType,
  onTreeTypeChange,
  prStatus,
  onPrStatusChange,
  showResearch,
  resizeWidth,
  onResize,
}) {
  const [resizableBoxHeight, setResizableBoxHeight] = useState(0);

  const primaryRef = useRef(null);

  useEffect(() => {
    setResizableBoxHeight(primaryRef.current?.clientHeight);
  }, [primaryRef]);
  
  const tabs = Object.values(SIDEBAR_TAB);
  return (
    <Box ref={primaryRef} className={styles.tabContainer}>
      <ResizableBox
        width={resizeWidth}
        height={resizableBoxHeight}
        minConstraints={[240, resizableBoxHeight]}
        maxConstraints={[1000, resizableBoxHeight]}
        axis={"x"}
        handle={
          <div>
            <IconButton disableRipple size="small" color="inherit" className={styles.btnUnfold} onClick={() => {}}>
              <UnfoldMore fontSize="inherit" />
            </IconButton>
          </div>
        }
        resizeHandles={["e"]}
        style={{ overflow: "hidden" }}
        onResize={onResize}
      >
        <Fragment>
          <StyledTabs value={tab} onChange={onTabChange}>
            {tabs.map((item) => (
              <StyledTab key={item.key} label={item.desc} value={item.key} />
            ))}
          </StyledTabs>
          <SwipeableViews index={tabIndex} className={styles.swiperbleViews} style={{ width: resizeWidth, height: resizableBoxHeight }}>
            <Box p={2} className={styles.depTreeBox}>
              <DeptTreeContainer pageKey={pageKey} />
            </Box>
            <Box pb={2} className={styles.tabContents}>
              <Box p={2} className={styles.selectBox}>
                <StyledFormControl variant="outlined" className={styles.selectBoxTreeType}>
                  <Select value={treeType} onChange={onTreeTypeChange}>
                    {TREE_TYPES.map((item, index) => (
                      (index !== TREE_RESEARCH || showResearch) && <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
                {[TREE_PROJECT, TREE_RESEARCH].includes(treeType) && (
                  <StyledFormControl variant="outlined" className={styles.selectBoxProjectStatus}>
                    <Select value={prStatus} onChange={onPrStatusChange}>
                      {PR_STATUSES.map((item, index) => (
                        <MenuItem key={index} value={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                )}
              </Box>
              <Box p={2} pt={0} className={styles.projectBox}>
                <OrgTreeContainer pageKey={pageKey} />
              </Box>
            </Box>
          </SwipeableViews>
        </Fragment>
      </ResizableBox>
    </Box>
  );
}
