import { Fragment } from "react";
import { Tabs, Tab, Divider, TextField, Typography, Grid, Box, FormControlLabel, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, withStyles, RadioGroup, Radio } from "@material-ui/core";
import TabPanel from "views/commons/tab/TabPanel";
import styles from "./ExternalStorageModal.module.css";
import background from "assets/imgs/tab_w200.svg";
import { CheckBox, CheckBoxOutlineBlank, List }  from '@material-ui/icons';
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  group: {
    display: "flex",
    float: "right",
    marginBottom:"10px"
  },
  title: {
    marginRight: theme.spacing(10),
    lineHeight: 2,
    color: '#00254C',
    fontSize: '13px'
  },
  divider: {
    margin: "14px 0px"
  },
  mgb10: {
    marginBottom: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px"
  },
  input: {
    width: '150px',
    marginTop: '2px'
  },
  pd2: {
    padding:'6px'
  }

}));


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
    width:"200px",
    minHeight: "50px",
    paddingTop: "10px",
    "& > span": {
      maxWidth: "100%",
      width: "100%",
      background: `url(${background}) -12px -7px`,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export default function ExternalStorageModal({ 
  data1, data2, approveData,
  user,
  reqstName,
  apprvName,
  tab, onTabChange, 
  onChange, onChange2, 
  onRequestUseUsb, 
  onApproveUseUsb, 
  onRejectUseUsb, 
  onAllChecked,
  onChangeForCheckbox 
  }) {
  
  const classes = useStyles();
  return (
    <Fragment>
      {/* <br/>data1 : {JSON.stringify(data1)} */}
      {/* <br/>data1.uAllowUsb : {data1.uAllowUsb?"true":"false"} */}
      <StyledTabs value={tab} onChange={onTabChange} className={styles.tabButton}>
        <StyledTab label="외부저장매체 승인요청" />
        <StyledTab label="외부저장매체 승인처리" />
      </StyledTabs>
      {/*외부저장매체 승인요청*/}
      <Box p={2} className={styles.tabContents}>
        <TabPanel value={tab} index={0}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="subtitle2">요청 시간</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField variant="outlined" value={format(new Date(), "yyyy.MM.dd")} inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}}></TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">요청자</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField variant="outlined" inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}} value={reqstName}></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="subtitle2">요청 사항</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField variant="outlined" value={"승인완료 후 적용"} inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}}></TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">승인자</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField variant="outlined" inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}} value={apprvName}></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} pt={2} pb={2} p={2} className={styles.checkBox} >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle2" className={styles.chkTitle}>이동식 드라이브</Typography>
              </Grid>
              <Grid item xs={9}>
                <FormControlLabel control={<Checkbox icon={<CheckBoxOutlineBlank fontSize="small"/>} 
                checkedIcon={<CheckBox fontSize="small" color="primary"/>} onChange={onChange} name="uAllowUsb" checked={data1.uAllowUsb}/>} label="허용" />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle2" className={styles.chkTitle}>CD/DVD</Typography>
              </Grid>
              <Grid item xs={9} spacing={2}>
                <FormControlLabel control={<Checkbox icon={<CheckBoxOutlineBlank fontSize="small" />} checkedIcon={<CheckBox fontSize="small" color="primary" />} />} onChange={onChange} name="uAllowCd" label="허용" checked={data1.uAllowCd}/>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3} >
                <Typography variant="subtitle2" className={styles.chkTitle}>사용시간</Typography>
              </Grid>
              <Grid item xs={6} >
                <RadioGroup onChange={onChange} name="uUseTime" defaultValue="1" row value={data1.uUseTime}>
                  <Grid item xs={3}>
                    <FormControlLabel control={<Radio size="small" color="primary" />} value="1" label="1시간"/>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel control={<Radio size="small" color="primary" />} value="24" label="1일"/>
                  </Grid>
                </RadioGroup>
              </Grid>
              <Grid container style={{paddingBottom: "10px", paddingLeft: "10px"}}>
                <Grid item xs={12}>
                  <Typography variant="caption">※설정된 기간 외에는 「정보처리의뢰서」를 통해 신청가능</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>        
          <Divider className={classes.divider}/>
          <Box>
            <Typography variant="subtitle2">승인요청 사유</Typography>
            <TextField fullWidth variant="outlined" style={{marginTop:'10px'}} onChange={onChange} name="uReqReason" value={data1.uReqReason}></TextField>
          </Box>

          <Button color="primary" onClick={onRequestUseUsb} className={classes.btnAction}>
            승인요청
          </Button>

        </TabPanel>
        <TabPanel value={tab} index={1}>
        {/* approveData : {JSON.stringify(approveData)} */}
        {/* data2 : {JSON.stringify(data2)} */}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Typography variant="subtitle2">대상</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField variant="outlined" inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}} value={user.comOrgNm}></TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">본부(실)</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField variant="outlined" inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}} value={"-"}></TextField>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle2">부서</Typography>
              </Grid>
              <Grid item xs={3}> 
                <TextField variant="outlined" inputProps={{ readOnly: true, style:{backgroundColor:'lightgray'}}} value={user.orgNm}></TextField>
              </Grid>
            </Grid>
          </Box>
          <Divider className={classes.divider}/>
          <Box>
            <Grid container>
              <Grid item xs={7}>
                <Typography className={styles.title}><List /> 외부저장매체 사용요청 List</Typography>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.group}>
                  <Button onClick={onApproveUseUsb} variant="contained" color="primary" size="small" disableElevation className={classes.margin}>승인</Button>
                  <Button onClick={onRejectUseUsb} variant="contained" color="secondary" size="small" disableElevation className={classes.margin}>반려</Button>
                </div>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small" >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Checkbox color="primary" size="small" onChange={onAllChecked}
                        checked={approveData.every(item=>item.checked)?true:false} />
                      </TableCell>
                      <TableCell align="center" >신청자</TableCell>
                      <TableCell align="center" >사용기기</TableCell>
                      <TableCell align="center" >사용기간</TableCell>
                      <TableCell align="center" >요청사유</TableCell>
                      <TableCell align="center" >신청일자</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
          {approveData.map((item, index) => (
            <TableRow>
            <TableCell align="center">
              <Checkbox defaultChecked color="primary" size="small" checked={item.checked?true:false} onChange={(e)=>{
                e.target.index = index;
                onChangeForCheckbox(e);
              }}/>
            </TableCell>
            <TableCell align="center">
              {item.uReqUserName} 차장
            </TableCell>
            <TableCell align="center">
            {item.uAllowCd && "CD / DVD"}
            {item.uAllowCd && item.uAllowUsb && ", "}
            {item.uAllowUsb && "이동식 드라이브"}
            </TableCell>
            <TableCell align="center">
            {item.uUseTime>=24?item.uUseTime/24:item.uUseTime}{item.uUseTime>24?"일":"시간"}
            </TableCell>
            <TableCell align="left">
            {item.uReqReason}
            </TableCell>
            <TableCell align="center">
            {item.uReqDate}
            </TableCell>
          </TableRow>
          ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Box>
        </TabPanel>
      </Box>
    </Fragment>
  );
}
