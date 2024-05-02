import { Fragment } from "react";
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, IconButton, withStyles } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import { SEC_LEVEL } from "constants/code-constants";

const StyledTable = withStyles((theme) => ({
  root: {
    border: "1px solid #CCCCCC",
  },
}))(Table);

const StyledTableCell = withStyles((theme) => ({
  head: {
    padding: "4px 10px",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 13,
    fontWeight: 400,
    borderBottom: 0,
    borderRight: "1px solid #CCCCCC",
  },
  body: {
    padding: "4px 10px",
    fontSize: 13,
    borderBottom: 0,
  },
}))(TableCell);

const accent = green.A200;

export default function AuthGradeTable({ secLevel, onSecLevelChange }) {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">제한</StyledTableCell>
            <StyledTableCell align="center">팀내</StyledTableCell>
            <StyledTableCell align="center">사내</StyledTableCell>
            <StyledTableCell align="center">그룹사내</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell
              align="center"
              onClick={() => {
                if (secLevel !== SEC_LEVEL.SEC.key) onSecLevelChange(SEC_LEVEL.SEC.key);
              }}
            >
              {secLevel === SEC_LEVEL.SEC.key && <CheckCircle style={{ color: green[500] }} fontSize="small" />}
            </TableCell>
            <TableCell
              align="center"
              onClick={() => {
                if (secLevel !== SEC_LEVEL.TEAM.key) onSecLevelChange(SEC_LEVEL.TEAM.key);
              }}
            >
              {secLevel === SEC_LEVEL.TEAM.key && <CheckCircle style={{ color: green[500] }} fontSize="small" />}
            </TableCell>
            <TableCell
              align="center"
              onClick={() => {
                if (secLevel !== SEC_LEVEL.COMPANY.key) onSecLevelChange(SEC_LEVEL.COMPANY.key);
              }}
            >
              {secLevel === SEC_LEVEL.COMPANY.key && <CheckCircle style={{ color: green[500] }} fontSize="small" />}
            </TableCell>
            <TableCell
              align="center"
              onClick={() => {
                if (secLevel !== SEC_LEVEL.GROUP.key) onSecLevelChange(SEC_LEVEL.GROUP.key);
              }}
            >
              {secLevel === SEC_LEVEL.GROUP.key && <CheckCircle style={{ color: green[500] }} fontSize="small" />}
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
