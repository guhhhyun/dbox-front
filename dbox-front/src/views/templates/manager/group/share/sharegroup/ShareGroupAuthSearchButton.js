import React from 'react';
import { Grid, Box, Select, MenuItem, Paper, InputBase, IconButton, Button, Divider, FormControl, InputLabel, makeStyles, createStyles, withStyles } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ShareGroupAuthDialogContentContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthDialogContentContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";

import SearchIcon from "@material-ui/icons/Search";
import styles from "./ShareGroupAuthSearchButton.module.css";

console.log("ShareGroupAuthSearchButton.js");

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: 1,
    },
    divider: {
      height: 20,
      margin: 14,
    },
    underline: {
      borderBottom: "0px solid red !important",
      "&:hover": {
        borderBottom: "0px solid rgba(0,0,0,0)"
      }
    }
  }),
);
  

export default function ShareGroupAuthSearchButton({ onIconClick, searchTextInput, choiceSelect, searchSelect, }) {
  const classes = useStyles();

  return (
    <Box pb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper component="form" variant="outlined" className={`${classes.root} ${styles.inputGroup}`}>
            <Select margin="dense" style={{ width: "80px" }} value={searchSelect ?? ""} onChange={choiceSelect} disableUnderline={true}>
              <MenuItem value={"전체"}>전체</MenuItem>
              <MenuItem value={"이름"}>이름</MenuItem>
              <MenuItem value={"설명"}>설명</MenuItem>
            </Select>
            <Divider className={classes.divider} orientation="vertical" />
            <InputBase placeholder="공유그룹 검색" id="quickFilter" className={styles.input} margin="dense" onChange={searchTextInput} />
            <IconButton type="button" aria-label="search" size="small" onClick={onIconClick} id="quickFilter">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
