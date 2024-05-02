import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {COM_CODE} from "constants/code-constants";
import DateFnsUtils from '@date-io/date-fns';
import {ko} from "date-fns/locale";

export default function AutoClearSearchForm(
  {
    selectedCompany,
    selectedDept,
    filteredDepts,
    versionCount,
    onChangeObjectName,
    onChangeVersionCount,
    startDate,
    startChangeDate,
    endDate,
    endChangeDate,
    onChangeCompany,
    onChangeDept,
    onSearch
  })
{

  const companies = () => {
    const values = Object.values(COM_CODE);
    values.unshift({key: "", desc: "전체"})
    return values;
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          그룹사
        </Typography>
        <Autocomplete
          size="small"
          value={selectedCompany}
          options={companies()}
          getOptionLabel={(option) => option.desc}
          renderInput={(params) => <TextField {...params} placeholder="검색" variant="outlined"/>}
          onChange={onChangeCompany}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          부서
        </Typography>
        <Autocomplete
          size="small"
          value={selectedDept}
          options={filteredDepts}
          getOptionLabel={(option) => option.orgNm}
          renderInput={(params) => <TextField {...params} variant="outlined" placeholder="검색"/>}
          onChange={onChangeDept}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          버전 수 ( ~ 개수 이상)
        </Typography>
        <TextField
          type="number"
          size="small"
          variant="outlined"
          placeholder="검색"
          value={versionCount}
          onChange={onChangeVersionCount}
          style={{width: 180}}/>
      </Grid>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          문서 명
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="입력"
          onChange={onChangeObjectName}
          style={{width: 180}}/>
      </Grid>
      <Grid item>
        <Typography color="textSecondary" gutterBottom>
          Closed 일시
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
                maxDate={endDate}
                onChange={startChangeDate}
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
                minDate={startDate}
                onChange={endChangeDate}
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
};
