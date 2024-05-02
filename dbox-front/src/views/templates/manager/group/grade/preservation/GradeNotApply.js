import {useEffect, useState} from "react";
import {
  FormControl,
  InputLabel,
  Grid,
  Button,
  Typography,
  Box,
  TextField, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, CircularProgress, withStyles
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Label } from "@material-ui/icons";
import styles from "./GradeNotApply.module.css";
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
}))(Autocomplete);

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

export default function GradeNotApply(
  {
      preservPeriod
    , filteredDept
    , filteredDepts
    , deptsUnusedExt
    , setOptions
    , onChangeDept
    , onButtonClick
  }) {

  /**
   * CheckBox 설정
   */
  const [state, setState] = useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [isPatching, setPatching] = useState(false);
  const [isIncludingHist, setIncludingHist] = useState(true);

  useEffect(() => {
  }, [isIncludingHist]);

  const optionToAlert = {
    opened: true,
    children: (
      <>
        <Typography variant="body1">
          <strong>{filteredDept.orgNm}</strong> 은 이미 추가된 부서 입니다.
        </Typography>
      </>
    ),
    onOkClick: false
  }

  const optionNotToUse = {
    action: "patchDeptNotToUseAutoExtend",
    opened: true,
    title: "부서 추가",
    children: (
      <>
        <Typography variant="body1">
          <strong>{COM_CODE[preservPeriod.u_com_code]?.desc} </strong> 의 <strong>{filteredDept.orgNm}</strong> 부서를 추가합니다.
        </Typography>
      </>
    ),
    patching: setPatching
  }

  const onClickNotToUseAutoExtend = () => {
    if(!filteredDept.orgNm) {
      return;
    }
    const exist = deptsUnusedExt.find(item => {
      const emptyDate = "1753-01-01";
      const uNoExtUnregDate = item?.u_no_ext_unreg_date;
      return item.org_id === filteredDept.orgId && (uNoExtUnregDate === emptyDate || uNoExtUnregDate.trim() === "");
    });
    const option = exist ? optionToAlert : optionNotToUse
    setOptions(option);
  }

  const onClickToUseAutoExtend = (item) => {
    const option = {
      uNoExtDept: item.org_id,
      opened: true,
      title: "부서 해제",
      children: (
        <>
          <Typography variant="body1">
            <strong>{COM_CODE[preservPeriod.u_com_code]?.desc} </strong> 의 <strong>{item.org_nm}</strong> 부서를 해제합니다.
          </Typography>
        </>
      ),
      action: "patchDeptToUseAutoExtend"
    }
    setOptions(option);
  }

  const SpinnerAdornment = () => (
    <CircularProgress
      size={20}
      style={{ color:"#ffffff" }}
    />
  )

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom className={styles.h4}>
          <Label color="primary"/> 보존연한 추가 연장 미적용 부서
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <StyledFormControl variant="outlined">
              <Autocomplete
                size="small"
                value={filteredDept}
                options={filteredDepts}
                getOptionLabel={(option) => option.orgNm}
                renderInput={(params) => <TextField {...params} variant="outlined" placeholder="검색"/>}
                onChange={onChangeDept} />
            </StyledFormControl>
            <StyledButton
              onClick={onClickNotToUseAutoExtend}
              variant="contained"
              size="small"
              disableElevation>
              {isPatching ? <SpinnerAdornment /> : '추가'}
            </StyledButton>
          </Grid>
          <Grid item xs={6}>
            {/*
            <FormControlLabel
              control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA"/>}
              label="해제이력 포함"
              style={{marginLeft:"320px"}}
            />
            <Button onClick={onButtonClick} variant="contained" size="small" disableElevation color="secondary" style={{height:"34px"}}>
            해제
            </Button>
            */}
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="60" align="center">번호</TableCell>
                    <TableCell width="160" align="center">그룹사</TableCell>
                    <TableCell align="center">부 서</TableCell>
                    <TableCell width="180" align="center">설정일</TableCell>
                    <TableCell width="180" align="center">해제일</TableCell>
                    <TableCell width="120" align="center">해 제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deptsUnusedExt.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell height="53" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {COM_CODE[row.u_com_code].desc}
                      </TableCell>
                      <TableCell align="center">{row.org_nm}</TableCell>
                      <TableCell align="center">{row.u_no_ext_reg_date}</TableCell>
                      <TableCell align="center">{row.u_no_ext_unreg_date === '1753-01-01' ? '-' : row.u_no_ext_unreg_date}</TableCell>
                      <TableCell align="center">
                        {row.u_no_ext_unreg_date && row.u_no_ext_unreg_date !== '1753-01-01' ? '-' : <Button onClick={() => {
                          onClickToUseAutoExtend(row);
                        }}>[해제]</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
