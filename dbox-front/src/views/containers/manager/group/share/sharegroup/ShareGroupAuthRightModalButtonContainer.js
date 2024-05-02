import ShareGroupAuthRightModalButton from "views/templates/manager/group/share/sharegroup/ShareGroupAuthRightModalButton";

console.debug("ShareGroupAuthRightModalButtonContainer.js");

export default function ShareGroupAuthRightModalButtonContainer({
  deptGridData,
  shareGroupGridData,
  leftGridgetData,
  rightGridgetData,

  clickDeptGridData,
}) {
  return (
    <ShareGroupAuthRightModalButton
      shareGroupGridData={shareGroupGridData}
      deptGridData={deptGridData}
      leftGridgetData={leftGridgetData}
      rightGridgetData={rightGridgetData}
      clickDeptGridData={clickDeptGridData}
    />
  );
}
