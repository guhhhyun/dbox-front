import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

console.debug("Header.js");

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ title, height, children }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar
        style={{
          height: height,
          lineHeight: height,
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}
