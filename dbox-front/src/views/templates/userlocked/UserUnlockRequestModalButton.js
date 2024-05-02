import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { Button } from "@material-ui/core";
import UserUnlockRequestModalContainer from "views/containers/userlocked/UserUnlockRequestModalContainer";

const UserUnlockRequestModalButton = forwardRef(function ({ onUnlockRequestClick }, ref) {
  const unlockRef = useRef(null);

  useImperativeHandle(ref, () => ({
    unlock: unlockRef.current,
  }));

  return (
    <Fragment>
      <Button onClick={onUnlockRequestClick}  variant="contained" color="primary">잠금 해제 신청</Button>
      <UserUnlockRequestModalContainer ref={unlockRef} />
    </Fragment>
  );
});

export default UserUnlockRequestModalButton;
