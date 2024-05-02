import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Button } from "@material-ui/core";
import UploadModalContainer from "views/containers/upload/UploadModalContainer";
import styles from "views/templates/agent/AgentDownload.module.css";


const UploadModalButton = forwardRef(function ({ onUnlockRequestClick }, ref) {
  const unlockRef = useRef(null);

  useImperativeHandle(ref, () => ({
    unlock: unlockRef.current,
  }));

  return (
    <Fragment>
      <Button onClick={onUnlockRequestClick} fullWidth variant="contained" color="secondary" className={styles.submit}>업로드</Button>
      <UploadModalContainer ref={unlockRef} />
    </Fragment>
  );
});

export default UploadModalButton;
