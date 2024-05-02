import { useState } from "react";
import CodeApi from "apis/code-api";
import SaveModalButton from "views/templates/manager/common/SaveModalButton";
console.debug("HistoryAuthModalButtonContainer.js");

export default function HistoryAuthModalButtonContainer({ list }) {
  const [opened, setOpened] = useState(false);
  const buttonOption = {
    buttonName: "설정 저장",
    content: "저장하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  /**
   * 설정 저장
   */
  const onModalOkClick = () => {
    list.map((item) => onSave(item.data));
  };

  /**
   * 이력 조회 권한 관리
   */
  const onSave = async (params) => {
    try {
      const response = await CodeApi.patchCodeLogviewAuth({
        params: {
          rObjectId: params.code.rObjectId,
          uCodeVal3: params.code.uCodeVal3,
          uCodeName1: params.code.uCodeName1,
          uCodeName2: params.code.uCodeName2,
          uCodeName3: params.code.uCodeName3,
        },
      });
      if (response.status == 200) {
        console.log("OK");
      } else {
        throw new Error(response.data.message);
      }
      setOpened(false);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 모달 열기
   */
  const openModal = (params) => {
    setOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  return <SaveModalButton buttonOption={buttonOption} opened={opened} onButtonClick={openModal} onModalOkClick={onModalOkClick} onModalClose={closeModal} />;
}
