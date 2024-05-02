import { useState } from "react";
import DocManagerModalButton from "views/templates/doc/modals/docmanager/DocManagerModalButton";

console.debug("DocManagerModalButtonContainer.js");

export default function DocManagerModalButtonContainer({ deptManagers }) {
  const [opened, setOpened] = useState(false);

  /**
   * 부서문서관리자 저장
   */
  const saveDocManager = () => {
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
    <DocManagerModalButton deptManagers={deptManagers} opened={opened} onButtonClick={openModal} onModalOkClick={saveDocManager} onModalClose={closeModal} />
  );
}
