import { Fragment } from "react";
import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select, withStyles } from "@material-ui/core";
import CompanyTemplateListContainer from "views/containers/manager/group/manageconfig/companytemplate/CompanyTemplateListContainer";
import styles from "./CompanyTemplateForm.module.css";
import { forwardRef } from "react";

console.log("CompanyTemplateForm.js");

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

const CompanyTemplateForm = forwardRef(({ onCompanyChange, company, comCode }, ref) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={styles.contents}>
        <Box className={styles.action}>
          <FormControl variant="outlined" className={[classes.input, classes.mgr10]}>
            <StyledInputLabel>회사 명</StyledInputLabel>
            {comCode === "DKG" ? (
              <Select margin="dense" defaultValue={"DKS"} onChange={onCompanyChange}>
                <MenuItem value={"DKS"}>동국제강</MenuItem>
                <MenuItem value={"ITG"}>인터지스</MenuItem>
                <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
                <MenuItem value={"FEI"}>페럼인프라</MenuItem>
              </Select>
            ) : comCode != "DKG" ? (
              <Select margin="dense" defaultValue={comCode}>
                <MenuItem value={comCode}>
                  {comCode === "DKS" ? "동국제강" : comCode === "ITG" ? "인터지스" : comCode === "UNC" ? "동국시스템즈" : comCode === "FEI" ? "페럼인프라" : ""}
                </MenuItem>
              </Select>
            ) : null}
          </FormControl>
        </Box>
        <Box>
          <CompanyTemplateListContainer company={company} ref={ref} />
        </Box>
      </Box>
    </Fragment>
  );
});
export default CompanyTemplateForm;
