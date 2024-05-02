import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import AlarmForm from "views/templates/manager/group/manageauth/alarm/AlarmForm";
import AlarmApi from "apis/alarm-api";

console.debug("AlarmFormContainer.js");

export default function AlarmFormContainer() {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  const [company, setCompany] = useState(comCode != "DKG" ? comCode : "DKS");
  const [alarmSettingOpened, setAlarmSettingOpened] = useState(false);
  const [objectIdValue, setObjectIdValue] = useState();
  const [alarmValue, setAlarmValue] = useState([]);
  const [emailValue, setEmailValue] = useState([]);
  const [mmsValue, setMmsValue] = useState([]);
  const [alarmArray, setAlarmArray] = useState([]);
  const [emailArray, setEmailArray] = useState([]);
  const [mmsArray, setMmsArray] = useState([]);
  const [clearOpened, setClearOpened] = useState(false);

  const childRef = useRef();

  const onClickCompany = (company) => {
    setCompany(company);
    childRef.current.getData(company);
  };

  /**
   * objectId값(배열)
   */
  const onObjectIdValue = (objectIdValue) => {
    setObjectIdValue(objectIdValue);
  };

  /**
   * 알림 체크값 가져오기
   */
  const checkedAlarmValue = (alarmValue) => {
    setAlarmValue(alarmValue);

    let aa = [];
    for (let i = 0; i < alarmValue.length; i++) {
      aa = aa.concat(alarmValue[i] === true ? "Y" : "N");
    }
    setAlarmArray(aa);
  };

  /**
   * email 체크값 가져오기
   */
  const checkedEmailValue = (emailValue) => {
    setEmailValue(emailValue);

    let aa = [];
    for (let i = 0; i < emailValue.length; i++) {
      aa = aa.concat(emailValue[i] === true ? "Y" : "N");
    }
    setEmailArray(aa);
  };

  /**
   * mms 체크값 가져오기
   */
  const checkedMmsValue = (mmsValue) => {
    setMmsValue(mmsValue);

    let aa = [];
    for (let i = 0; i < mmsValue.length; i++) {
      aa = aa.concat(mmsValue[i] === true ? "Y" : "N");
    }
    setMmsArray(aa);
  };

  /**
   * 저장 확인창에서 저장
   */
  const saveNotiConfig = async () => {
    for (let i = 0; i < objectIdValue.length; i++) {
      try {
        await AlarmApi.patchNotiConfig({
          params: {
            rObjectId: objectIdValue[i],
            uAlarmYn: alarmArray[i],
            uEmailYn: emailArray[i],
            uMmsYn: mmsArray[i],
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
    childRef.current.getData(company);
    setAlarmSettingOpened(false);
    setClearOpened(true);
  };

  /**
   * 저장 확인창 열기
   */
  const openAlarmSetting = () => {
    setAlarmSettingOpened(true);
  };

  /**
   * 저장 확인창 닫기
   */
  const closeAlarmSetting = () => {
    setAlarmSettingOpened(false);
  };

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <AlarmForm
      alarmSettingOpened={alarmSettingOpened}
      openAlarmSetting={openAlarmSetting}
      closeAlarmSetting={closeAlarmSetting}
      saveNotiConfig={saveNotiConfig}
      company={company}
      onClickCompany={onClickCompany}
      onObjectIdValue={onObjectIdValue}
      checkedAlarmValue={checkedAlarmValue}
      checkedEmailValue={checkedEmailValue}
      checkedMmsValue={checkedMmsValue}
      comCode={comCode}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      ref={childRef}
    />
  );
}
