import { Fragment } from "react";
import { useState } from "react";
import AlertDialog from "views/commons/dialog/AlertDialog";
import SaveModalButton from "views/templates/manager/common/SaveModalButton";
import UnusualApi from "apis/unusual-api";

console.debug("UnLockHistoryModalButtonContainer.js");

export default function UnLockHistoryModalButtonContainer({ checkedList, getData }) {
  const [opened, setOpened] = useState(false);
  const [openedAlert, setOpenedAlert] = useState(false);

  const buttonOption = {
    buttonName: "잠금",
    content: "총 " + checkedList.length + "명의 사용자를 재잠금 처리 하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  const content = "잠금할 대상을 선택해주세요";

  /**
   * 잠금 처리 저장
   */
  const onModalOkClick = () => {
    checkedList.map((checked) => onSave(checked.data));
    setOpened(false);
  };

  /**
   * 잠금 처리 설정
   */
  const onSave = async (params) => {
    try {
      const response = await UnusualApi.patchUnusual({
        params: {
          rObjectId: params.rObjectId,
          userObjectId: params.userObjectId,
          uLockStatus: "L",
          uLockType: params.uLockType,
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
      <AlertDialog open={openedAlert} content={content} onOkClick={onAlertClick} />
      <SaveModalButton buttonOption={buttonOption} opened={opened} onButtonClick={openModal} onModalOkClick={onModalOkClick} onModalClose={closeModal} />
    </Fragment>
  );
}
