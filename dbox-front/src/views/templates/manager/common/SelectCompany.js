import React, { Fragment } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, withStyles } from "@material-ui/core";


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


export default function SelectCompany({ state, handleChange }) {
  return (
      <Grid container>
        <Grid item xs={6} > 
          <StyledFormControl variant="outlined">
            <StyledInputLabel>회사 명</StyledInputLabel>
              <StyledSelect>
                <MenuItem value={"DKS"}>동국제강</MenuItem>
                <MenuItem value={"ITG"}>인터지스</MenuItem>
                <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
                <MenuItem value={"FEI"}>페럼인프라</MenuItem>
              </StyledSelect>
          </StyledFormControl>
        </Grid>
      </Grid>
  );
}
