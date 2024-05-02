import { Fragment, useState, useEffect } from "react";
import { Typography, Grid, TextField, Button, Checkbox, Divider, Box, InputLabel, Select, FormControl, withStyles } from "@material-ui/core";
import { ListAlt, Label} from "@material-ui/icons";
import SelectCompany from "views/templates/manager/common/SelectCompany";
import styles from "./UnusualStandard.module.css";

console.debug("UnusualStandardEdit.js");


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


export default function UnusualStandardEdit({
  companyName,
  lockType,
  setLockType,
  deptPer,
  personPer,
  warningNumber,
  onChangeDept,
  onChangePerson,
  onChangeNumber,
  onSubmit,
}) {
  // useEffect(() => {
  //   if (setLockType) setCheckedLockType(setLockType);
  // }, [setLockType]);


  const changeHandler = (checked, value, id) => {
    if (checked) {
      setLockType(value);
    } else {
      setLockType();
    }
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" gutterBottom className={styles.h3}>
              <ListAlt /> 사전 특이사용자 식별 기준값
          </Typography>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Box pt={4} pb={4}> 
            {/* <SelectCompany state={state} handleChange={handleChange} /> */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
        >
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography variant="subtitle1" color="secondary" className={styles.subTitle}>그룹 <Divider className={styles.divider} orientation="vertical" /> {companyName} </Typography>  
            </Grid>
            <Grid item xs={2}  className={styles.textRight}>
              <StyledButton type="submit" variant="contained" color="primary">
                수정
              </StyledButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Box mt={1} p={2} className={styles.contents}>
                <Typography variant="h4" gutterBottom className={styles.h4}>
                    <Label color="primary"/> 잠금 처리
                </Typography>
                <Box mb={1}>
                  <Checkbox
                    value="M"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, e.currentTarget.value, "check");
                    }}
                    checked={lockType === "M" ? true : false}
                    color="primary"
                  />
                  수동
                  <Checkbox
                    value="A"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, e.currentTarget.value, "check");
                    }}
                    checked={lockType === "A" ? true : false}
                    color="primary"
                  />
                  자동
                </Box>
                <Box mb={1}>
                  <Typography variant="body2" className={styles.subTitle} style={{ lineHeight: '2.6' }}> 1. 일별 개인 이력 &gt; 부서 전월 이력의
                    <TextField id="filled-basic" value={deptPer} onChange={onChangeDept} style={{ width: 30 , marginLeft: 10}} />%
                  </Typography>
                  <Typography variant="overline" gutterBottom>
                     ※ 임원의 경우 그룹전체임원 전월 이력
                  </Typography>
                  <br/>
                </Box>
                  <Typography variant="body2" className={styles.subTitle} style={{ lineHeight: '2.6' }}> 2. 일별 개인 이력 &gt; 개인 전월 이력의 
                    <TextField id="filled-basic" value={personPer} onChange={onChangePerson} style={{ width: 30, marginLeft: 10 }} />%
                  </Typography>
                  <Typography variant="overline" gutterBottom>
                      ※ 경고수 : <TextField id="filled-basic" value={warningNumber} onChange={onChangeNumber} style={{ width: 30, height: 10 }} />회 이상
                  </Typography>
              </Box>
            </Grid>
          </Grid>
          </form>
      </Box>
    </Fragment>
  );
}
