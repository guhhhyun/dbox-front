import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

console.debug("AlertDialog.js");

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

export default function AlertDialog({ open, title, content, children, okText, onOkClick, onClose, ...extra }) {
  const showOk = typeof onOkClick === "function";

  const { t } = useTranslation("alertDialog");

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth {...extra}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children || <DialogContentText>{content}</DialogContentText>}</DialogContent>
      {showOk && (
        <DialogActions>
          <Button onClick={onOkClick} color="primary" autoFocus className={classes.btnAction}>
            {okText || t("OK")}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
