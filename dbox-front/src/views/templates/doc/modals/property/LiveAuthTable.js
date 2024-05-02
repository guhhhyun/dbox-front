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

export default function LiveAuthTable({ liveAuthBases, liveAuthShare, onAuthClick }) {
  // liveAuthBases = [
  //   {
  //     "level": 3,
  //     "user": { // edms_v_user_info.display_name
  //       display_name: "aaa1"
  //     }
  //   },
  //   {
  //     "level": 7,
  //     "dept": { // edms_v_dept_info.org_nm
  //       org_nm: "aaa2"
  //     }
  //   }
  // ];

  // liveAuthShare = [
  //   {
  //     "permitType": "R",
  //     "user": { // edms_v_user_info.display_name
  //       display_name: "aaa3"
  //     }
  //   },
  //   {
  //     "permitType": "D",
  //     "dept": { // edms_v_dept_info.org_nm
  //       org_nm: "aaa4"
  //     }
  //   }
  // ];

  return (
    <TableContainer>
      {/* liveAuthBases : {JSON.stringify(liveAuthBases)}<br/> */}
      {/* liveAuthShare : {JSON.stringify(liveAuthShare)}<br/> */}
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">사용자 접근권한</StyledTableCell>
            <StyledTableCell align="left">기본</StyledTableCell>
            {liveAuthShare && <StyledTableCell align="left">공유/협업 Link</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell align="left" component="th">
              조회/다운로드
            </StyledTableCell>
            <StyledTableCell align="center">
              {(liveAuthBases ?? [])
                .filter((item) => item.uPermitType === "R")
                .map((item) => (
                  <div key={item.user ? item.user?.userId : item.dept?.orgId}>{item.user ? item.user?.displayName : item.dept?.orgNm}</div>
                ))}
              <IconButton size="small" onClick={() => onAuthClick("LIVE_BASE_R")}>
                <AddCircle color="primary" fontSize="small" />
              </IconButton>
            </StyledTableCell>
            {liveAuthShare && (
              <StyledTableCell align="center">
                {(liveAuthShare ?? [])
                  .filter((item) => item.uPermitType === "R")
                  .map((item) => (
                    <div key={item.user ? item.user?.userId : item.dept?.orgId}>{item.user ? item.user?.displayName : item.dept?.orgNm}</div>
                  ))}
                <IconButton size="small" onClick={() => onAuthClick("LIVE_SHARE_R")}>
                  <AddCircle color="primary" fontSize="small" />
                </IconButton>
              </StyledTableCell>
            )}
          </TableRow>
          <TableRow key={2}>
            <StyledTableCell align="left" component="th">
              조회/다운로드/편집/삭제
            </StyledTableCell>
            <StyledTableCell align="center">
              {(liveAuthBases ?? [])
                .filter((item) => item.uPermitType === "D")
                .map((item) => (
                  <div key={item.user ? item.user?.userId : item.dept?.orgId}>{item.user ? item.user?.displayName : item.dept?.orgNm}</div>
                ))}
              <IconButton size="small" onClick={() => onAuthClick("LIVE_BASE_D")}>
                <AddCircle color="primary" fontSize="small" />
              </IconButton>
            </StyledTableCell>
            {liveAuthShare && (
              <StyledTableCell align="center">
                {(liveAuthShare ?? [])
                  .filter((item) => item.uPermitType === "D")
                  .map((item) => (
                    <div key={item.user ? item.user?.userId : item.dept?.orgId}>{item.user ? item.user?.displayName : item.dept?.orgNm}</div>
                  ))}
                <IconButton size="small" onClick={() => onAuthClick("LIVE_SHARE_D")}>
                  <AddCircle color="primary" fontSize="small" />
                </IconButton>
              </StyledTableCell>
            )}
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
