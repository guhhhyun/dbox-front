import { useRef } from "react";
import ExternalStorageModalButton from "views/templates/externalstorage/ExternalStorageModalButton";

export default function ExternalStorageModalButtonContainer() {
  const unlockModalRef = useRef(null);

  /**
   * 잠금 해제 요청 모달 열기
   */
  const openUnlockRequestModal = () => {
    unlockModalRef.current.unlock.openModal();
  };

  return <ExternalStorageModalButton ref={unlockModalRef} onUnlockRequestClick={openUnlockRequestModal} />;
}
