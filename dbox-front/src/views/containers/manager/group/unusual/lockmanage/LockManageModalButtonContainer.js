import { Fragment, useState } from "react";
import AlertDialog from "views/commons/dialog/AlertDialog";
import UnlockModalButton from "views/templates/manager/group/unusual/lockmanage/UnlockModalButton";
import UnusualApi from "apis/unusual-api";

console.debug("LockManageModalButtonContainer.js");

export default function LockManageModalButtonContainer({ checkedList, getData }) {
  const [opened, setOpened] = useState(false);
  const [openedAlert, setOpenedAlert] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const buttonOption = {
    buttonName: "해제",
    content: checkedList.length + "명을 잠금 해제 하시겠습니까? \n해제사유를 작성해 주시기 바랍니다.",
  };

  const content = "잠금 해제 대상을 선택해주세요";

  /**
   * 유효성 검사
   */
  const validation = () => {
    let error = "";
    if (!requestReason) {
      error = "해제 사유를 입력해주세요";
    }

    if (error) {
      setErrorMsg(error);
      openAlertModal();
      return false;
    }
    return true;
  };

  /**
   * Alert 모달 열기
   */
  const openAlertModal = () => {
    setAlertOpened(true);
  };

  /**
   * Alert 모달 닫기
   */
  const closeAlertModal = () => {
    setAlertOpened(false);
  };
  /**
   * Alert 확인버튼
   */
  const onAlertDialogOkClick = () => {
    setAlertOpened(false);
  };

  /**
   * 잠금해제 처리 저장
   */
  const onModalOkClick = () => {
    const valid = validation();

    if (valid) {
      checkedList.map((checked) => onSave(checked.data));
      setOpened(false);
    }
  };

  /**
   * 잠금해제 처리 설정
   */
  const onSave = async (params) => {
    try {
      const response = await UnusualApi.patchUnusual({
        params: {
          rObjectId: params.rObjectId,
          userObjectId: params.userObjectId,
          uLockStatus: "U",
          uUndesigReason: requestReason,
        },
      });
      if (response.status == 200) {
        console.log("OK");
      } else {
        throw new Error(response.data.message);
      }
      getData();
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 모달 열기
   */
  const openModal = () => {
    if (checkedList.length == 0) {
      setOpenedAlert(true);
    } else {
      setOpened(true);
    }
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * alert 확인 버튼
   */
  const onAlertClick = () => {
    setOpenedAlert(false);
  };

  return (
    <Fragment>
      <AlertDialog open={alertOpened} content={errorMsg} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />
      <AlertDialog open={openedAlert} content={content} onOkClick={onAlertClick} />
      <UnlockModalButton
        buttonOption={buttonOption}
        opened={opened}
        onButtonClick={openModal}
        onModalOkClick={onModalOkClick}
        onModalClose={closeModal}
        onRequestReasonChanged={setRequestReason}
      />
    </Fragment>
  );
}
