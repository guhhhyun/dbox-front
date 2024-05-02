import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, makeStyles } from "@material-ui/core";
import { Close, FilterList } from "@material-ui/icons";

console.debug("DynamicButtonModalDialog.js");

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
  }
}));

export default function DynamicButtonModalDialog({ open, title, content, children, buttons, onClose, ...extra }) {

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} {...extra}>
      <DialogTitle >
        <Typography className={classes.title}><FilterList className={classes.icon}/> {title}</Typography>
        <IconButton className={classes.close} onClick={onClose}>
          <Close className={classes.icon}/>
        </IconButton>
      </DialogTitle>
      <DialogContent>{children || <DialogContentText>{content}</DialogContentText>}</DialogContent>
      {buttons && <DialogActions>{buttons}</DialogActions>}
    </Dialog>
  );
}
