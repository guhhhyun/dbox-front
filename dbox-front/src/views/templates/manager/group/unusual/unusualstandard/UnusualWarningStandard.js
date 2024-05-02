import React, { Fragment, useState, forwardRef } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField,  Grid, FormControl, InputLabel, Select, Button, Typography, Divider, Box, makeStyles, withStyles } from "@material-ui/core";
import { ListAlt, Label} from "@material-ui/icons";
import DeptTreeContainer from "views/containers/manager/common/DeptTreeContainer";
import styles from "./UnusualStandard.module.css";


console.debug("UnusualWarningStandard.js");


const StyledFormControl = withStyles((theme) => ({
  root: {
    width: '150px',
    marginRight: theme.spacing(1)
  },
}))(FormControl);

const StyledSelect = withStyles((theme) => ({
  root: {
    padding: "7.5px",
  },
}))(Select);

const StyledInputLabel = withStyles((theme) => ({
  outlined: {
        transform: "translate(14px, 9px) scale(1)",
      },
}))(InputLabel);

const StyledButton = withStyles((theme) => ({
  root: {
    height: "34px",
    backgroundColor: "#00234b",
    color: "#ffffff",
    "&:hover": {
        backgroundColor: "#00234b"
    }
  },
}))(Button);


/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UnusualWarningStandard = forwardRef(
  (
    {
      comCode,
      onClick,
      getData,
      companyName,
      countDownload,
      countTakeout,
      countReqPermit,
      countPrint,
      countDelete,
      onChangeDownload,
      onChangeTakeout,
      onChangeReqPermit,
      onChangePrint,
      onChangeDelete,
      onSubmit,
      onSave,
      handleExcel,
    },
    ref,
  ) => {
    const classes = useStyles();
    const [deptName, setDeptName] = useState("");

    function createData(type, gubun, value, name) {
      return { type, gubun, value, name };
    }

    return (
      <Fragment>
        <Typography variant="h3" gutterBottom className={styles.h3}>
          <ListAlt /> 사전 안내 기준값
        </Typography>
        <Divider></Divider>
        <Box pt={4} pb={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Grid container spacing={8}>
                <Grid item xs={8}>
                  <Typography variant="h4" gutterBottom className={styles.h4}>
                    <Label color="primary"/> 조직 정보
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <StyledButton variant="contained" onClick={handleExcel} size="small">
                    excel
                  </StyledButton>
                </Grid>
              </Grid>
              <Box mt={1} p={2} className={styles.contents}>
                <DeptTreeContainer setDeptName={setDeptName} getData={getData} comCode={comCode} ref={ref} />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant="h4" gutterBottom className={styles.h4}>
                    <Label color="primary"/> [{deptName !== "" ? deptName : companyName}] 사전 안내 기준값
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{textAlign:"right"}}>
                  <StyledButton variant="contained" onClick={onSave} size="small">
                    수정
                  </StyledButton>
                </Grid>
              </Grid>
              <Box mt={1}>
                <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmit();
                }}
              >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">구분</TableCell>
                        <TableCell align="center">구분</TableCell>
                        <TableCell align="center">기준값</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          다운로드
                        </TableCell>
                        <TableCell align="center">(평균 편집 + 평균 조회)의 50%</TableCell>
                        <TableCell align="center">
                          <TextField value={countDownload} onChange={onChangeDownload}  style={{ width: 30 }}/>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          반출
                        </TableCell>
                        <TableCell align="center">(평균 편집)의 100%</TableCell>
                        <TableCell align="center">
                          <TextField value={countTakeout} onChange={onChangeTakeout}  style={{ width: 30 }}/>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          권한 신청
                        </TableCell>
                        <TableCell align="center">(평균 편집)의 100%</TableCell>
                        <TableCell align="center">
                          <TextField value={countReqPermit} onChange={onChangeReqPermit}  style={{ width: 30 }}/>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          출력
                        </TableCell>
                        <TableCell align="center">(평균 편집)의 100%</TableCell>
                        <TableCell align="center">
                          <TextField value={countPrint} onChange={onChangePrint}  style={{ width: 30 }}/>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          삭제
                        </TableCell>
                        <TableCell align="center">(평균 편집 + 평균 조회)의 50%</TableCell>
                        <TableCell align="center">
                          <TextField value={countDelete} onChange={onChangeDelete}  style={{ width: 30 }}/>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Fragment>
    );
  },
);

export default UnusualWarningStandard;
