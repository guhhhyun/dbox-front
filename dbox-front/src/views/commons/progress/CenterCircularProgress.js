import { CircularProgress } from "@material-ui/core";

console.debug("CenterCircularProgress.js");

export default function CenterCircularProgress() {
  return <CircularProgress style={{ position: "absolute", top: "50%", left: "50%" }} />;
}
