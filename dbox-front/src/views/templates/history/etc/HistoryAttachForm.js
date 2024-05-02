import { Fragment, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, withStyles } from "@material-ui/core";
import styles from "./HistoryAttachForm.module.css";
import background from "assets/imgs/tab_w200.svg";
import HistoryMessengerFormContainer from "views/containers/history/etc/HistoryMessengerFormContainer"
import HistoryExternalFormContainer from "views/containers/history/etc/HistoryExternalFormContainer"

console.log("HistoryAttachForm.js");

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

const HistoryAttachForm = forwardRef(({onSearchCompany, getData}, ref) => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          <StyledTab label="외부 메신저 연동 이력" />
          <StyledTab label="외부 사이트 파일 반출 이력" />
        </StyledTabs>
        <div className={styles.tabContents}>
          <TabPanel value={value} index={0}>
            <Box p={3}>
              <HistoryMessengerFormContainer />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box p={3}>
              <HistoryExternalFormContainer />
            </Box>
          </TabPanel>
        </div>
      </div>
    </Fragment>
   
  );
});
 
export default HistoryAttachForm;