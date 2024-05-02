import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import DocFeedbackReplyRegisterContainer from "views/containers/doc/modals/feedback/DocFeedbackReplyRegisterContainer";

console.debug("DocFeedbackList.js");

export default function DocFeedbackList({ feedbacks }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">직급</TableCell>
            <TableCell align="center">부서</TableCell>
            <TableCell align="center">Feedback</TableCell>
            <TableCell align="center">작성일</TableCell>
            <TableCell align="center">답변</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.creator?.name}</TableCell>
              <TableCell align="center">{item.creator?.jobPosition}</TableCell>
              <TableCell align="center">{item.creator?.deptName}</TableCell>
              <TableCell align="center">{item.text}</TableCell>
              <TableCell align="center">{item.createdDate}</TableCell>
              <TableCell align="center">
                <DocFeedbackReplyRegisterContainer />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
