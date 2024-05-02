import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { MoveToInbox, AllInbox, Group, ExpandLess, ExpandMore } from "@material-ui/icons";
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import styles from "./HistorySidebar.module.css";

console.debug("HistorySidebar.js");

/**
 Styling - List
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
}));


export default function HistorySidebar() {
  const defaultRef = useRef(null);

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      ref={defaultRef}
      component="nav"
      className={styles.nav}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          D'Box 이력관리
        </ListSubheader>
      }
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ minWidth: "28px" }}>
          <Group fontSize="small" style={{ color: blue[800] }} />
        </ListItemIcon>
        <ListItemText primary="조직별 이력" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="문서 LifeCycle" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="문서 유통" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ minWidth: "28px" }}>
          <MoveToInbox fontSize="small" style={{ color: blue[800] }} />
        </ListItemIcon>
        <ListItemText primary="문서별 이력" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="문서 LifeCycle" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="문서 유통" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ minWidth: "28px" }}>
          <AllInbox fontSize="small" style={{ color: blue[800] }} />
        </ListItemIcon>
        <ListItemText primary="기타 이력" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="외부저장매체 사용" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="특이사용자" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="자료 이관" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="자료 폐기" />
          </ListItem>

          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/history/sample"
            // selected={selectedIndex === 3}
            //onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="TEST" />
          </ListItem>



          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/history/etc/historydocdistribution"
            // selected={selectedIndex === 3}
            //onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="문서별 이력 – 문서 유통" />
          </ListItem>


          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/history/etc/historyattach"
            // selected={selectedIndex === 3}
            //onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="외부메신지연동, 외부 사이트 이력 파일 반출 이력" />
          </ListItem>


          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/history/etc/historydelete"
            // selected={selectedIndex === 3}
            //onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="자료 폐기" />
          </ListItem>

          





        </List>
      </Collapse>
    </List>
  );
}