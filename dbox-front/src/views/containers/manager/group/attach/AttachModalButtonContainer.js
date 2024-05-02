import { useCallback } from "react";
import SaveModalButtonContainer from "views/containers/manager/common/SaveModalButtonContainer";

console.debug("AttachModalButtonContainer.js");

export default function AttachModalButtonContainer() {
  const buttonOption = {
    buttonName: "등록",
    content: "등록하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  /**
   * 등록
   */

  const onModalSave = useCallback(() => {
    test();
  }, []);

  const test = () => {
    alert("등록");
  };

  return <SaveModalButtonContainer onModalSave={onModalSave} buttonOption={buttonOption} />;
}
