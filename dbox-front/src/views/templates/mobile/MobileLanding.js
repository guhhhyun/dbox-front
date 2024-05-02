import React from "react";
import { Typography } from "@material-ui/core";
import imgLock from "assets/imgs/img-lock.png";

export default function MobileLanding() {
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
        <Typography variant="h6">모바일화면</Typography>
        <br />
      </div>
    </div>
  );
}
