import { Typography, Divider, makeStyles } from "@material-ui/core";
import ShareGroupAuthUpdateButtonContainer from "views/containers/manager/group/share/sharegroup/button/ShareGroupAuthUpdateButtonContainer";
import ShareGroupAuthCreateButtonContainer from "views/containers/manager/group/share/sharegroup/button/ShareGroupAuthCreateButtonContainer";
import ShareGroupAuthDeleteButtonContainer from "views/containers/manager/group/share/sharegroup/button/ShareGroupAuthDeleteButtonContainer";
import { Fragment } from "react";

console.log("ShareGroupAuthLeftModalButton.js");

const useStyles = makeStyles((theme) => ({
  buttonRightGroup: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    float: "right",
    display: "flex",
  },
  divider: {
      height: 20,
      margin: 14,
    },
}));

export default function ShareGroupAuthLeftModalButton({ comCode, shareGroupGridData, leftGridgetData, rightGridgetData, onResetGridData }) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.buttonRightGroup}>
        <Typography variant="subtitle1" color="secondary" style={{lineHeight:"2.3"}}>공유그룹</Typography>  <Divider className={classes.divider} orientation="vertical" />
        <ShareGroupAuthCreateButtonContainer
          comCode={comCode}
          leftGridgetData={leftGridgetData}
          rightGridgetData={rightGridgetData}
          onResetGridData={onResetGridData}
        />
        <ShareGroupAuthUpdateButtonContainer shareGroupGridData={shareGroupGridData} leftGridgetData={leftGridgetData} onResetGridData={onResetGridData} />
        <ShareGroupAuthDeleteButtonContainer shareGroupGridData={shareGroupGridData} leftGridgetData={leftGridgetData} onResetGridData={onResetGridData} />
      </div>
    </Fragment>
  );
}
