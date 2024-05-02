import React, { Fragment } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from "@material-ui/core";

console.debug("GradeNotApplyTable.js");

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(year01, year02, year03, year04, year05, year06) {
  return { year01, year02, year03, year04, year05, year06 };
}

const rows = [
  createData("1", "동국제강", "회계팀", "2021-06-14", "-", "해제"),
  createData("2", "인터지스", "기획팀", "2021-06-14", "-", "해제"),
  createData("3", "동국시스템즈", "경영관리팀", "2021-06-14", "-", "해제"),
  createData("4", "페럼인프라", "기획관리팀", "2021-06-14", "-", "해제"),
];

export default function GradeNotApplyTable() {
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">번 호</TableCell>
              <TableCell align="center">그룹사</TableCell>
              <TableCell align="center">부 서</TableCell>
              <TableCell align="center">설정일</TableCell>
              <TableCell align="center">해제일</TableCell>
              <TableCell align="center">해 제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">{row.year01}</TableCell>
                <TableCell align="center">{row.year02}</TableCell>
                <TableCell align="center">{row.year03}</TableCell>
                <TableCell align="center">{row.year04}</TableCell>
                <TableCell align="center">{row.year05}</TableCell>
                <TableCell align="center">{row.year06}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
