import { useCallback } from "react";
import SaveModalButtonContainer from "views/containers/manager/common/SaveModalButtonContainer";

console.debug("AuthWithdrawalModalButtonContainer.js");

export default function AuthWithdrawalModalButtonContainer() {
  const buttonOption = {
    buttonName: "권한회수",
    content: "권한회수 처리 하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  /**
   * 권한회수
   */
  const onModalSave = useCallback(() => {
    test();
  }, []);

  const test = () => {
    alert("권한회수");
  };
  return <SaveModalButtonContainer onModalSave={onModalSave} buttonOption={buttonOption} />;
}
