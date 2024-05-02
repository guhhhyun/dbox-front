import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Check } from "@material-ui/icons";

console.debug("ConfirmDialog.js");

const useStyles = makeStyles({
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
});
  
export default function ConfirmDialog({ open, title, content, children, okText, cancelText, onOkClick, onClose, ...extra }) {
  const showOk = typeof onOkClick === "function";
  const showClose = typeof onClose === "function";
  const { t } = useTranslation("confirmDialog");
  const classes = useStyles();
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth {...extra}>
      <DialogTitle >
        <Typography className={classes.title}><Check className={classes.icon}/> {title}</Typography>
      </DialogTitle>
      <DialogContent>{children || <DialogContentText>{content}</DialogContentText>}</DialogContent>
      {showOk && showClose && (
        <DialogActions>
          {showOk && (
            <Button onClick={onOkClick} autoFocus className={classes.btnAction}>
              {okText || t("OK")}
            </Button>
          )}
          {showClose && (
            <Button onClick={onClose} className={classes.btnAction}>
              {cancelText || t("CANCEL")}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
