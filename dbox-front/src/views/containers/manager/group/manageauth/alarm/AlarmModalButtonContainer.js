import { useCallback } from "react";
import SaveModalButtonContainer from "views/containers/manager/common/SaveModalButtonContainer";

console.debug("AlarmModalButtonContainer.js");

export default function AlarmModalButtonContainer() {
  const buttonOption = {
    buttonName: "설정 저장",
    content: "저장하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  /**
   * 설정 저장
   */

  const onModalSave = useCallback(() => {
    test();
  }, []);

  const test = () => {
    alert("설정 저장");
  };

  return <SaveModalButtonContainer onModalSave={onModalSave} buttonOption={buttonOption} />;
}
