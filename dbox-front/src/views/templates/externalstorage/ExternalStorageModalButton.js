import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Button } from "@material-ui/core";
import ExternalStorageModalContainer from "views/containers/externalstorage/ExternalStorageModalContainer";
import styles from "views/templates/agent/AgentDownload.module.css";


const ExternalStorageModalButton = forwardRef(function ({ onUnlockRequestClick }, ref) {
  const unlockRef = useRef(null);

  useImperativeHandle(ref, () => ({
    unlock: unlockRef.current,
  }));

  return (
    <Fragment>
      <Button onClick={onUnlockRequestClick} fullWidth variant="contained" color="primary" className={styles.submit}>외부저장<br/>매체</Button>
      {/* <ExternalStorageModalContainer ref={unlockRef} /> */}
    </Fragment>
  );
});

export default ExternalStorageModalButton;
