import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";

console.debug("Main.js");

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Main({ marginTop, children }) {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Toolbar style={{ height: marginTop }} />
      {children}
    </div>
  );
}
