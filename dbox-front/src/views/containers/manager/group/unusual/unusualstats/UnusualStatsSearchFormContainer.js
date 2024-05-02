import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import CodeApi from "apis/code-api";
import UnusualApi from "apis/unusual-api";
import SearchFormStat from "views/templates/manager/common/search/SearchFormStat";

console.debug("UnusualStatsSearchFormContainer.js");

export default function UnusualStatsSearchFormContainer({ onSearchData, getSearchData, defaultData }) {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const [state, setState] = useState("");
  const [defaultCompanyName, setDefaultCompanyName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userCode, setUserCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [opened, setOpened] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let dataList = new Array({ date: startDate });

  const childRef = useRef(null);

  const modalOption = {
    title: "특이 사용 이력 검색",
    okText: "확인",
    cancelText: "취소",
  };

  const searchData = {
    company: companyCode,
    dept: deptCode,
    user: userCode,
    gubun: state.gubun,
    startDate: startDate,
    endDate: endDate,
  };

  const dateText = "기간";

  useEffect(() => {
    getCodeName(comCode);
    setStartDate(defaultData);
    setEndDate(defaultData);
  }, [defaultData]);

  const getCodeName = async (params) => {
    try {
      const response = await CodeApi.getCodeList({
        params: {
          uCodeType: "COM_CODE",
          uCodeVal1: comCode,
        },
      });
      setDefaultCompanyName(comCode === "DKG" ? "전체" : response.data.response[0].uCodeName1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  /**
   * 날짜
   */
  const startChangeDate = useCallback((e) => {
    setStartDate(e.target.value);
  }, []);

  const endChangeDate = useCallback((e) => {
    setEndDate(e.target.value);
  }, []);

  /**
   * 유효성 검사
   */
  const validation = () => {
    let error = "";

    if (!companyCode && !deptCode && !userCode && !startDate && !endDate) {
      error = "검색항목을 넣어서 검색해주세요";
    }

    if (!startDate && !endDate) {
      error = "검색 일자를 선택해주세요";
    }

    if (startDate > endDate) {
      error = "종료일을 시작일 이전으로 선택해주세요";
    }
    if (startDate && !endDate) {
      error = "검색 종료일자를 선택해주세요";
    }
    if (!startDate && endDate) {
      error = "검색 시작일자를 선택해주세요";
    }

    if (startDate && endDate) {
      const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
      const currDay = 24 * 60 * 60 * 1000;
      const currMonth = currDay * 30;
      const monthInterval = parseInt(diff / currMonth);

      let num = 0;

      while (num < monthInterval) {
        let lastData = dataList[dataList.length - 1];
        const dateSplit = lastData.date.split("-");
        const curData = new Date(dateSplit[0], dateSplit[1]);

        let nextMonth = curData.getMonth() + 1;

        if (nextMonth != 10 && nextMonth != 11 && nextMonth != 12) {
          nextMonth = "0".concat(nextMonth);
        }
        const nextData = curData.getFullYear() + "-" + nextMonth;
        dataList = [...dataList, { date: nextData }];
        num++;
      }
      onSearchData(searchData, dataList);
    }
    if (error) {
      setErrorMsg(error);
      openAlertModal();
      return false;
    }
    return true;
  };

  /**
   * Alert 모달 열기
   */
  const openAlertModal = () => {
    setAlertOpened(true);
  };

  /**
   * Alert 모달 닫기
   */
  const closeAlertModal = () => {
    setAlertOpened(false);
  };
  /**
   * Alert 확인버튼
   */
  const onAlertDialogOkClick = () => {
    setAlertOpened(false);
  };

  /**
   * 검색 버튼 클릭
   */
  const onSearchClick = async () => {
    const valid = validation();

    if (valid) {
      try {
        getSearchData(searchData, endDate);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onClick = () => {
    setCompanyName("");
    setCompanyCode("");
    setDeptName("");
    setDeptCode("");
    setUserName("");
    setUserCode("");
    openModal();
  };

  /**
   * 검색 데이터 저장
   */
  const onModalOkClick = () => {
    const result = childRef.current.getValue();
    setCompanyName(result.companyName);
    setCompanyCode(result.companyCode);
    setDeptName(result.deptName);
    setDeptCode(result.deptCode);
    setUserName(result.userName);
    setUserCode(result.userCode);
    setOpened(false);
  };

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

  return (
    <SearchFormStat
      alertOpened={alertOpened}
      closeAlertModal={closeAlertModal}
      onAlertDialogOkClick={onAlertDialogOkClick}
      errorMsg={errorMsg}
      defaultCompanyName={defaultCompanyName}
      comCode={comCode}
      companyName={companyName}
      deptName={deptName}
      userName={userName}
      modalOption={modalOption}
      onClick={onClick}
      onSearchClick={onSearchClick}
      opened={opened}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      handleChange={handleChange}
      startDate={startDate}
      startChangeDate={startChangeDate}
      endDate={endDate}
      endChangeDate={endChangeDate}
      dateText={dateText}
      state={state}
      defaultData={defaultData}
      ref={childRef}
    />
  );
}
