import AlarmApi from "apis/alarm-api";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import CommonUtil from "utils/common-util";
import AlarmModal from "views/templates/doc/modals/alarm/AlarmModal";

console.debug("AlarmModalContainer.js");

export default function AlarmModalContainer() {
  const { enqueueSnackbar } = useSnackbar();

  const [alarms, setAlarms] = useState([]);
  const [onlyUnfinished, setOnlyUnfinished] = useState(false);

  useEffect(() => {
    getAlarmList();
  }, []);

  /**
   * 알람 리스트 조회
   */
  const getAlarmList = async () => {
    try {
      const response = await AlarmApi.getAlarmList({});
      setAlarms(response.data.response.map((item) => ({ ...item, checked: false })));
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 미결건 포함 체크박스 토글
   */
  const toggleShowAllCheckbox = (event) => {
    setOnlyUnfinished(event.target.checked);
  };

  /**
   * 체크 변경
   */
  const changeCheckedAlarm = (event, index) => {
    const copied = [...alarms];
    copied[index].checked = event.target.checked;
    setAlarms(copied);
  };

  /**
   * 삭제 클릭
   */
  const clickDelete = async () => {
    try {
      const alarmIds = alarms.filter((item) => item.checked).map((item) => item.rObjectId);
      await AlarmApi.deleteAlarmList({ params: { alarmIds } });
      alert(`알림이 삭제되었습니다.`);
      getAlarmList();
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  return (
    <AlarmModal
      alarms={alarms}
      onCheckedAlarmChange={changeCheckedAlarm}
      onlyUnfinished={onlyUnfinished}
      onOnlyUnfinishedChange={toggleShowAllCheckbox}
      onDeleteClick={clickDelete}
    />
  );
}
