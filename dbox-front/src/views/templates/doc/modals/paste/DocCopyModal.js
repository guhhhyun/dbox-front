import { Fragment } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Folder, InsertDriveFile, Save } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
    fontSize: "14px",
    verticalAlign: "middle",
  }
}));

export default function DocCopyModal() {
  
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="subtitle1">"재무소통회의"로 자료를 복사하겠습니까?</Typography>
      <br/>
      <Typography variant="body2"> <Folder className={classes.icon} color="secondary"/> 폴더 0건  <InsertDriveFile className={classes.icon} color="secondary"/> 문서 2건  <Save className={classes.icon} color="secondary"/> 용량 3.3MB</Typography>
    </Fragment>
  );
}
