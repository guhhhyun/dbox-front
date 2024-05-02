import { Fragment } from "react";
import EnqueueSnackbar from "./EnqueueSnackbar";

console.debug("SnackbarMessage.js");

export default function SnackbarMessage({ severity, title, message }) {
  return (
    <Fragment>
      <EnqueueSnackbar severity={severity} title={title} message={message} />
      {message}
    </Fragment>
  );
}
