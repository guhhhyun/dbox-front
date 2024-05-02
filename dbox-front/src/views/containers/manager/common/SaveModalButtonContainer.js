import { useState } from "react";
import SaveModalButton from "views/templates/manager/common/SaveModalButton";

console.debug("SaveModalButtonContainer.js");

export default function SaveModalButtonContainer(props) {
  const [opened, setOpened] = useState(false);

  const buttonOption = props.buttonOption;

  /**
   * 잠금 처리 저장
   */
  const onModalOkClick = () => {
    props.onModalSave();
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

  return <SaveModalButton buttonOption={buttonOption} opened={opened} onButtonClick={openModal} onModalOkClick={onModalOkClick} onModalClose={closeModal} />;
}
