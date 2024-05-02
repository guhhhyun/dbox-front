import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";

console.debug("DocCreatorModal.js");

export default function DocCreatorModal({ creators }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">직책 / 직위</TableCell>
            <TableCell align="center">부서</TableCell>
            <TableCell align="center">회사</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {creators.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.jobPosition}</TableCell>
              <TableCell align="center">{item.deptName}</TableCell>
              <TableCell align="center">{item.entName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
