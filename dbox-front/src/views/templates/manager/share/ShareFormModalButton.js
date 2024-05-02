import { makeStyles } from "@material-ui/core";
import ShareGroupAuthAddDeptButtonContainer from "views/containers/manager/share/shareGroupAuth/button/ShareGroupAuthAddDeptButtonContainer";
import ShareGroupAuthCreateButtonContainer from "views/containers/manager/share/shareGroupAuth/button/ShareGroupAuthCreateButtonContainer";
import ShareGroupAuthDeleteButtonContainer from "views/containers/manager/share/shareGroupAuth/button/ShareGroupAuthDeleteButtonContainer";
import ShareGroupAuthRefleshButtonContainer from "views/containers/manager/share/shareGroupAuth/button/ShareGroupAuthRefleshButtonContainer";

console.log("ShareFormModalButton.js");

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    float: "right",
    display: "flex",
  },
}));

export default function ShareFormModalButton() {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
      <ShareGroupAuthCreateButtonContainer />
      <ShareGroupAuthAddDeptButtonContainer />
      <ShareGroupAuthDeleteButtonContainer />
      <ShareGroupAuthRefleshButtonContainer />
    </div>
  );
}
