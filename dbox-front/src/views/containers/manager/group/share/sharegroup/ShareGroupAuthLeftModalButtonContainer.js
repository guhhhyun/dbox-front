import ShareGroupAuthLeftModalButton from "views/templates/manager/group/share/sharegroup/ShareGroupAuthLeftModalButton";

console.debug("ShareGroupAuthLeftModalButtonContainer.js");

export default function ShareGroupAuthLeftModalButtonContainer({ comCode, shareGroupGridData, leftGridgetData, rightGridgetData, onResetGridData }) {
  return (
    <ShareGroupAuthLeftModalButton
      comCode={comCode}
      shareGroupGridData={shareGroupGridData}
      leftGridgetData={leftGridgetData}
      rightGridgetData={rightGridgetData}
      onResetGridData={onResetGridData}
    />
  );
}
