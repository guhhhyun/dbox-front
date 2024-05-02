import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, withStyles } from "@material-ui/core";
import styles from "./ManageAuth.module.css";
import background from "assets/imgs/tab_w200.svg";

import RoleAuthFormContainer from "views/containers/manager/group/manageauth/roleauth/RoleAuthFormContainer";
import DeptManagerFormContainer from "views/containers/manager/group/manageauth/deptmanager/DeptManagerFormContainer";
import HistoryAuthFormContainer from "views/containers/manager/group/manageauth/historyauth/HistoryAuthFormContainer";
import AlarmFormContainer from "views/containers/manager/group/manageauth/alarm/AlarmFormContainer";
import RoleManagementFormContainer from "views/containers/manager/group/manageauth/rolemanagement/RoleManagementFormContainer";

console.log("ManageAuthForm.js");

/**
 Styling - Tab Button
 */
const StyledTab = withStyles((theme) => ({
  root: {
    paddingTop: "20px",
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

export default function ManageAuthForm({ result }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          {result ? result.map((item, index) => <StyledTab label={item.code.uCodeName1} />) : null}
        </StyledTabs>
        <div className={styles.tabContents}>
          {result
            ? result.map((item, index) => (
                <TabPanel value={value} index={index}>
                  <Box p={3}>
                    {item.code.uCodeName3 === "RoleAuthFormContainer" ? <RoleAuthFormContainer /> : null}
                    {item.code.uCodeName3 === "RoleManagementFormContainer" ? <RoleManagementFormContainer /> : null}
                    {item.code.uCodeName3 === "DeptManagerFormContainer" ? <DeptManagerFormContainer /> : null}
                    {item.code.uCodeName3 === "HistoryAuthFormContainer" ? <HistoryAuthFormContainer /> : null}
                    {item.code.uCodeName3 === "AlarmFormContainer" ? <AlarmFormContainer /> : null}
                  </Box>
                </TabPanel>
              ))
            : null}
        </div>
      </div>
    </Fragment>
  );
}
