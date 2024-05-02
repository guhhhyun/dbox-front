import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, withStyles } from "@material-ui/core";
import AuthorityHistory from "./AuthorityHistory";
import styles from "./AuthorityForm.module.css";
import background from "assets/imgs/tab_w200.svg";

console.log("AuthorityForm.js");

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
      {value === index && (
        <Typography component="div">{children}</Typography>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function AuthorityForm() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          <StyledTab label="업무역할 별 권한 관리" />
          <StyledTab label="부서문서관리자 관리" />
          <StyledTab label="이력 조회 권한 관리" />
          <StyledTab label="알람/통보 방식 관리" />
        </StyledTabs>
        <div className={styles.tabContents}>
          <TabPanel value={value} index={0}>
            <Box p={3}>
              특이사용자 기준 설정 PAGE
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box p={3}>
              부서문서관리자 관리 PAGE
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box p={3}>
              <AuthorityHistory/>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box p={3}>알람/통보 방식 관리 PAGE</Box>
          </TabPanel>
        </div>
      </div>
    </Fragment >
  );
}
