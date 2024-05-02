import { makeStyles } from "@material-ui/core";
import ShareGroupAuthAddDeptButtonContainer from "views/containers/manager/group/share/sharegroup/button/ShareGroupAuthAddDeptButtonContainer";
import ShareGroupAuthRefreshButtonContainer from "views/containers/manager/group/share/sharegroup/button/ShareGroupAuthRefreshButtonContainer";
import ShareGroupAuthDeptDeleteButtonContainer from "views/containers/manager/group/share/sharegroup/button/ShareGroupAuthDeptDeleteButtonContainer";
import { Fragment } from "react";

console.log("ShareGroupAuthRightModalButton.js");

const useStyles = makeStyles((theme) => ({
  buttonRightGroup: {
    "& > *": {
      margin: theme.spacing(0.3),
      marginTop: theme.spacing(1),
    },
    float: "right",
    display: "flex",
    paddingRight:"10px"
  },
}));

export default function ShareGroupAuthRightModalButton({ deptGridData, shareGroupGridData, leftGridgetData, rightGridgetData, clickDeptGridData }) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.buttonRightGroup}>
        <ShareGroupAuthAddDeptButtonContainer shareGroupGridData={shareGroupGridData} leftGridgetData={leftGridgetData} rightGridgetData={rightGridgetData} />
        <ShareGroupAuthDeptDeleteButtonContainer
          shareGroupGridData={shareGroupGridData}
          deptGridData={deptGridData}
          leftGridgetData={leftGridgetData}
          rightGridgetData={rightGridgetData}
          clickDeptGridData={clickDeptGridData}
        />
        <ShareGroupAuthRefreshButtonContainer shareGroupGridData={shareGroupGridData} leftGridgetData={leftGridgetData} rightGridgetData={rightGridgetData} />
      </div>
    </Fragment>
  );
}
