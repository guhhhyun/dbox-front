import { Fragment } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, withStyles } from "@material-ui/core";
import GradeRedefinitionFormContainer from "views/containers/manager/group/grade/redefinition/GradeRedefinitionFormContainer";
import GradePreservationContainer from "views/containers/manager/group/grade/preservation/GradePreservationFormContainer";
import styles from "./Grade.module.css";
import background from "assets/imgs/tab_w200.svg";
import { MenuOpen } from "@material-ui/icons";

console.debug("GradeForm.js");

/**
 * Styling - Tab Button
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
 * Styling - Selected Tab
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
      background: `url(${background}) -11px -7px`,
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

export default function GradeForm({ value, handleChange, result }) {
  return (
    <Fragment>
      <Typography variant="h6" className={styles.title}>
        <MenuOpen /> 보안 등급
      </Typography>
      <div className={styles.tabContainer}>
        <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
          {result ? result.map((item, index) => <StyledTab label={item.code.uCodeName1} style={{ width: "200px" }} />) : null}
        </StyledTabs>
        <div className={styles.tabContents}>
          {result
            ? result.map((item, index) => (
                <TabPanel value={value} index={index}>
                  <Box p={3}>
                    {item.code.uCodeName3 === "GradeRedefinitionFormContainer" ? <GradeRedefinitionFormContainer /> : null}
                    {item.code.uCodeName3 === "GradePreservationContainer" ? <GradePreservationContainer /> : null}
                  </Box>
                </TabPanel>
              ))
            : null}
        </div>
      </div>
    </Fragment>
  );
}
