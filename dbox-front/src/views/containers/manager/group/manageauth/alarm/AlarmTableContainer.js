import AlarmTable from "views/templates/manager/group/manageauth/alarm/AlarmTable";
import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import AlarmApi from "apis/alarm-api";

console.debug("AlarmTableContainer.js");

const AlarmTableContainer = forwardRef(({ company, onObjectIdValue, checkedAlarmValue, checkedEmailValue, checkedMmsValue }, ref) => {
  const [alarmData, setAlarmData] = useState([]);
  const [alarmArray, setAlarmArray] = useState([]);
  const [emailArray, setEmailArray] = useState([]);
  const [mmsArray, setMmsArray] = useState([]);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const alarmChange = (index) => {
    setAlarmArray((checks) => checks.map((c, i) => (i === index ? !c : c)));
  };

  const emailChange = (index) => {
    setEmailArray((checks) => checks.map((d, i) => (i === index ? !d : d)));
  };

  const mmsChange = (index) => {
    setMmsArray((checks) => checks.map((e, i) => (i === index ? !e : e)));
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (company) => {
    try {
      const response = await AlarmApi.getNotiConfig({
        params: {
          uComCode: company,
        },
      });
      setAlarmData(response.data.response);
      let array1 = [];
      let array2 = [];
      let array3 = [];
      let array4 = [];

      for (let i = 0; i < response.data.response.length; i++) {
        array1 = array1.concat(response.data.response[i].uAlarmYn === "Y" ? true : false);
        setAlarmArray(array1);
        array2 = array2.concat(response.data.response[i].uEmailYn === "Y" ? true : false);
        setEmailArray(array2);
        array3 = array3.concat(response.data.response[i].uMmsYn === "Y" ? true : false);
        setMmsArray(array3);
        array4 = array4.concat(response.data.response[i].rObjectId);
        onObjectIdValue(array4);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData(company);
  }, [company]);

  useEffect(() => {
    checkedAlarmValue(alarmArray);
  }, [alarmArray]);

  useEffect(() => {
    checkedEmailValue(emailArray);
  }, [emailArray]);

  useEffect(() => {
    checkedMmsValue(mmsArray);
  }, [mmsArray]);

  return (
    <AlarmTable
      alarmChange={alarmChange}
      emailChange={emailChange}
      mmsChange={mmsChange}
      alarmData={alarmData}
      alarmArray={alarmArray}
      emailArray={emailArray}
      mmsArray={mmsArray}
    />
  );
});

export default AlarmTableContainer;
