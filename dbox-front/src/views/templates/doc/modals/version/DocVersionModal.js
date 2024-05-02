import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import fileSize from "filesize";

console.debug("DocVersionModal.js");

export default function DocVersionModal({ versions }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">구분</TableCell>
            <TableCell align="center">크기</TableCell>
            <TableCell align="center">생성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {versions.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.versionId}</TableCell>
              <TableCell align="center">{fileSize(item.fileSize)}</TableCell>
              <TableCell align="center">{item.createdDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
