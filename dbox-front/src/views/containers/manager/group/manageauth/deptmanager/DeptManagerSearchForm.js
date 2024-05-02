import {Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {COM_CODE} from "constants/code-constants";

export default function DeptManagerSearchForm(
  {
    company,
    selectedDept,
    depts,
    user,
    users,
    position,
    positions,
    onChangeCompany,
    onChangeDept,
    onChangePosition,
    onChangeUser,
    onSearch
  }) {

  // TODO Export.
  const companies = () => {
    const values = Object.values(COM_CODE);
    values.unshift({key: "", desc: "전체"})
    return values;
  }

  const all = (value) => value === "전체";

  const getFilteredDepts = () => {
    const includes = (item) => all(item.orgNm) || item.orgId.includes(company.key);
    return depts.filter(includes);
  }

  const getFilteredPositions = () => {
    const includes = (item) => all(item.pstn_name) || item.pstn_code.includes(company.key);
    return positions.filter(includes);
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Autocomplete
          size="small"
          value={company}
          options={companies()}
          getOptionLabel={(option) => option.desc}
          renderInput={(params) => <TextField {...params} label="회사" variant="outlined" placeholder="검색"/>}
          onChange={onChangeCompany}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          size="small"
          value={selectedDept}
          options={getFilteredDepts()}
          getOptionLabel={(option) => option.orgNm}
          renderInput={(params) => <TextField {...params} label="자료소유부서" variant="outlined" placeholder="검색"/>}
          onChange={onChangeDept}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          size="small"
          value={position}
          options={getFilteredPositions()}
          getOptionLabel={(option) => option.pstn_name}
          renderInput={(params) => <TextField {...params} label="직책/직급" variant="outlined" placeholder="검색"/>}
          onChange={onChangePosition}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          size="small"
          value={user}
          options={users}
          getOptionLabel={(option) => option.display_name}
          renderInput={(params) => <TextField {...params} label="관리자" variant="outlined" placeholder="검색"/>}
          onChange={onChangeUser}
          style={{width: 180}}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onSearch} color="primary">
          검색
        </Button>
      </Grid>
    </Grid>
  );
}
