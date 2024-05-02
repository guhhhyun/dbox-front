import { Fragment } from "react";
import { Divider, TextField, Typography, Box, makeStyles } from "@material-ui/core";
import AuthGradeTable from "views/templates/doc/modals/property/AuthGradeTable";
import LiveAuthTable from "views/templates/doc/modals/property/LiveAuthTable";
import StyledTabs from "views/commons/tab/StyledTabs";
import StyledTab from "views/commons/tab/StyledTab";
import TabPanel from "views/commons/tab/TabPanel";
import styles from "./FolderPropertyModal.module.css";
import CloseAuthTable from "./CloseAuthTable";

console.debug("FolderPropertyModal.js");

const useStyles = makeStyles((theme) => ({
  group: {
    display: "flex",
    verticalAlign: "middle",
  },
  title: {
    marginRight: theme.spacing(10),
    lineHeight: 2,
    color: "#00254C",
    fontSize: "13px",
  },
  caption: {
    display: "inline-block",
    marginLeft: theme.spacing(28),
    lineHeight: 2.5,
    textAlign: "right",
  },
  input: {
    backgroundColor: "#ffffff",
    fontSize: "13px",
    borderRadius: "2px",
    height: "30px",
  },
  divider: {
    margin: "14px 0px",
  },
  mgb10: {
    marginBottom: theme.spacing(1),
  },
}));

export default function FolderPropertyModal({ property, onPropertyChange, onAuthClick, onSecLevelChange }) {
  const classes = useStyles();

  return (
    <Fragment>
      <StyledTabs value={0} className={styles.tabButton}>
        <StyledTab label="일반" />
        <Typography variant="caption" color="secondary" className={classes.caption}>
          {" "}
          폴더상태 : {property.folStatusName}
        </Typography>
      </StyledTabs>
      <Box className={styles.tabContents}>
        <TabPanel value={0} index={0}>
          <Box className={classes.group}>
            <Typography variant="subtitle2" color="primary" className={classes.title}>
              이름
            </Typography>
            <TextField
              value={property.uFolName}
              onChange={onPropertyChange}
              name="uFolName"
              variant="outlined"
              InputProps={{ className: classes.input }}
              style={{ flex: 1 }}
            ></TextField>
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Typography variant="subtitle2" className={`${classes.title} ${classes.mgb10}`}>
              폴더 및 문서 Live 권한 설정
            </Typography>
            <LiveAuthTable liveAuthBases={property.liveAuthBases} liveAuthShare={property.liveAuthShares} onAuthClick={onAuthClick} />
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Typography variant="subtitle2" className={classes.title}>
              문서 Closed 권한 설정
            </Typography>
            <Typography variant="overline"> 보안등급</Typography>
            <AuthGradeTable secLevel={property.uSecLevel} onSecLevelChange={onSecLevelChange} />
            <CloseAuthTable closedAuthBases={property.closedAuthBases} onAuthClick={onAuthClick} />
          </Box>
        </TabPanel>
      </Box>
    </Fragment>
  );
}
