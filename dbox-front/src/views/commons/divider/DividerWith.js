import React from "react";
import {Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export default function DividerWith(props) {
  const margin = props.margin ?? 10;
  const useStyles = makeStyles((theme) => ({
    divider: {
      // Theme Color, or use css color in quote
      background: theme.palette.divider,
      margin: `${margin}px 0`
    },
  }));
  const classes = useStyles();
  return <Divider classes={{root: classes.divider}} variant="fullWidth"/>;
}
