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

export default function OwnJoinAuthTable({ ownTarget, onOwnClick, joinReadTargets, onJoinReadClick, joinDelTargets, onJoinDelClick }) {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">사용자 접근권한</StyledTableCell>
            <StyledTableCell align="left">주관부서</StyledTableCell>
            <StyledTableCell align="left">참여부서</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell align="left" component="th">
              조회/다운로드
            </StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">
              {joinReadTargets.map((item) => (
                <div key={item.orgId}>{item.orgNm}</div>
              ))}
              <IconButton size="small">
                <AddCircle color="primary" fontSize="small" onClick={onJoinReadClick} />
              </IconButton>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="left" component="th">
              조회/다운로드/편집/삭제
            </StyledTableCell>
            <StyledTableCell align="center">
              <div key={ownTarget.orgId}>{ownTarget.orgNm}</div>
              <IconButton size="small">
                <AddCircle color="primary" fontSize="small" onClick={onOwnClick} />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell align="center">
              {joinDelTargets.map((item) => (
                <div key={item.orgId}>{item.orgNm}</div>
              ))}
              <IconButton size="small">
                <AddCircle color="primary" fontSize="small" onClick={onJoinDelClick} />
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
