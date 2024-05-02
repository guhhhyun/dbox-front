import React, { Fragment, useState, forwardRef } from "react";
import { Typography, Grid, IconButton, Paper, InputBase, TextField, Button, Select, MenuItem, FormControl } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./Search.module.css";

console.debug("SearchFormStat.js");

const SearchFormStat = forwardRef(
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
      onSearchClick,
      handleChange,
      startDate,
      startChangeDate,
      endDate,
      endChangeDate,
      dateText,
      state,
      defaultData,
    },
    ref,
  ) => {
    return (
      <Fragment>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearchClick();
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
              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={onClick}>
                <InputBase placeholder="전체" className={styles.input} value={deptName} margin="dense" disabled />
                <IconButton type="submit" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                사용자
              </Typography>
              <FormControl variant="outlined" variant="outlined">
                <Select margin="dense" name="gubun" value={state.gubun || "A"} onChange={handleChange}>
                  <MenuItem value={"A"}>전체</MenuItem>
                  <MenuItem value={"DL"}>다운로드</MenuItem>
                  <MenuItem value={"TO"}>반출</MenuItem>
                  <MenuItem value={"AR"}>권한신청</MenuItem>
                  <MenuItem value={"PT"}>출력</MenuItem>
                  <MenuItem value={"DT"}>삭제</MenuItem>
                </Select>
              </FormControl>
              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={onClick}>
                <InputBase placeholder="전체" className={styles.input} value={userName} margin="dense" disabled />
                <IconButton type="submit" aria-label="search" size="small">
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
                    type="month"
                    margin="dense"
                    variant="outlined"
                    utils={DateFnsUtils}
                    value={startDate ? startDate : defaultData}
                    onChange={startChangeDate}
                    className={styles.input}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="date"
                    type="month"
                    margin="dense"
                    variant="outlined"
                    utils={DateFnsUtils}
                    value={endDate ? endDate : defaultData}
                    onChange={endChangeDate}
                    className={styles.input}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className={styles.searchBtn}>
              <Button variant="contained" onClick={onSearchClick} color="primary">
                검색
              </Button>
            </div>
          </Grid>
        </form>
      </Fragment>
    );
  },
);

export default SearchFormStat;
