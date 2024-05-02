import { useEffect, useState } from "react";
import AlarmModalButton from "views/templates/doc/modals/alarm/AlarmModalButton";
import AlarmApi from "apis/alarm-api";

console.debug("AlarmModalButtonContainer.js");

export default function AlarmModalButtonContainer() {
  const [opened, setOpened] = useState(false);
  const [alarmCount, setAlarmCount] = useState(null);

  // 알람 카운트
  useEffect(() => {
    (async () => {
      const response = await AlarmApi.getAlarmCount();
      setAlarmCount(response.data.response);
    })();
  }, []);

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

  return <AlarmModalButton alarmCount={alarmCount} opened={opened} onButtonClick={openModal} onModalOkClick={closeModal} onModalClose={closeModal} />;
}
