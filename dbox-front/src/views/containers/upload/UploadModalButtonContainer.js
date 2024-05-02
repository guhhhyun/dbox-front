import { useRef } from "react";
import UploadModalButton from "views/templates/upload/UploadModalButton";

export default function UploadModalButtonContainer() {
  const unlockModalRef = useRef(null);

  /**
   * 잠금 해제 요청 모달 열기
   */
  const openUnlockRequestModal = () => {
    unlockModalRef.current.unlock.openModal();
  };

  return <UploadModalButton ref={unlockModalRef} onUnlockRequestClick={openUnlockRequestModal} />;
}
