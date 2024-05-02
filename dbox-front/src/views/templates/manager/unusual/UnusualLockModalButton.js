import { Fragment } from "react";
import { Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ListAltIcon from '@material-ui/icons/ListAlt';
import styles from "./UnusualLockModalButton.module.css";

console.debug("UnusualLockModalButton.js");

export default function UnusualLockModalButton({ opened, onButtonClick, onModalOkClick, onModalClose }) {

  const okText = '예';
  const cancelText = '아니오';

  return (
    <Fragment>
      <h3 className={styles.h3}><ListAltIcon />수동 잠금 대상 List</h3>
      <Button variant="contained" onClick={onButtonClick} color="primary" disableElevation className={styles.btnRight}>
        잠금
      </Button>
      <ConfirmDialog open={opened} okText={okText} cancelText={cancelText} onOkClick={onModalOkClick} onClose={onModalClose} maxWidth="sm" fullWidth>
        총 2명의 사용자를 잠금처리 하시겠습니까?
      </ConfirmDialog>
    </Fragment>
  );
}
