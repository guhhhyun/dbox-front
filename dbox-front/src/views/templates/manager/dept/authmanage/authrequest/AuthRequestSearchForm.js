import React, { Fragment, forwardRef } from "react";
import { Typography, Grid, IconButton, Paper, InputBase, TextField, Button, Select, MenuItem } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./AuthRequestSearchForm.module.css";

console.debug("AuthRequestSearchForm.js");

//export default function SearchFormAll({
const AuthRequestSearchForm = forwardRef(
  (
    {
      alertOpened,
      closeAlertModal,
      onAlertDialogOkClick,
      errorMsg,
      defaultCompanyName,
      deptName,
      mgrDeptCode,
      onSearch,
      handleNameChange,
      startChangeDate,
      endChangeDate,
      dateText,
    },
    ref,
  ) => {
    return (
      <Fragment>
        <div
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
        >
          <AlertDialog open={alertOpened} content={errorMsg} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />
          <Grid container className={styles.searchBox} spacing={2}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom style={{ marginBottom: "14px" }}>
                회사
              </Typography>
              <Paper component="form" variant="outlined" className={styles.inputGroup}>
                <InputBase placeholder={defaultCompanyName} className={styles.input} value={defaultCompanyName} margin="dense" disabled />
              </Paper>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                부서
              </Typography>
              {mgrDeptCode.length != 1 ? (
                <Paper component="form" variant="outlined" className={styles.inputGroup}>
                  {/* <Select defaultValue={mgrDeptCode[0]} className={styles.input} onChange={handleDeptSelectChange} margin="dense">
                    <MenuItem value={mgrDeptCode[0]}>{deptName[0]}</MenuItem>
                    <MenuItem value={mgrDeptCode[1]}>{deptName[1]}</MenuItem>
                  </Select> */}
                  <InputBase placeholder="전체" className={styles.input} value={deptName} margin="dense" disabled />
                </Paper>
              ) : (
                <Paper component="form" variant="outlined" className={styles.inputGroup}>
                  <InputBase placeholder="전체" className={styles.input} value={deptName} margin="dense" disabled />
                </Paper>
              )}
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                사용자
              </Typography>
              <Paper component="form" variant="outlined" className={styles.inputGroup}>
                <TextField placeholder="전체" className={styles.input} margin="dense" onChange={handleNameChange} />
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
                    onChange={startChangeDate}
                    className={styles.input}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="date"
                    type="date"
                    defaultValue="MM/dd/yyyy"
                    margin="dense"
                    variant="outlined"
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
        </div>
      </Fragment>
    );
  },
);

export default AuthRequestSearchForm;
