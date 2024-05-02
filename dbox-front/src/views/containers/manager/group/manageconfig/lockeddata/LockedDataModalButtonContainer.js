import { useCallback } from "react";
import SaveModalButtonContainer from "views/containers/manager/common/SaveModalButtonContainer";

export default function LockedDataModalButtonContainer() {
  const buttonOption = {
    buttonName: "적용",
    content: "적용하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  /**
   * auto clear
   */
  const onModalSave = useCallback(() => {
    test();
  }, []);

  const test = () => {
    alert("auto clear");
  };

  return <SaveModalButtonContainer onModalSave={onModalSave} buttonOption={buttonOption} />;
}
