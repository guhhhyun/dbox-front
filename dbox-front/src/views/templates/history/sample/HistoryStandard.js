import { Fragment, useEffect, useState } from "react";
import { Typography, TextField, Grid, FormControl, Select, MenuItem, IconButton, Paper, InputBase, InputLabel, Button, withStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import SearchIcon from '@material-ui/icons/Search';
import styles from "./HistoryStandard.module.css";

console.log("HistoryStandard.js");


export default function HistoryStandard() {
  const now = new Date();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);


  /**
   * 날짜 입력 시 이벤트
   */
  const startChangeDate = (pickedDate) => {
    setStartDate(pickedDate);
  };

  const endChangeDate = (pickedDate) => {
    setEndDate(pickedDate);
  };

  return (
    <Fragment>
      <Grid container className={styles.searchBox} spacing={2}>
        <Grid item>
          <FormControl variant="outlined">
            <Typography color="textSecondary" gutterBottom style={{ marginBottom: "14px" }}>
              회사
            </Typography>
            <Select id="demo-simple-select-outlined" margin="dense" className={styles.input} style={{ width: "100px" }}>
              <MenuItem value={1}>전 체</MenuItem>
              <MenuItem value={2}>동국제강</MenuItem>
              <MenuItem value={3}>인터지스</MenuItem>
              <MenuItem value={4}>동국시스템즈</MenuItem>
              <MenuItem value={5}>페럼인프라</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom>
            부서
          </Typography>
          {/* <TextField id="outlined-input" variant="outlined" margin="dense" className={styles.input} /> */}
          <Paper component="form" variant="outlined" className={styles.inputGroup}>
            <InputBase
              className={styles.input}
              margin="dense"
            />
            <IconButton type="submit" aria-label="search" size="small">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom>
            사용자
          </Typography>
          {/* <TextField id="outlined-input" variant="outlined" margin="dense" className={styles.input} /> */}
          <Paper component="form" variant="outlined" className={styles.inputGroup}>
            <InputBase
              className={styles.input}
              margin="dense"
            />
            <IconButton type="submit" aria-label="search" size="small">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom>
            기준 초과일
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
                id="date"
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
      </Grid>
    </Fragment >
  );
}