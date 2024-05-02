import { useState } from "react";
import ShareGroupAuthAddDeptButton from "views/templates/manager/group/share/sharegroup/button/ShareGroupAuthAddDeptButton";
import ShareGroupApi from "apis/sharegroup-api";

console.debug("ShareGroupAuthAddDeptButtonContainer.js");

export default function ShareGroupAuthAddDeptButtonContainer({ shareGroupGridData, leftGridgetData, rightGridgetData }) {
  const [confirmShareGroupOpened, setConfirmShareGroupOpened] = useState(false);
  const [alertModalOpened, setAlertModalOpend] = useState(false);
  const [deptTreeOrgId, setDeptTreeOrgId] = useState();
  const [clearOpened, setClearOpened] = useState(false);

  /**
   *  조직도 트리 - 부서코드 값
   */
  const clickTreeOrgId = (deptTreeOrgId) => {
    setDeptTreeOrgId(deptTreeOrgId);
  };

  /**
   * 확인버튼클릭
   */
  const saveShareGroupDept = async () => {
    if (deptTreeOrgId != undefined) {
      try {
        const response = await ShareGroupApi.patchDept({
          params: {
            rObjectId: shareGroupGridData.rObjectId,
            uDeptCode: deptTreeOrgId,
          },
        });
      } catch (e) {
        console.error(e);
      }
      setConfirmShareGroupOpened(false);
      setClearOpened(true);
      leftGridgetData();
      rightGridgetData(shareGroupGridData.rObjectId);
      setDeptTreeOrgId();
    } else {
      openAlertDialog();
    }
  };

  /**
   * 모달 열기
   */
  const openConfirm = () => {
    setConfirmShareGroupOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeConfirm = () => {
    setConfirmShareGroupOpened(false);
  };

  /**
   * 알림 모달 열기
   */
  const openAlertDialog = () => {
    setAlertModalOpend(true);
  };

  /**
   * 알림 모달 닫기
   */
  const closeAlertDialog = () => {
    setAlertModalOpend(false);
  };

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <ShareGroupAuthAddDeptButton
      confirmShareGroupOpened={confirmShareGroupOpened}
      onConfirmOkClick={saveShareGroupDept}
      onConfirmButtonClick={openConfirm}
      onConfirmClose={closeConfirm}
      clickTreeOrgId={clickTreeOrgId}
      shareGroupGridData={shareGroupGridData}
      closeAlertDialog={closeAlertDialog}
      alertModalOpened={alertModalOpened}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
    />
  );
}
