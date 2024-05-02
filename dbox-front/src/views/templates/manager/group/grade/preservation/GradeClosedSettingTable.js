import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  makeStyles,
} from "@material-ui/core";
import PeriodItems from "views/commons/item/Period";

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GradeClosedSettingTable(props) {

  const preservPeriod = props.preservPeriod;

  const classes = useStyles();

  const onChangePeriod = (value) => props.onChangePeriod(value);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">제 한</TableCell>
              <TableCell align="center">팀 내</TableCell>
              <TableCell align="center">사 내</TableCell>
              <TableCell align="center">그룹사내</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Select
                  variant="outlined"
                  margin="dense"
                  name="u_sec_s_year"
                  value={preservPeriod.u_sec_s_year || 0}
                  onChange={onChangePeriod}
                  style={{width: "100px"}}>
                  {PeriodItems(15, '년')}
                </Select>
              </TableCell>
              <TableCell align="center">
                <Select
                  variant="outlined"
                  margin="dense"
                  name="u_sec_t_year"
                  value={preservPeriod.u_sec_t_year || 0}
                  onChange={onChangePeriod}
                  style={{width: "100px"}}>
                  {PeriodItems(15, '년')}
                </Select>
              </TableCell>
              <TableCell align="center">
                <Select
                  variant="outlined"
                  margin="dense"
                  name="u_sec_c_year"
                  value={preservPeriod.u_sec_c_year || 0}
                  onChange={onChangePeriod}
                  style={{width: "100px"}}>
                  {PeriodItems(15, '년')}
                </Select>
              </TableCell>
              <TableCell align="center">
                <Select
                  variant="outlined"
                  margin="dense"
                  name="u_sec_g_year"
                  value={preservPeriod.u_sec_g_year || 0}
                  onChange={onChangePeriod}
                  style={{width: "100px"}}>
                  {PeriodItems(15, '년')}
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
