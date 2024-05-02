import { Fragment } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Folder, InsertDriveFile, Delete, DeleteOutline } from "@material-ui/icons";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "14px",
    verticalAlign: "middle",
  }
}));

export default function DeleteModal({
  denyOpened,
  proceedOpened,
  resultOpened,
  onDenyOkClick,
  onDenyClose,
  onProceedOkClick,
  onProceedClose,
  onResultOkClick,
  onResultClose,
}) {

  const classes = useStyles();

  return (
    <Fragment>
      <AlertDialog open={denyOpened} onOkClick={onDenyOkClick} onClose={onDenyClose}>
        <Typography variant="subtitle2">폴더 내 자료가 총 1,000건 이상이므로 부서문서관리자에게 요청 바랍니다.</Typography>
         <Typography variant="body2"> <Folder className={classes.icon} color="secondary"/> 폴더 0건  <InsertDriveFile className={classes.icon} color="secondary"/> Live자료 670건  <InsertDriveFile className={classes.icon} color="secondary"/> Closed자료 521건</Typography>
      </AlertDialog>
      <ConfirmDialog open={proceedOpened} onOkClick={onProceedOkClick} onClose={onProceedClose}>
        <Typography variant="subtitle2">폴더 내 자료</Typography>
        <br/>
        <Typography variant="body2"><Folder className={classes.icon} color="secondary"/> 폴더 Total 2건</Typography>
        <Typography variant="body2"><InsertDriveFile className={classes.icon} color="secondary" /> Live자료 총 4건 /<Delete className={classes.icon} style={{marginLeft:"2px"}} color="secondary"/> 용량 4.3MB는 삭제 처리</Typography>
        <Typography variant="body2"><InsertDriveFile className={classes.icon} color="secondary"/> Closed자료 총 5건 /<Delete className={classes.icon} style={{marginLeft:"2px"}}color="secondary"/>용량 5.0MB는 폐기 요청</Typography>
        <Typography variant="body2">(단, 권한이 없는 자료 총 3건, 용량 2.6MB는 삭제되지 않습니다.)</Typography>
        <br/>
        <Typography variant="subtitle1">자료 삭제를 진행하시겠습니까?</Typography>
      </ConfirmDialog>
      <AlertDialog open={resultOpened} onOkClick={onResultOkClick} onClose={onResultClose}>
        <Typography variant="subtitle2">폴더 내 자료</Typography>
        <Typography variant="body2">폴더 2건, Live 자료 4건, Closed 자료 5건에 대하여 삭제 및 폐기 요청 처리하였습니다.</Typography>
      </AlertDialog>
    </Fragment>
  );
}
