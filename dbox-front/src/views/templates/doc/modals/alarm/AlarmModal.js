import { Fragment } from "react";
import { Button, Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from "@material-ui/core";

console.debug("AlarmModal.js");

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "30px",
  },
}));

export default function AlarmModal({ alarms, onCheckedAlarmChange, onlyUnfinished, onOnlyUnfinishedChange, onDeleteClick }) {
  const classes = useStyles();

  return (
    <Fragment>
      <FormControlLabel control={<Checkbox checked={onlyUnfinished} onChange={onOnlyUnfinishedChange} size="small" />} label="미결 건만 보기" />
      <Button variant="contained" color="primary" className={classes.btn} size="small" onClick={onDeleteClick}>
        삭제
      </Button>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">체크</TableCell>
              <TableCell align="center">구분</TableCell>
              <TableCell align="center">메시지</TableCell>
              <TableCell align="center">발송자</TableCell>
              <TableCell align="center">직급</TableCell>
              <TableCell align="center">발송자 부서</TableCell>
              <TableCell align="center">회사</TableCell>
              <TableCell align="center">발송일시</TableCell>
              <TableCell align="center">처리여부</TableCell>
              <TableCell align="center">바로가기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alarms.map((item, index) => {
              if (!onlyUnfinished || item.uActionYn !== "Y") {
                return (
                  <TableRow key={index}>
                    <TableCell component="th">
                      <Checkbox checked={item.checked} onChange={(event) => onCheckedAlarmChange(event, index)} />
                    </TableCell>
                    <TableCell align="left">{item.uMsgName}</TableCell>
                    <TableCell align="left">{item.uMsg}</TableCell>
                    <TableCell align="center">{item.uSenderName}</TableCell>
                    <TableCell align="center">{item.uSenderJobTitleName}</TableCell>
                    <TableCell align="center">{item.uSenderDeptName}</TableCell>
                    <TableCell align="center">{item.uSenderComName}</TableCell>
                    <TableCell align="center">{item.uSentDate}</TableCell>
                    <TableCell align="center">
                      {item.uActionYn === "Y" ? (
                        item.uActionDate
                      ) : ["FB", "OU", "SR"].includes(item.uMsgType) ? (
                        <Fragment>
                          <Button variant="contained" color="primary" style={{ marginRight: "4px" }} className={classes.btn} size="small">
                            승인
                          </Button>
                          <Button variant="contained" color="secondary" className={classes.btn} size="small">
                            반려
                          </Button>
                        </Fragment>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {item.uDocId != " " ? (
                        <Button variant="contained" color="primary" className={classes.btn} size="small">
                          폴더 바로가기
                        </Button>
                      ) : (
                        <Button variant="contained" color="primary" className={classes.btn} size="small">
                          승인 바로가기
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
