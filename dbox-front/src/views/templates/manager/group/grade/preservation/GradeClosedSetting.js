import React, { Fragment } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography, FormControlLabel, Checkbox, Divider, Box,  makeStyles, withStyles  } from "@material-ui/core";
import { ListAlt, Label} from "@material-ui/icons";
import GradeClosedSettingTable from "./GradeClosedSettingTable";
import styles from "./GradeClosedSetting.module.css";
import {COM_CODE} from "constants/code-constants";

const StyledFormControl = withStyles((theme) => ({
  root: {
    width: '150px',
    marginRight: theme.spacing(1)
  },
}))(FormControl);

const StyledSelect = withStyles((theme) => ({
  root: {
    padding: "7.5px",
  },
}))(Select);

const StyledInputLabel = withStyles((theme) => ({
  outlined: {
        transform: "translate(14px, 9px) scale(1)",
      },
}))(InputLabel);

const StyledButton = withStyles((theme) => ({
  root: {
    height: "34px",
    backgroundColor: "#00234b",
    color: "#ffffff",
    "&:hover": {
        backgroundColor: "#00234b"
    }
  },
}))(Button);


export default function GradeClosedSetting(
  {
    company,
    preservPeriod,
    setOptions,
    onChangeCompany,
    onChangePeriod
  }) {

  const onClickToChangePeriod = () => {
    const company = COM_CODE[preservPeriod.u_com_code]?.desc;
    const options = {
      action: "patchPreservationPeriod",
      opened: true,
      title: "Closed 문서 등급 별 보존연한 설정",
      children: (
        <>
          <Typography variant="body1"><strong>{company} </strong> 의 Closed 문서 등급 별 보존연한을 변경합니다.</Typography>
        </>
      )
    }
    setOptions(options)
  }

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
        <ListAlt /> 보안 등급별 보존연한
      </Typography>
      <Divider></Divider>
      {/* 회사 확인 */}
      <Box pt={4} pb={4}>
        <Grid container>
          <Grid item={12} >
            <StyledFormControl variant="outlined">
              <StyledInputLabel>회사 명</StyledInputLabel>
                <StyledSelect margin="dense" value={company} onChange={onChangeCompany}>
                  <MenuItem value={"DKS"}>동국제강</MenuItem>
                  <MenuItem value={"ITG"}>인터지스</MenuItem>
                  <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
                  <MenuItem value={"FEI"}>페럼인프라</MenuItem>
                </StyledSelect>
            </StyledFormControl>
          </Grid>
        </Grid>
      </Box>
      <Box pb={4}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h4" gutterBottom className={styles.h4}>
              <Label color="primary"/> 변경 적용 이후 등록되는 문서에 적용(기존문서 보존연한 유지)
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ marginBottom: "10px" }}>
            <StyledButton onClick={onClickToChangePeriod} variant="contained" size="small" disableElevation className={[styles.btn, styles.btnRight]} color="primary">
              저장
            </StyledButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <GradeClosedSettingTable
              preservPeriod={preservPeriod}
              onChangePeriod={onChangePeriod}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={preservPeriod.u_pjt_ever_flag === 1}
              name="u_pjt_ever_flag"
              onChange={onChangePeriod}/>
          }
          label="프로젝트/투자 및 연구과제 등록 문서 보존연한 영구 설정"
          style={{ marginTop: "10px" }}
        />
      </Box>
    </Fragment>
  );
}
