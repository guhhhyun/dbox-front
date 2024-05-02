import { Fragment } from "react";
import { Box, FormControl, InputLabel, makeStyles, withStyles, MenuItem, Select } from "@material-ui/core";
import styles from "./StoragePeriodForm.module.css";
import { forwardRef } from "react";
import StoragePeriodTableContainer from "views/containers/manager/group/manageconfig/storageperiod/StoragePeriodTableContainer";
import { useSelector } from "react-redux";

console.log("StoragePeriodForm.js");

const useStyles = makeStyles((theme) => ({
  input: {
    width: "150px",
  },
  mgr10: {
    marginRight: theme.spacing(1),
  },
}));

const StyledInputLabel = withStyles((theme) => ({
  outlined: {
    transform: "translate(14px, 12px) scale(1)",
  },
}))(InputLabel);

const StoragePeriodForm = forwardRef(({ onCompanyChange, company }, ref) => {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={styles.contents}>
        <Box className={styles.action}>
          <FormControl variant="outlined" className={[classes.input, classes.mgr10]}>
            <StyledInputLabel>회사 명</StyledInputLabel>
            {comCode === "DKG" ? (
              <Select margin="dense" value={company ? company : ""} onChange={onCompanyChange}>
                <MenuItem value={"DKS"}>동국제강</MenuItem>
                <MenuItem value={"ITG"}>인터지스</MenuItem>
                <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
                <MenuItem value={"FEI"}>페럼인프라</MenuItem>
              </Select>
            ) : comCode != "DKG" ? (
              <Select margin="dense" name="company" defaultValue={comCode} style={{ width: "150px" }}>
                <MenuItem value={comCode}>
                  {comCode === "DKS" ? "동국제강" : comCode === "ITG" ? "인터지스" : comCode === "UNC" ? "동국시스템즈" : comCode === "FEI" ? "페럼인프라" : ""}
                </MenuItem>
              </Select>
            ) : null}
          </FormControl>
        </Box>
        <Box>
          <StoragePeriodTableContainer company={company} ref={ref} />
        </Box>
      </Box>
    </Fragment>
  );
});
export default StoragePeriodForm;
