import React, {useState} from "react";
import {FormControl, Grid, MenuItem, Select, Typography} from "@material-ui/core";
import AutoClearModalButtonContainer from "views/containers/manager/group/manageconfig/autoclear/AutoClearModalButtonContainer";
import AutoClearGridContainer from "views/containers/manager/group/manageconfig/autoclear/AutoClearGridContainer";
import AutoClearSearchFormContainer from "views/containers/manager/group/manageconfig/autoclear/AutoClearSearchFormContainer";
import DividerWith from "views/commons/divider/DividerWith";
import AlertDialog from "views/commons/dialog/AlertDialog";
import PeriodItems from "views/commons/item/Period";

export default function AutoClearForm(
  {
    autoClosingData
    , onChangeCompany
    , onChangeElapsedPeriod
    , onChangeNonUsePeriod
  }) {

  const [alert, setAlert] = useState({ open: false });

  const [dataToSearchFor, setDataToSearchFor] = useState({});

  const closeAlert = () => {
    setAlert(Object.assign({}, alert, { open: false }));
    if(typeof alert.callback === "function") {
      alert.callback();
    }
  }

  return (
    <>
      <AlertDialog {...alert} title="[알림]" onOkClick={closeAlert} />
      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end" spacing={2}>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <Typography color="textSecondary" gutterBottom>
              그룹사
            </Typography>
            <Select
              name="company"
              value={autoClosingData.u_code_val1 || ''}
              onChange={onChangeCompany}
              style={{width: "180px"}}>
              <MenuItem value={"DKS"}>동국제강</MenuItem>
              <MenuItem value={"ITG"}>인터지스</MenuItem>
              <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
              <MenuItem value={"FEI"}>페럼인프라</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <Typography color="textSecondary" gutterBottom>
              Closed 처리 후 경과기간
            </Typography>
            <Select
              margin="dense"
              name="elapsedPeriod"
              value={autoClosingData.u_code_val2 || ''}
              onChange={onChangeElapsedPeriod}
              style={{width: "180px"}}>
              {PeriodItems(10, '년')}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" size="small">
            <Typography color="textSecondary" gutterBottom>
              문서 非사용기간
            </Typography>
            <Select
              name="nonUsePeriod"
              value={autoClosingData.u_code_val3 || ''}
              onChange={onChangeNonUsePeriod}
              style={{width: "180px"}}>
              {PeriodItems(11, '개월')}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <AutoClearModalButtonContainer
            autoClosingData={autoClosingData}
            setAlert={setAlert}
          />
        </Grid>
        <Grid item xs={12}>
          <DividerWith margin={0}/>
        </Grid>
        <Grid item xs={12}>
          <Typography>Closed 문서 버전 수동 삭제</Typography>
        </Grid>
        <Grid item xs={12}>
          <AutoClearSearchFormContainer setDataToSearchFor={setDataToSearchFor}/>
          <DividerWith/>
          <AutoClearGridContainer dataToSearchFor={dataToSearchFor} setAlert={setAlert} />
        </Grid>
      </Grid>
    </>
  );
};


