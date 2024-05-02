import { FormControl, InputLabel, Typography, Select, Button, Box, withStyles } from "@material-ui/core";
import { Label } from '@material-ui/icons';
import styles from "./GradeExtendDeadline.module.css";
import {COM_CODE} from "constants/code-constants";
import PeriodItems from "views/commons/item/Period";

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

export default function GradeExtendDeadline(
  {
    preservPeriod,
    setOptions,
    onChangePeriod
  }) {

  const onButtonClick = () => {
    const company = COM_CODE[preservPeriod.u_com_code]?.desc;
    const patchAutoExtend = preservPeriod.u_auto_extend;
    const options = {
      action: "patchAutoExtend",
      opened: true,
      title: "보존연한 자동 연장 기간",
      children: (
        <>
          <Typography variant="body1"><strong>{company}</strong> 의 보존연한 자동 연장 기간을 <strong>{patchAutoExtend}</strong> 년 으로 설정합니다.</Typography>
        </>
      )
    }
    setOptions(options)
  }

  return (
      <Box pb={4}>
          <Typography variant="h4" gutterBottom className={styles.h4}>
              <Label color="primary"/> 보존연한 추가 연장 기간 설정
          </Typography>
          <StyledFormControl variant="outlined">
            <StyledInputLabel>기 간</StyledInputLabel>
            <StyledSelect
              variant="outlined"
              margin="dense"
              name="u_auto_extend"
              value={preservPeriod.u_auto_extend || 0}
              onChange={onChangePeriod}>
              {PeriodItems(15, '년')}
            </StyledSelect>
          </StyledFormControl>
          <StyledButton onClick={onButtonClick} variant="contained" size="small" disableElevation color="primary">
                  저장
          </StyledButton>
      </Box>
    );
}
