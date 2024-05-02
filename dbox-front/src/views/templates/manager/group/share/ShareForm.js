import { Fragment, forwardRef } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, withStyles } from "@material-ui/core";
import styles from "./Share.module.css";
import { MenuOpen } from "@material-ui/icons";
import background from "assets/imgs/tab_w200.svg";
import SearchBlindFormContainer from "views/containers/manager/group/share/searchblind/SearchBlindFormContainer";
import ShareGroupAuthFormContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthFormContainer";

console.debug("ShareForm.js");

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
 Styling - Selected Tab/ 
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

const ShareForm = ({ value, handleChange, result }) => {
  return (
    <Fragment>
      <Typography variant="h6" className={styles.title}>
        <MenuOpen /> 공유(블라인드, 공유 그룹)
      </Typography>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          {result ? result.map((item, index) => <StyledTab label={item.code.uCodeName1} />) : null}
        </StyledTabs>
        <div className={styles.tabContents}>
          {result
            ? result.map((item, index) => (
                <TabPanel value={value} index={index}>
                  {item.code.uCodeName3 === "SearchBlindFormContainer" ? <SearchBlindFormContainer /> : null}
                  {item.code.uCodeName3 === "ShareGroupAuthFormContainer" ? <ShareGroupAuthFormContainer /> : null}
                </TabPanel>
              ))
            : null}
        </div>
      </div>
    </Fragment>
  );
};

export default ShareForm;
