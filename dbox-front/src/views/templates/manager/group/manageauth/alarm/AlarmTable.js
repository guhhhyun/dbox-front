import React, { Fragment } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, Checkbox } from "@material-ui/core";

console.debug("AlarmTable.js");

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name) {
  return { name };
}

export default function AlarmTable({ alarmChange, emailChange, mmsChange, alarmData, alarmArray, emailArray, mmsArray }) {
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">항 목</TableCell>
              <TableCell align="center">알림</TableCell>
              <TableCell align="center">E-Mail</TableCell>
              <TableCell align="center">카카오톡</TableCell>
              <TableCell align="center">알림 대상자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alarmData.map((alarm, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {alarm.uCodeName1}
                </TableCell>
                <TableCell align="center">
                  {/* {alarm.uAlarmYn} */}
                  <Checkbox checked={alarmArray[index] === true ? true : false} onChange={() => alarmChange(index)} color="primary" />
                </TableCell>
                <TableCell align="center">
                  {/* {alarm.uEmailYn} */}
                  <Checkbox checked={emailArray[index] === true ? true : false} onChange={() => emailChange(index)} color="primary" />
                </TableCell>
                <TableCell align="center">
                  {/* {alarm.uMmsYn} */}
                  <Checkbox checked={mmsArray[index] === true ? true : false} onChange={() => mmsChange(index)} color="primary" />
                </TableCell>
                <TableCell align="center">{alarm.uCodeName2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
