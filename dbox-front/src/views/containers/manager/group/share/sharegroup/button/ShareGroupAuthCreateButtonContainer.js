import { useState } from "react";
import ShareGroupAuthCreateButton from "views/templates/manager/group/share/sharegroup/button/ShareGroupAuthCreateButton";
import ShareGroupApi from "apis/sharegroup-api";

console.debug("ShareGroupAuthCreateButtonContainer.js");

export default function ShareGroupAuthCreateButtonContainer({ comCode, leftGridgetData, rightGridgetData, onResetGridData }) {
  const [confirmCreateOpened, setConfirmCreateOpened] = useState(false);
  const [checkValue, setCheckValue] = useState("");
  const [checkContentValue, setCheckContentValue] = useState("");
  const [checkComCode, setCheckComCode] = useState(comCode != "DKG" ? comCode : "");
  const [alertModalOpened, setAlertModalOpend] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  const onCheckValue = (checkValue) => {
    setCheckValue(checkValue);
  };

  const onCheckContentValue = (checkContentValue) => {
    setCheckContentValue(checkContentValue);
  };

  const onCheckComCode = (checkComCode) => {
    setCheckComCode(checkComCode);
  };

  /**
   * 공유그룹추가 확인
   */
  const createShareGroup = async () => {
    if (checkComCode != "" && checkValue != "" && checkContentValue != "") {
      try {
        await ShareGroupApi.createShareGroup({
          params: {
            uComCode: checkComCode,
            uShareName: checkValue,
            uShareDesc: checkContentValue,
          },
        });
      } catch (e) {
        console.error(e);
      }
      setConfirmCreateOpened(false);
      setClearOpened(true);
      onCheckValue("");
      onCheckContentValue("");
      onCheckComCode(comCode);
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
    <ShareGroupAuthCreateButton
      confirmCreateOpened={confirmCreateOpened}
      onCreateOkClick={createShareGroup}
      onCreateButtonClick={openConfirmCreate}
      onCreateClose={closeConfirmCreate}
      onCheckValue={onCheckValue}
      onCheckContentValue={onCheckContentValue}
      onCheckComCode={onCheckComCode}
      closeAlertDialog={closeAlertDialog}
      alertModalOpened={alertModalOpened}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      comCode={comCode}
    />
  );
}
