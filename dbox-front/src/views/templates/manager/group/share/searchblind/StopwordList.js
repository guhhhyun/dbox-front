import { Fragment, useEffect, useState } from "react";
import { Typography, Box, Grid, FormControl, Select, MenuItem, IconButton, Paper, InputBase } from "@material-ui/core";
import styles from "./SearchBlind.module.css";

console.debug("StopwordList.js");

export default function StopwordList() {
  return (
    <Fragment>
      <Paper component="form" variant="outlined" className={styles.inputGroup}>
        <Grid container>
          <Grid item xs={2}>
            <Typography color="textSecondary" gutterBottom>
              설정된 불용어
            </Typography>
          </Grid>
          <Grid item xs={10}>
              급여, 계약
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}
