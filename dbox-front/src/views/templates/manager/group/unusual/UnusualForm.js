import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, withStyles } from "@material-ui/core";
import styles from "./Unusual.module.css";
import background from "assets/imgs/tab_w200.svg";
import UnusualStandardFormContainer from "views/containers/manager/group/unusual/unusualstandard/UnusualStandardFormContainer";
import ManualLockFormContainer from "views/containers/manager/group/unusual/manuallock/ManualLockFormContainer";
import LockManageFormContainer from "views/containers/manager/group/unusual/lockmanage/LockManageFormContainer";
import UnlockHistoryFormContainer from "views/containers/manager/group/unusual/unlockhistory/UnlockHistoryFormContainer";
import UnusualStatsFormContainer from "views/containers/manager/group/unusual/unusualstats/UnusualStatsFormContainer";

import { MenuOpen } from "@material-ui/icons";

console.debug("UnusualForm.js");

/**
 Styling - Tab Button
 */
const StyledTab = withStyles((theme) => ({
  root: {
    paddingTop: "20px",
    zIndex: "1",
    color: "#00254c",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    "&.Mui-selected > span": {
      opacity: 1,
      color: "#00254c",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

/**
 Styling - Selected Tab
 */
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    backgroundColor: "transparent",
    minHeight: "50px",
    paddingTop: "10px",
    "& > span": {
      maxWidth: "100%",
      width: "100%",
      background: `url(${background}) -12px -7px`,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Typography component="div">{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function UnusualForm({ result }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Typography variant="h6" className={styles.title}>
        <MenuOpen /> 특이사용자 관리
      </Typography>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          {result ? result.map((item, index) => <StyledTab label={item.code.uCodeName1} />) : null}
        </StyledTabs>
        <div className={styles.tabContents}>
          {result
            ? result.map((item, index) => (
                <TabPanel value={value} index={index}>
                  <Box p={3}>
                    {item.code.uCodeName3 === "UnusualStandardFormContainer" ? <UnusualStandardFormContainer /> : null}
                    {item.code.uCodeName3 === "ManualLockFormContainer" ? <ManualLockFormContainer /> : null}
                    {item.code.uCodeName3 === "LockManageFormContainer" ? <LockManageFormContainer /> : null}
                    {item.code.uCodeName3 === "UnlockHistoryFormContainer" ? <UnlockHistoryFormContainer /> : null}
                    {item.code.uCodeName3 === "UnusualStatsFormContainer" ? <UnusualStatsFormContainer /> : null}
                  </Box>
                </TabPanel>
              ))
            : null}
        </div>
      </div>
    </Fragment>
  );
}
