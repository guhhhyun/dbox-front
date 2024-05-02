import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Close, Check } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

console.debug("TakeoutModalDialog.js");

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: "0px",
    margin: "0px 4px",
  },
  icon: {
    fontSize: "16px",
    verticalAlign: "middle",
  },
  title: {
    fontSize: "13px",
  },
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px",
  },
}));

export default function TakeoutModalDialog({ open, title, content, children, updateText, deleteText, cancelText, onUpdate, onDelete, onClose, ...extra }) {
  const showOk = typeof onOkClick === "function";

  const { t } = useTranslation("modalDialog");

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} {...extra}>
      <DialogTitle>
        <Typography className={classes.title}>
          <Check className={classes.icon} /> {title}
        </Typography>
        <IconButton className={classes.close} onClick={onClose}>
          <Close className={classes.icon} />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children || <DialogContentText>{content}</DialogContentText>}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onUpdate} color="primary" className={classes.btnAction}>
          {updateText || t("UPDATE")}
        </Button>
        <Button autoFocus onClick={onDelete} color="primary" className={classes.btnAction}>
          {deleteText || t("DELETE")}
        </Button>
        <Button autoFocus onClick={onClose} color="primary" className={classes.btnAction}>
          {cancelText || t("CANCLE")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
