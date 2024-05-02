import * as React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { MoveToInbox, Group, ExpandLess, ExpandMore } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./ManagerSidebar.module.css";

console.debug("ManagerSidebar.js");

/**
 Styling - List
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
}));

export default function ManagerSidebar({ result }) {
  const defaultRef = useRef(null);

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List
      ref={defaultRef}
      component="nav"
      className={styles.nav}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          D'Box 관리자
        </ListSubheader>
      }
    >
      {result
        ? result.map((item, index) =>
            item.code.uCodeVal1 === "manage-group" ? (
              <ListItem button onClick={handleClick}>
                <ListItemIcon style={{ minWidth: "28px" }}>
                  <MoveToInbox fontSize="small" style={{ color: blue[800] }} />
                </ListItemIcon>
                <ListItemText primary={item.code.uCodeName1} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            ) : null,
          )
        : null}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {result
            ? result.map((item, index) =>
                item.code.uCodeVal2 === "manage-group" ? (
                  <ListItem
                    button
                    key={index}
                    className={classes.nested}
                    component={Link}
                    to={"/manager/group/" + item.code.uCodeVal1}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <ListItemText primary={item.code.uCodeName1} />
                  </ListItem>
                ) : null,
              )
            : null}
        </List>
      </Collapse>
      {result
        ? result.map((item, index) =>
            item.code.uCodeVal1 === "manage-dept" ? (
              <ListItem button onClick={handleClick}>
                <ListItemIcon style={{ minWidth: "28px" }}>
                  <Group fontSize="small" style={{ color: blue[800] }} />
                </ListItemIcon>
                <ListItemText primary={item.code.uCodeName1} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            ) : null,
          )
        : null}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {result
            ? result.map((item, index) =>
                item.code.uCodeVal2 === "manage-dept" ? (
                  <ListItem
                    button
                    key={index + 100}
                    className={classes.nested}
                    component={Link}
                    to={"/manager/dept/" + item.code.uCodeVal1}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index + 100)}
                  >
                    <ListItemText primary={item.code.uCodeName1} />
                  </ListItem>
                ) : null,
              )
            : null}
        </List>
      </Collapse>
    </List>
  );
}
