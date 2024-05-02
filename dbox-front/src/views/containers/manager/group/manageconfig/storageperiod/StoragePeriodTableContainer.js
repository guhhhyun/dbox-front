import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useEffect } from "react";
import StoragePeriodApi from "apis/storageperiod-api";
import StoragePeriodTable from "views/templates/manager/group/manageconfig/storageperiod/StoragePeriodTable";

console.debug("StoragePeriodTableContainer.js");

const StoragePeriodTableContainer = forwardRef(function ({ company }, ref) {
  const [recycleValue, setRecycleValue] = useState("");
  const [delEachValue, setDelEachValue] = useState("");
  const [recycleSchedule, setRecycleSchedule] = useState("");
  const [deleteSchedule, setDeleteSchedule] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableScheduleData, setTableScheduleData] = useState([]);
  const [updateOpened, setUpdateOpened] = useState(false);
  const [updateDelOpened, setUpdateDelOpened] = useState(false);
  const [updateScheduleOpened, setUpdateScheduleOpened] = useState(false);
  const [updateScheduleDelOpened, setUpdateScheduleDelOpened] = useState(false);
  const [listOpened, setListOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);
  const [paramNumValue, setParamNumValue] = useState("");

  useImperativeHandle(ref, () => ({
    getData,
  }));

  /**
   * 데이터 불러오기
   */
  const getData = async (company) => {
    try {
      const response = await StoragePeriodApi.selectStoragePeriod({
        params: {
          uCodeVal1: company,
        },
      });
      setTableData(response.data.response);
      setRecycleValue(response.data.response[0].uCodeVal3);
      setDelEachValue(response.data.response[1].uCodeVal3);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 데이터 불러오기
   */
  const getDeleteScheduleData = async (company) => {
    try {
      const response = await StoragePeriodApi.selectDeleteSchedule({
        params: {
          uCodeVal1: company,
        },
      });
      setTableScheduleData(response.data.response);
      setRecycleSchedule(response.data.response[0].hourtime);
      setDeleteSchedule(response.data.response[1].hourtime);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData(company);
    getDeleteScheduleData(company);
  }, [company]);

  /**
   *  휴지통 기간변경 버튼 -> 예 클릭
   */
  const onRecycleOkButtonClick = async () => {
    try {
      await StoragePeriodApi.patchStoragePeriod({
        params: {
          rObjectId: tableData[0].rObjectId,
          uCodeVal3: recycleValue,
        },
      });
      setUpdateOpened(false);
      setClearOpened(true);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   *  개별폐기 기간변경 버튼 -> 예 클릭
   */
  const onDelEachOkButtonClick = async () => {
    try {
      await StoragePeriodApi.patchStoragePeriod({
        params: {
          rObjectId: tableData[1].rObjectId,
          uCodeVal3: delEachValue,
        },
      });
      setUpdateDelOpened(false);
      setClearOpened(true);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   *  휴지통 스케줄변경 버튼 -> 예 클릭
   */
  const onRecycleScheduleOkButtonClick = async () => {
    try {
      await StoragePeriodApi.patchDeleteSchedule({
        params: {
          comCode: company,
          hourtime: recycleSchedule,
          methodName: tableScheduleData[0].methodName,
        },
      });
      setUpdateScheduleOpened(false);
      setClearOpened(true);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   *  개별폐기 스케줄변경 버튼 -> 예 클릭
   */
  const onDelEachScheduleOkButtonClick = async () => {
    try {
      await StoragePeriodApi.patchDeleteSchedule({
        params: {
          comCode: company,
          hourtime: deleteSchedule,
          methodName: tableScheduleData[1].methodName,
        },
      });
      setUpdateScheduleDelOpened(false);
      setClearOpened(true);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 버튼 클릭(모달open)
   */
  const onChangeButtonClick = () => {
    setUpdateOpened(true);
  };
  const onDelChangeButtonClick = () => {
    setUpdateDelOpened(true);
  };
  const onChangeScheduleButtonClick = () => {
    setUpdateScheduleOpened(true);
  };
  const onDelChangeScheduleButtonClick = () => {
    setUpdateScheduleDelOpened(true);
  };
  const onListButtonClick = (params) => {
    setListOpened(true);
    setParamNumValue(params);
  };

  /**
   * 설정 값 변경
   */
  const onRecycleSelectChange = (event) => {
    setRecycleValue(event.target.value);
  };
  const onDelEachSelectChange = (event) => {
    setDelEachValue(event.target.value);
  };
  const onRecycleScheduleChange = (event) => {
    setRecycleSchedule(event.target.value);
  };
  const onDeleteScheduleChange = (event) => {
    setDeleteSchedule(event.target.value);
  };

  /**
   * 모달
   */
  const closeUpdateModal = () => {
    setUpdateOpened(false);
  };
  const closeUpdateDelModal = () => {
    setUpdateDelOpened(false);
  };
  const closeUpdateScheduleModal = () => {
    setUpdateScheduleOpened(false);
  };
  const closeUpdateScheduleDelModal = () => {
    setUpdateScheduleDelOpened(false);
  };
  const closeClearModal = () => {
    setClearOpened(false);
  };
  const closeListModal = () => {
    setListOpened(false);
  };

  return (
    <StoragePeriodTable
      recycleValue={recycleValue}
      delEachValue={delEachValue}
      recycleSchedule={recycleSchedule}
      deleteSchedule={deleteSchedule}
      onRecycleSelectChange={onRecycleSelectChange}
      onDelEachSelectChange={onDelEachSelectChange}
      updateOpened={updateOpened}
      updateDelOpened={updateDelOpened}
      clearOpened={clearOpened}
      updateScheduleOpened={updateScheduleOpened}
      updateScheduleDelOpened={updateScheduleDelOpened}
      onChangeButtonClick={onChangeButtonClick}
      closeUpdateModal={closeUpdateModal}
      closeClearModal={closeClearModal}
      onRecycleOkButtonClick={onRecycleOkButtonClick}
      onRecycleScheduleChange={onRecycleScheduleChange}
      onDeleteScheduleChange={onDeleteScheduleChange}
      closeUpdateDelModal={closeUpdateDelModal}
      onDelEachOkButtonClick={onDelEachOkButtonClick}
      onDelChangeButtonClick={onDelChangeButtonClick}
      onChangeScheduleButtonClick={onChangeScheduleButtonClick}
      onDelChangeScheduleButtonClick={onDelChangeScheduleButtonClick}
      closeUpdateScheduleModal={closeUpdateScheduleModal}
      closeUpdateScheduleDelModal={closeUpdateScheduleDelModal}
      onRecycleScheduleOkButtonClick={onRecycleScheduleOkButtonClick}
      onDelEachScheduleOkButtonClick={onDelEachScheduleOkButtonClick}
      onListButtonClick={onListButtonClick}
      closeListModal={closeListModal}
      listOpened={listOpened}
      paramNumValue={paramNumValue}
    />
  );
});

export default StoragePeriodTableContainer;
