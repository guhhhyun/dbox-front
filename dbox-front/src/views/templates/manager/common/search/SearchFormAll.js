import React, { Fragment, forwardRef } from "react";
import { Typography, Grid, IconButton, Paper, InputBase, TextField, Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./Search.module.css";

console.debug("SearchFormAll.js");

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
              <Typography variant="subtitle2" color="textSecondary" gutterBottom className={styles.mb14} >
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
              <Typography variant="subtitle2"  color="textSecondary" gutterBottom className={styles.mb14} >
                부서
              </Typography>
              {/* <TextField id="outlined-input" variant="outlined" margin="dense" className={styles.input} /> */}
              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={onClick}>
                {/* <InputBase className={styles.input} margin="dense" onChange={(event) => onDeptChanged(event.target.value)} /> */}
                <InputBase placeholder="전체" className={styles.input} value={deptName} margin="dense" disabled />
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2"  color="textSecondary" gutterBottom className={styles.mb14} >
                사용자
              </Typography>
              <Paper component="form" variant="outlined" className={styles.inputGroup} onClick={onClick}>
                {/* <InputBase className={styles.input} margin="dense" onChange={(event) => onUserChanged(event.target.value)} /> */}
                <InputBase placeholder="전체" className={styles.input} value={userName} margin="dense" disabled />
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2"  color="textSecondary" gutterBottom className={styles.mb14} >
                {dateText || "요청일자"}
              </Typography>
              <Grid container spacing={1}>
                <Grid item style={{padding:0,marginRight:'5px'}}>
                  <TextField
                    id="date"
                    type="date"
                    defaultValue="MM/dd/yyyy"
                    variant="outlined"
                    onChange={startChangeDate}
                    style={{ marginTop: '3px' }}
                    inputProps={{
                      style: {
                        padding: '9px',
                      }
                    }}
                  />
                </Grid>
                <Grid item style={{padding:0}}>
                  <TextField
                    id="date"
                    type="date"
                    defaultValue="MM/dd/yyyy"
                    variant="outlined"
                    onChange={endChangeDate}
                    style={{ marginTop: '3px' }}
                    inputProps={{
                      style: {
                        padding: '9px',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={onSearch} color="primary" className={styles.searchBtn} >
              검색
            </Button>
          </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  },
);

export default SearchFormAll;
