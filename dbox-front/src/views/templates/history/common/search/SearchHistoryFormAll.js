import React, { Fragment, forwardRef } from "react";
import { Typography, Grid, IconButton, Paper, InputBase, TextField, Button, FormControl, Select, MenuItem, makeStyles, withStyles, InputLabel, Divider } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./SearchHistory.module.css";

console.debug("SearchHistoryFormAll.js");

const useStyles = makeStyles((theme) => ({
  input: {
    width:'150px'
  },
  mgr10: {
    marginRight: theme.spacing(1)
  },
  // 조회용.
  root: {
    display: "flex",
    alignItems: "center",
  },
  input2: {
    flex: 1,
  },
  divider: {
    height: 20,
    margin: 14,
  },
}));

const StyledInputLabel = withStyles((theme) => ({
  outlined: {
        transform: "translate(14px, 12px) scale(1)",
      },
}))(InputLabel);


//export default function SearchFormAll({
const SearchFormAll = forwardRef(
  (
    {
      alertOpened,
      closeAlertModal,
      onAlertDialogOkClick,
      errorMsg,
      defaultCompanyName,
      comCode,
      companyName,
      deptName,
      userName,
      modalOption,
      onClick,
      opened,
      onModalOkClick,
      onModalClose,
      onSearch,
      startDate,
      startChangeDate,
      endDate,
      endChangeDate,
      dateText,
      searchTextInput, choiceSelect, searchSelect,
    },
    ref,
  ) => {


    const classes = useStyles();

    return (
      <Fragment>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
        >
          <AlertDialog open={alertOpened} content={errorMsg} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />
          <ConfirmDialog
            open={opened}
            title={modalOption.title}
            okText={modalOption.okText}
            cancelText={modalOption.cancelText}
            onOkClick={onModalOkClick}
            onClose={onModalClose}
            maxWidth="sm"
            fullWidth
          >
            <SearchTreeContainer ref={ref} />
          </ConfirmDialog>
          <Grid container className={styles.searchBox} spacing={2}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom style={{ marginBottom: "14px" }}>
                회사
              </Typography>

              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={comCode === "DKG" ? onClick : null}>
                {/* <InputBase className={styles.input} margin="dense" onChange={(event) => onCompanyChanged(event.target.value)} /> */}
                <InputBase placeholder={defaultCompanyName} className={styles.input} value={companyName} margin="dense" disabled />
                <IconButton aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                부서
              </Typography>
              {/* <TextField id="outlined-input" variant="outlined" margin="dense" className={styles.input} /> */}
              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={onClick}>
                {/* <InputBase className={styles.input} margin="dense" onChange={(event) => onDeptChanged(event.target.value)} /> */}
                <InputBase placeholder="전체" className={styles.input} value={deptName} margin="dense" disabled />
                <IconButton type="submit" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                요청자
              </Typography>
              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={onClick}>
                {/* <InputBase className={styles.input} margin="dense" onChange={(event) => onUserChanged(event.target.value)} /> */}
                <InputBase placeholder="전체" className={styles.input} value={userName} margin="dense" disabled />
                <IconButton type="submit" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>



            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                  조회
                </Typography>
              <Paper component="form" variant="outlined" className={`${classes.root} ${styles.inputGroup}`}>
                <Select margin="dense" style={{ width: "80px" }} value={searchSelect ?? ""} onChange={choiceSelect}>
                {/* <Select margin="dense" style={{ width: "80px" }} > */}
                  <MenuItem value={"전체"}>전체</MenuItem>
                  <MenuItem value={"REQ_REASON"}>요청사유</MenuItem>
                  {/* <MenuItem value={"이름"}>이름</MenuItem>
                  <MenuItem value={"설명"}>설명</MenuItem> */}
                </Select>
                <Divider className={classes.divider} orientation="vertical" />
                {/* <InputBase placeholder="공유그룹 검색" id="quickFilter" className={styles.input} margin="dense" onChange={searchTextInput} />
                <IconButton type="button" aria-label="search" size="small" onClick={onIconClick} id="quickFilter"> */}

                <InputBase placeholder="조회" id="quickFilter2" className={styles.input} margin="dense" onChange={searchTextInput} />
                <IconButton type="button" aria-label="search" size="small" id="quickFilter3" onClick={onSearch} >


                {/* <InputBase placeholder="조회" className={styles.input} margin="dense" />
                <IconButton type="button" aria-label="search" size="small"> */}
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>



            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                {dateText || "요청일자"}
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    id="date"
                    type="date"
                    defaultValue="MM/dd/yyyy"
                    margin="dense"
                    variant="outlined"
                    utils={DateFnsUtils}
                    value={startDate}
                    onChange={startChangeDate}
                    className={styles.input}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="date2"
                    type="date"
                    defaultValue="MM/dd/yyyy"
                    margin="dense"
                    variant="outlined"
                    utils={DateFnsUtils}
                    value={endDate}
                    onChange={endChangeDate}
                    className={styles.input}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className={styles.searchBtn}>
              <Button variant="contained" onClick={onSearch} color="primary">
                검색
              </Button>
            </div>
          </Grid>
        </form>
      </Fragment>
    );
  },
);

export default SearchFormAll;
