import { useState, useRef } from "react";
import ShareGroupAuthUpdateButton from "views/templates/manager/group/share/sharegroup/button/ShareGroupAuthUpdateButton";
import ShareGroupApi from "apis/sharegroup-api";

console.debug("ShareGroupAuthUpdateButtonContainer.js");

export default function ShareGroupAuthUpdateButtonContainer({ shareGroupGridData, leftGridgetData, onResetGridData }) {
  const [confirmCreateOpened, setConfirmCreateOpened] = useState(false);
  const [checkValue, setCheckValue] = useState(null);
  const [alertModalOpened, setAlertModalOpend] = useState(false);
  const [checkContentValue, setCheckContentValue] = useState(null);
  const [clearOpened, setClearOpened] = useState(false);

  const getCheckValue = (checkValue) => {
    setCheckValue(checkValue);
  };

  const getCheckContentValue = (checkContentValue) => {
    setCheckContentValue(checkContentValue);
  };

  /**
   * 공유그룹수정 확인
   */
  const patchShareGroup = async () => {
    if (checkValue != "" && checkContentValue != "") {
      try {
        await ShareGroupApi.patchShareGroup({
          params: {
            rObjectId: shareGroupGridData.rObjectId,
            uShareName: checkValue === null ? shareGroupGridData.uShareName : checkValue,
            uShareDesc: checkContentValue === null ? shareGroupGridData.uShareDesc : checkContentValue,
          },
        });
      } catch (e) {
        console.error(e);
      }
      setConfirmCreateOpened(false);
      setClearOpened(true);
      leftGridgetData();
      onResetGridData([]);
    } else {
      openAlertDialog();
    }
  };

  /**
   * 확인창 열기
   */
  const openConfirmCreate = () => {
    setConfirmCreateOpened(true);
  };

  /**
   * 확인창 닫기
   */
  const closeConfirmCreate = () => {
    setCheckValue(null);
    setCheckContentValue(null);
    setConfirmCreateOpened(false);
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
    <ShareGroupAuthUpdateButton
      confirmCreateOpened={confirmCreateOpened}
      onCreateOkClick={patchShareGroup}
      onCreateButtonClick={openConfirmCreate}
      onCreateClose={closeConfirmCreate}
      getCheckValue={getCheckValue}
      getCheckContentValue={getCheckContentValue}
      shareGroupGridData={shareGroupGridData}
      closeAlertDialog={closeAlertDialog}
      alertModalOpened={alertModalOpened}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
    />
  );
}
