import { Paper, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

console.debug("DocManagerModal.js");

export default function DocManagerModal() {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">성명</TableCell>
            <TableCell align="center">직급</TableCell>
            <TableCell align="center">지정자</TableCell>
            <TableCell align="center">지정일</TableCell>
            <TableCell align="center">선택</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell align="center" component="th">김형동</TableCell>
            <TableCell align="center">팀장</TableCell>
            <TableCell align="center">인사동기화</TableCell>
            <TableCell align="center">2021-05-11 11:30:00</TableCell>
            <TableCell align="center">
              <Checkbox color="primary" checked={true} />
            </TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell align="center" component="th">김형동</TableCell>
            <TableCell align="center">팀장</TableCell>
            <TableCell align="center">인사동기화</TableCell>
            <TableCell align="center">2021-05-11 11:30:00</TableCell>
            <TableCell align="center">
              <Checkbox color="primary" checked={false} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
