import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

console.debug("DocApprovalModal.js");

export default function DocApprovalModal({ approvals }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">직급</TableCell>
            <TableCell align="center">부서</TableCell>
            <TableCell align="center">결재제목</TableCell>
            <TableCell align="center">최종결재일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {approvals.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.creator?.name}</TableCell>
              <TableCell align="center">{item.creator?.jobPosition}</TableCell>
              <TableCell align="center">{item.creator?.deptName}</TableCell>
              <TableCell align="center">{item.text}</TableCell>
              <TableCell align="center">{item.approveDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
