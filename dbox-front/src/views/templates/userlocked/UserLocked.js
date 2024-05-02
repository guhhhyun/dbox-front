import React from "react";
import { Typography } from "@material-ui/core";
import UserUnlockRequestModalButtonContainer from "views/containers/userlocked/UserUnlockRequestModalButtonContainer";
import imgLock from "assets/imgs/img-lock.png";

export default function UserLocked() {
  const makeStyles = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    textAlign: "center",
    width: "500px",
    height: "500px",
  };

  return (
    <div>
      <div style={makeStyles}>
        <img src={imgLock} alt="loading" />
        <br />
        <br />
        <Typography variant="h6">해당 계정은 잠금 처리되어 있어 접근이 불가능합니다.</Typography>
        <Typography variant="h4">잠금 해제를 요청하시겠습니까?</Typography>
        <br />
        <br />
        <UserUnlockRequestModalButtonContainer />
      </div>
    </div>
  );
}
