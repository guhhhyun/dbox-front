import { useState } from "react";
import HelpPopperButton from "views/templates/doc/modals/help/HelpPopperButton";

console.debug("HelpPopperButtonContainer.js");

export default function HelpPopperButtonContainer() {
  const [opened, setOpened] = useState(false);

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

  return <HelpPopperButton opened={opened} onButtonClick={openModal} onClose={closeModal} />;
}
