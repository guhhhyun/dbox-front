import { forwardRef } from "react";
import { useSnackbar } from "notistack";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";

console.debug("SnackbarAlert.js");

const useStyles = makeStyles(() => ({
  alert: {
    backgroundColor: "white",
    minWidth: 400,
  },
}));

export default forwardRef(function SnackbarAlert({ snackbarKey, severity, title, children, onClose }, ref) {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();

  /**
   * 스낵바 닫기
   */
  const onAlertClose = () => {
    if (onClose && typeof onClose === "function") onClose();
    closeSnackbar(snackbarKey);
  };

  return (
    <Alert ref={ref} className={classes.alert} variant="outlined" severity={severity} onClose={onAlertClose}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
});
