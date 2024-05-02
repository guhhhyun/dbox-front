import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Drawer } from "@material-ui/core";

console.debug("Sidebar.js");

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

export default function Sidebar({ marginTop, children }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar style={{ height: marginTop }} />
      <div className={classes.drawerContainer}>{children}</div>
    </Drawer>
  );
}
