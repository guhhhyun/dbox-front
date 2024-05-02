import { useRef } from "react";
import UserUnlockRequestModalButton from "views/templates/userlocked/UserUnlockRequestModalButton";

export default function UserUnlockRequestModalButtonContainer() {
  const unlockModalRef = useRef(null);

  /**
   * 잠금 해제 요청 모달 열기
   */
  const openUnlockRequestModal = () => {
    unlockModalRef.current.unlock.openModal();
  };

  return <UserUnlockRequestModalButton ref={unlockModalRef} onUnlockRequestClick={openUnlockRequestModal} />;
}
