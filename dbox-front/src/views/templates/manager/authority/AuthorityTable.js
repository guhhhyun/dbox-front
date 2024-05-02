import React, { Fragment } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, makeStyles } from "@material-ui/core";
import { Add, Check } from '@material-ui/icons';

console.debug("GradeNotApplyTable.js");

/**
  * Table 설정
  */
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

function createData(text01: string, text02: string, text03: string, text04: string, text05: string) {
  return { text01, text02, text03, text04, text05 };
}

const rows = [
  createData('종합현황', '-', '-', '-', '-'),
  createData('문서별 이력',  '-', '-', '-', '-'),
  createData('사용자별 이력',  '-', '-', '-', '-'),
  createData('외부 매체 사용 이력', '-', '-', '-', '-'),
  createData('자료 폐기 이력', '-', '-', '-', '-'),
  createData('다운로드 이력', '-', '-', '-', '-'),
  createData('특이 사용자 이력', '-', '-', '-', '-'),
  createData('공유/협업 이력', '-', '-', '-', '-'),
  createData('자료 이관 이력',  '-', '-', '-', '-'),
];

export default function GradeNotApplyTable() {
  const classes = useStyles();

  const okText = "예";
  const cancelText = "아니오";

  /**
   * CheckBox 설정
   */
  const [state, setState] = React.useState({
    checkedA: true,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">항 목</TableCell>
              <TableCell align="center">사 내</TableCell>
              <TableCell align="center">팀 별</TableCell>
              <TableCell align="center">부서 문서관리자</TableCell>
              <TableCell align="center">지 정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">{row.text01}</TableCell>
                <TableCell align="center"><Check/></TableCell>
                <TableCell align="center"><Check/></TableCell>
                <TableCell align="center"><Check/></TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="secondary" disableElevation><Add/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
