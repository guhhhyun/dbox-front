import { Fragment } from "react";
import { Checkbox, Divider, FormControlLabel, TextField, Typography, Box, makeStyles, IconButton } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import AuthGradeTable from "views/templates/doc/modals/property/AuthGradeTable";
import OwnJoinAuthTable from "views/templates/doc/modals/property/OwnJoinAuthTable";
import StyledTabs from "views/commons/tab/StyledTabs";
import StyledTab from "views/commons/tab/StyledTab";
import TabPanel from "views/commons/tab/TabPanel";
import styles from "./ProjectPropertyModal.module.css";
import { DatePicker } from "@material-ui/pickers";

console.debug("ProjectPropertyModal.js");

const useStyles = makeStyles((theme) => ({
  group: {
    display: "flex",
    verticalAlign: "middle",
    justifyContent: "space-between",
    marginTop:"5px"
  },
  title: {
    lineHeight: 2,
    marginRight: theme.spacing(10),
    color: "#00254C",
    fontSize: "13px",
  },
  caption: {
    display: "inline-block",
    marginLeft: theme.spacing(30),
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
  removePadding: {
    padding: "2px",
  },
  btnDocRoot: {
    padding: "4px",
    textAlign: "left",
    fontSize: "0.775rem",
  },
  mgb10: {
    marginBottom: theme.spacing(1),
  },
}));

export default function ProjectPropertyModal({
  name,
  onNameChange,
  secLevel,
  onSecLevelChange,
  ownTarget,
  onOwnClick,
  joinReadTargets,
  onJoinReadClick,
  joinDelTargets,
  onJoinDelClick,
  startYear,
  onStartYearChange,
  chiefName,
  onChiefClick,
  finishYn,
  listOpenYn,
  onListOpenYnChange,
  tab,
  onTabChange,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <StyledTabs value={tab} onChange={onTabChange} className={styles.tabButton}>
        <StyledTab label="일반" />
      </StyledTabs>
      <Box className={styles.tabContents}>
        <TabPanel value={tab} index={0}>
          <Box className={classes.group}>
            <Typography variant="subtitle2" color="primary" className={classes.title}>
              이름
            </Typography>
            <TextField value={name} onChange={onNameChange} variant="outlined" InputProps={{ className: classes.input }} style={{ flex: 1 }}></TextField>
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Typography variant="subtitle2" className={`${classes.group} ${classes.mgb10}`}>
              보안등급
            </Typography>
            <AuthGradeTable secLevel={secLevel} onSecLevelChange={onSecLevelChange} />
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Typography variant="subtitle2" className={`${classes.group}, ${classes.mgb10}`}>
              권한설정
            </Typography>
            <OwnJoinAuthTable
              ownTarget={ownTarget}
              onOwnClick={onOwnClick}
              joinReadTargets={joinReadTargets}
              onJoinReadClick={onJoinReadClick}
              joinDelTargets={joinDelTargets}
              onJoinDelClick={onJoinDelClick}
            />
          </Box>
          <Box className={classes.group}>
            <Typography variant="subtitle2" color="primary" className={classes.title}>
              시행년도
            </Typography>
            <TextField
              value={startYear}
              onChange={onStartYearChange}
              type="number"
              variant="outlined"
              InputProps={{ className: classes.input }}
              style={{ flex: 1 }}
            ></TextField>
          </Box>
          <Box className={classes.group}>
            <Typography variant="subtitle2" color="primary" className={classes.title}>
              책임자
            </Typography>
            <Typography variant="body2">{chiefName} <IconButton size="small">
              <AddCircle color="primary" fontSize="small" onClick={onChiefClick} />
            </IconButton>
            </Typography>
          </Box>
          <Box className={classes.group}>
            <Typography variant="subtitle2" color="primary" className={classes.title}>
              완료여부
            </Typography>
            <Typography variant="body2">{finishYn}</Typography>
          </Box>
          <Box>
            <FormControlLabel control={<Checkbox checked={listOpenYn} onChange={onListOpenYnChange} />} label="목록보기 활성화" />
          </Box>
        </TabPanel>
      </Box>
    </Fragment>
  );
}
