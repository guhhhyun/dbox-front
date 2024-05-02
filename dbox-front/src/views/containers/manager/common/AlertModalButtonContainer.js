import { useState } from "react";
import AlertModalButton from "views/templates/manager/common/AlertModalButton";

console.debug("AlertModalButtonContainer.js");

export default function AlertModalButtonContainer(props) {
  const [opened, setOpened] = useState(false);

  const buttonName = props.buttonName;
  const content = props.content;

  /**
   * alert 확인버튼
   */
  const onModalOkClick = () => {
    props.onModalSave();
    alert("테스트");
    setOpened(false);
  };

  /**
   * 모달 열기
   */
  const openModal = () => {
    setOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  return (
    <AlertModalButton
      buttonName={buttonName}
      content={content}
      opened={opened}
      onButtonClick={openModal}
      onAlertDialogOkClick={onModalOkClick}
      onAlertDialogClose={closeModal}
    />
  );
}
