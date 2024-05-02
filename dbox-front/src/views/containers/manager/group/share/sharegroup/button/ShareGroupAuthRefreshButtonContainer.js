import ShareGroupAuthRefreshButton from "views/templates/manager/group/share/sharegroup/button/ShareGroupAuthRefreshButton";

console.debug("ShareGroupAuthRefreshButtonContainer.js");

export default function ShareGroupAuthRefreshButtonContainer({ shareGroupGridData, leftGridgetData, rightGridgetData }) {
  /**
   * 새로고침
   */

  const refreshButton = () => {
    leftGridgetData();
    rightGridgetData(shareGroupGridData.rObjectId);
  };

  return <ShareGroupAuthRefreshButton refreshButton={refreshButton} />;
}
