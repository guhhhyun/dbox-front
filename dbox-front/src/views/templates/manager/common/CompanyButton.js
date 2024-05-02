import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CommonButtonContainer from "views/containers/manager/common/CommonButtonContainer";
import styles from "./Common.module.css";

console.debug("CommonButton.js");

export default function CommonButton({ type, onClick }) {
  switch (type) {
    // type 값에 따라서 onclick 조회 값 보내면 될듯?
    case "J":
      return (
        <Fragment>
          <div className={styles.btn}>
            <CommonButtonContainer buttonName="동국제강" onClick={onClick} />
          </div>
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <ButtonGroup className={styles.btn} size="large" color="primary" aria-label="large outlined primary button group">
            <Button>동국제강</Button>
            <Button>인터지스</Button>
            <Button>동국시스템즈</Button>
            <Button>페럼인프라</Button>
          </ButtonGroup>
        </Fragment>
      );
  }
}
