import ManageIdSearch from "views/templates/manager/group/managepolicy/manageid/ManageIdSearch";
import { useState } from "react";

console.debug("ManageIdSearchContainer.js");

export default function ManageIdSearchContainer({ onSearchTreeData, comCode }) {
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [treeCompanyData, setTreeCompanyData] = useState("");
  const [treeDeptData, setTreeDeptData] = useState("");
  const [treeUserData, setTreeUserData] = useState("");
  const [alertModalOpend, setAlertModalOpend] = useState(false);

  const onClickTreeCompanyData = (treeCompanyData) => {
    setTreeCompanyData(treeCompanyData);
  };

  const onClickTreeDeptData = (treeDeptData) => {
    setTreeDeptData(treeDeptData);
  };

  const onClickTreeUserData = (treeUserData) => {
    setTreeUserData(treeUserData);
  };

  const openAlertDialog = () => {
    setAlertModalOpend(true);
  };

  const closeAlertDialog = () => {
    setAlertModalOpend(false);
  };

  /**
   * 트리모달 열기
   */
  const onConfirmOpen = () => {
    setConfirmOpened(true);
  };

  /**
   * 트리모달 닫기
   */
  const onConfirmClose = () => {
    setConfirmOpened(false);
    setTreeCompanyData("");
    setTreeDeptData("");
    setTreeUserData("");
  };

  /**
   * 조직도 확인 클릭
   */
  const onOkClickTreeModal = () => {
    treeCompanyData === "" && treeDeptData === "" && treeUserData === "" ? openAlertDialog() : setConfirmOpened(false);
  };

  /**
   * 검색버튼 클릭
   */
  const onSearchClick = () => {
    comCode === "DKG"
      ? onSearchTreeData(treeCompanyData.comOrgId, treeDeptData.orgId, treeUserData.userId)
      : onSearchTreeData(comCode, treeDeptData.orgId, treeUserData.userId);
  };

  return (
    <ManageIdSearch
      confirmOpened={confirmOpened}
      onOkClickTreeModal={onOkClickTreeModal}
      onConfirmOpen={onConfirmOpen}
      onConfirmClose={onConfirmClose}
      onClickTreeDeptData={onClickTreeDeptData}
      onClickTreeUserData={onClickTreeUserData}
      onClickTreeCompanyData={onClickTreeCompanyData}
      treeDeptData={treeDeptData}
      treeUserData={treeUserData}
      treeCompanyData={treeCompanyData}
      onSearchClick={onSearchClick}
      alertModalOpend={alertModalOpend}
      closeAlertDialog={closeAlertDialog}
      comCode={comCode}
    />
  );
}
