import {Button, Grid, TextField, Typography} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {ko} from "date-fns/locale";

export default function TransferApprovalSearchForm(
  {
    reqUser,
    reqUsers,
    startDate,
    endDate,
    onChangeReqUser,
    onChangeReqTitle,
    onChangeStartDate,
    onChangeEndDate,
    onSearch
  }) {

  function getOptionLabel(option) {
    const reqUser = option.u_req_user;
    const displayName = option.display_name;
    if(reqUser) {
      return `${displayName} (${reqUser})`
    }
    return displayName;
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          신청자
        </Typography>
        <Autocomplete
          size="small"
          value={reqUser}
          options={reqUsers}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => <TextField {...params} variant="outlined" placeholder="검색"/>}
          onChange={onChangeReqUser}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          요청명
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="검색"
          onChange={onChangeReqTitle}
          style={{width: 180}}/>
      </Grid>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          요청일
        </Typography>
        <Grid container spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center">
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
              <KeyboardDatePicker
                disableToolbar
                size="small"
                variant="inline"
                inputVariant="outlined"
                format="yyyy-MM-dd"
                value={startDate}
                onChange={onChangeStartDate}
                style={{width: 180}}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
              <KeyboardDatePicker
                disableToolbar
                size="small"
                variant="inline"
                inputVariant="outlined"
                format="yyyy-MM-dd"
                value={endDate}
                onChange={onChangeEndDate}
                style={{width: 180}}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onSearch} color="primary">
              검색
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
