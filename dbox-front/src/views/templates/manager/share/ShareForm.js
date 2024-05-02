import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Grid, withStyles } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShareGroupAuthGridContainer from "views/containers/manager/share/shareGroupAuth/ShareGroupAuthGridContainer";
import ShareGroupAuthDeptGridContainer from "views/containers/manager/share/shareGroupAuth/ShareGroupAuthDeptGridContainer";
import styles from "./ShareForm.module.css";
import background from "assets/imgs/tab_w200.svg";
import ShareFormSearchButtonContainer from "views/containers/manager/share/ShareFormSearchButtonContainer";
import ShareFormModalButtonContainer from "views/containers/manager/share/ShareFormModalButtonContainer";

console.log("ShareForm.js");

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
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function ShareForm(props) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          <StyledTab label="검색 블라인드 설정" />
          <StyledTab label="조직 공유그룹 설정" />
        </StyledTabs>
        <div className={styles.tabContents}>
          <TabPanel value={value} index={0}>
            검색 블라인드 설정 PAGE
          </TabPanel>
          <TabPanel value={value} index={1}>
            <h3 className={styles.h3}>
              <ListAltIcon />
              공유그룹 권한 관리
            </h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ShareFormSearchButtonContainer />
              </Grid>
              <Grid item xs={6}>
                <ShareFormModalButtonContainer />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className={styles.gridBox}>
                  <ShareGroupAuthGridContainer />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={styles.gridBox}>
                  <ShareGroupAuthDeptGridContainer />
                </div>
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      </div>
    </Fragment>
  );
}
