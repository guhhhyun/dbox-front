import { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "./Alarm.module.css";

console.debug("AlarmCompanyButton.js");
export default function AlarmCompanyButton({ comCode, company, onClickCompany }) {
  return (
    <Fragment>
      {comCode === "DKG" ? (
        <ButtonGroup disableElevation variant="contained" className={styles.btn} size="large" color="primary" aria-label="large outlined primary button group">
          <Button color={company === "DKS" ? "primary" : "secondary"} onClick={() => onClickCompany("DKS")}>
            동국제강
          </Button>
          <Button color={company === "ITG" ? "primary" : "secondary"} onClick={() => onClickCompany("ITG")}>
            인터지스
          </Button>
          <Button color={company === "UNC" ? "primary" : "secondary"} onClick={() => onClickCompany("UNC")}>
            동국시스템즈
          </Button>
          <Button color={company === "FEI" ? "primary" : "secondary"} onClick={() => onClickCompany("FEI")}>
            페럼인프라
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup disableElevation variant="contained" className={styles.btn} size="large" color="primary" aria-label="large outlined primary button group">
          <Button disabled={company === "DKS" ? false : true}>동국제강</Button>
          <Button disabled={company === "ITG" ? false : true}>인터지스</Button>
          <Button disabled={company === "UNC" ? false : true}>동국시스템즈</Button>
          <Button disabled={company === "FEI" ? false : true}>페럼인프라</Button>
        </ButtonGroup>
      )}
    </Fragment>
  );
}
