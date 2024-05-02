import { useState } from "react";
import PreservePopperButton from "views/templates/doc/modals/property/PreservePopperButton";

console.debug("PreservePopperContainer.js");

export default function PreservePopperButtonContainer({ preserve, regDate, closedDate, expiredDate, onClick, onChange }) {
  const [opened, setOpened] = useState(false);

  /**
   * 보존연한 팝업 열기
   */
  const openPopper = () => {
    setOpened(true);
  };

  /**
   * 보존연한 팝업 닫기
   */
  const closePopper = () => {
    setOpened(false);
  };

  /**
   * 보존연한 저장
   */
  const savePreserve = (value) => {
    onChange({ target: { name: "uPreserverFlag", value } });
    setOpened(false);
  };

  return (
    <PreservePopperButton
      onClick={onClick}
      opened={opened}
      preserve={preserve}
      regDate={regDate}
      closedDate={closedDate}
      expiredDate={expiredDate}
      onButtonClick={openPopper}
      onPopperOkClick={savePreserve}
      onClose={closePopper}
      onChange={onChange}
    />
  );
}
