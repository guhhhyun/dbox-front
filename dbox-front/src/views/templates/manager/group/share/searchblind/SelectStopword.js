import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button, withStyles } from "@material-ui/core";
import styles from "./SearchBlind.module.css";


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


export default function SelectStopword() {
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Box pb={1}>
      <StyledFormControl variant="outlined">
        <StyledInputLabel>불용어 Type </StyledInputLabel>
          <StyledSelect>
            <MenuItem value={10}>그룹 일괄 통제 불용어</MenuItem>
            <MenuItem value={20}>권한별 통제 불용어</MenuItem>
          </StyledSelect>
      </StyledFormControl>
    </Box>
  );
}
