import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Close, Notifications  } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

console.debug("ModalDialog.js");

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: "0px",
    margin:"0px 4px"
  },
  icon: {
    fontSize: "16px",
    verticalAlign: "middle"
  },
  title: {
    fontSize:"13px"
  },
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
}));

export default function ModalDialog({ open, title, content, children, okText, onOkClick, onClose, ...extra }) {
  const showOk = typeof onOkClick === "function";

  const { t } = useTranslation("modalDialog");

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} {...extra}>
      <DialogTitle>
        <Typography className={classes.title}><Notifications className={classes.icon}/> {title}</Typography>
        <IconButton className={classes.close} onClick={onClose}>
          <Close className={classes.icon}/>
        </IconButton>
      </DialogTitle>
      <DialogContent>{children || <DialogContentText>{content}</DialogContentText>}</DialogContent>
      {showOk && (
        <DialogActions>
          <Button autoFocus onClick={onOkClick} color="primary" className={classes.btnAction}>
            {okText || t("OK")}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
