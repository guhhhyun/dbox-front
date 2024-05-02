import React from "react";
import { Button, FormControlLabel, Checkbox, Box, Grid, Typography, Paper, InputBase, InputAdornment  } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styles from "./LoginForm.module.css";
import logoDK from "assets/imgs/logo_dk.svg"
import logoDBox from "assets/imgs/logo_dbox01.svg"
import img01 from "assets/imgs/img_login.svg"
import { Person, Lock } from '@material-ui/icons';

export default function LoginForm({ loginId, onLoginIdChanged, password, onPasswordChanged, keepLoginId, onKeepLoginIdChanged, onLoginSubmit }) {
  const { t } = useTranslation("loginForm");

  return (
    <Box className={styles.main}>
      <Grid container>
        <Grid item xs={4}>
          <Box className={styles.loginBox}>
            <img src={logoDBox} alt="Dbox" className={styles.imgLogoDbox} />
            <Typography variant="h1" className={styles.h1} >Login</Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onLoginSubmit();
              }}
              noValidate
            >
              <Paper className={styles.id} elevation={0}>
                <InputBase
                  placeholder="ID"
                  startAdornment={
                    <InputAdornment position="start">
                      <Person color="secondary"/>
                    </InputAdornment>
                  }
                  value={loginId}
                  onChange={(event) => onLoginIdChanged(event.target.value)}
                  autoFocus
                />
                <Typography variant="body2" className={styles.address}>@dongkuk.com</Typography>
              </Paper>
              <Paper className={styles.password} elevation={0}>
                <InputBase
                  placeholder="Password"
                  startAdornment={
                    <InputAdornment position="start">
                      <Lock color="secondary"/> 
                    </InputAdornment>
                  }
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => onPasswordChanged(event.target.value)}
                />
              </Paper>
              <FormControlLabel
              control={<Checkbox color="primary" checked={keepLoginId} onChange={(event) => onKeepLoginIdChanged(event.target.checked)} />}
              label={t("KEEP_LOGIN_ID")}
              className={styles.checkbox}
              />
              <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>
                {t("LOGIN")}
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className={styles.bgImg}>
            <img src={logoDK} className={styles.imgLogoDk} />
            <img src={img01} className={styles.img01}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
