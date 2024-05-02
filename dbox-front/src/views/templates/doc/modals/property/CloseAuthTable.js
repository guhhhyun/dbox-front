import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, IconButton, withStyles } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";

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

export default function CloseAuthTable({ closedAuthBases, onAuthClick }) {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">사용자 접근권한</StyledTableCell>
            <StyledTableCell align="left">기본</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell align="left" component="th">
              조회/다운로드
            </StyledTableCell>
            <StyledTableCell align="center">
              {(closedAuthBases ?? [])
                .filter((item) => item.uPermitType === "R")
                .map((item) => (
                  <div key={item.user ? item.user?.userId : item.dept?.orgId}>{item.user ? item.user?.displayName : item.dept?.orgNm}</div>
                ))}
              <IconButton size="small" onClick={() => onAuthClick("CLOSE_BASE_R")}>
                <AddCircle color="primary" fontSize="small" />
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
