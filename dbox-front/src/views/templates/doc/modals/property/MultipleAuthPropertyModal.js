import { Fragment } from "react";
import { Checkbox, Divider, FormControlLabel, Typography, Box, makeStyles } from "@material-ui/core";
import LiveAuthTable from "views/templates/doc/modals/property/LiveAuthTable";
import AuthGradeTable from "views/templates/doc/modals/property/AuthGradeTable";
import CloseAuthTable from "views/templates/doc/modals/property/CloseAuthTable";
import StyledTabs from "views/commons/tab/StyledTabs";
import StyledTab from "views/commons/tab/StyledTab";
import TabPanel from "views/commons/tab/TabPanel";
import styles from "./DocPropertyModal.module.css";
import docIcon from "assets/imgs/icon-doc1.svg";

console.debug("DocPropertyModal.js");

const useStyles = makeStyles((theme) => ({
  group: {
    display: "flex",
    verticalAlign: "middle",
    justifyContent: 'space-between'
  },
  title: {
    lineHeight: 2,
    marginRight: theme.spacing(10),
    color: '#00254C',
    fontSize: '13px'
  },
  caption: {
    display:'inline-block',
    marginLeft: theme.spacing(30),
    lineHeight: 2.5,
    textAlign:'right'
  },
  input: {
    backgroundColor: '#ffffff',
    fontSize: '13px',
    borderRadius: '2px',
    height: '30px'
  },
  divider: {
    margin:"14px 0px"
  },
  removePadding: {
    padding: "2px",
  },
  btnDocRoot: {
    padding: "4px",
    textAlign: "left",
    fontSize: "0.775rem"
  },
  mgb10: {
    marginBottom: theme.spacing(1)
  }
}));



export default function DocPropertyModal({ tab, onTabChange, onPreserveClick }) {

  const classes = useStyles();
  return (
    <Fragment>
      <StyledTabs value={tab} onChange={onTabChange} className={styles.tabButton}>
        <StyledTab label="권한" />
        <Typography variant="caption" color="secondary" className={classes.caption}> 폴더 : 잠금해제</Typography>
      </StyledTabs>
      <Box className={styles.tabContents}>
        <TabPanel value={tab} index={0}>
          <Box className={classes.group} style={{justifyContent: 'start'}}>
            <img src={docIcon} style={{ width: "28px", marginRight:"10px"}} />
            <Typography variant="body2" style={{lineHeight:'2.5'}}>폴더 <span>3</span>, 파일 <span>15</span></Typography>
          </Box>
          <Divider className={classes.divider}/>
          <Box>
            <Typography variant="subtitle2" className={[classes.title, classes.mgb10]}>Live 권한 설정</Typography>
            <LiveAuthTable />
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Box className={classes.group}>
              <Typography variant="subtitle2" className={classes.title}>Closed 권한 설정</Typography>
            </Box>
            <Box style={{marginBottom:'6px'}}>
              <Typography variant="overline">보안등급</Typography>
              <AuthGradeTable />
            </Box>
            <Box>
              <CloseAuthTable />
            </Box> 
            <Box>
              <FormControlLabel label="하위 폴더에도 적용" control={<Checkbox color="primary" checked={false} size="small"/>} />
              <FormControlLabel label="하위 문서에도 적용" control={<Checkbox color="primary" checked={false} size="small"/>} />
            </Box>
            <Box>
              <Typography variant="overline">※ 폴더에 적용되는 권한 및 등급</Typography>
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Fragment>
  );
}