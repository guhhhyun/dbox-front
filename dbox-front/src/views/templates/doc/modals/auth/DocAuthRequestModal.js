
import { Fragment } from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";
import { Create } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: '#ffffff',
    fontSize: '13px',
    borderRadius: '2px'
  },
  input1: {
    paddingTop: '9.5px',
    paddingBottom: '9.5px'
  },
  icon: {
    fontSize: "14px",
    verticalAlign: "middle"
  }
}));


export default function DocAuthRequestModal({onChange}) {

  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="subtitle1">권한 신청 범위 : 조회/다운로드</Typography>
      <br/>
      <Typography variant="body2" color="primary"><Create className={classes.icon}/> 권한 신청 사유</Typography>
      <TextField fullWidth variant="outlined" margin="dense" onChange={onChange} name="uReqReason"
      InputProps={{ className: classes.input}}  placeholder="신청 사유를 입력하세요."></TextField>
    </Fragment>
  );
}
