import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import CodeApi from "apis/code-api";
import HistoryDeleteApi from "apis/historydelete-api";

import SearchHistoryDistForm from "views/templates/history/common/search/SearchHistoryDistForm";

console.debug("HistorySearchDistFormContainer.js");

export default function HistorySearchDistFormContainer({ getSearchData, defaultStartData, defaultEndDate }) {
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
  const [searchSelect, setSearchSelect] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const [opened, setOpened] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  let mgrType = "D";
  if (user.mgr.companyComCode || user.mgr.groupComCode) mgrType = "I";

  const childRef = useRef(null);

  const modalOption = {
    title: "이력 검색",
    okText: "확인",
    cancelText: "취소",
  };

  const dateText = "기간";

  useEffect(() => {
    
    getCodeName(comCode);

    // 폐기 일자 Default 1개월
    const now   = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth();

    const firstDay  = new Date(year, month, 1);
    const lastDay   = new Date(year, month + 1, 0);

    const defaultMonth      = ("0" + (firstDay.getMonth() + 1)).slice(-2);
    const defaultDay        = ("0" + firstDay.getDate()).slice(-2);

    const defaultEndMonth   = ("0" + (lastDay.getMonth() + 1)).slice(-2);
    const defaulEndtDay     = ("0" + lastDay.getDate()).slice(-2);

    setStartDate(year + "-" + defaultMonth + "-" + defaultDay);
    setEndDate(year + "-" + defaultEndMonth + "-" + defaulEndtDay);

  },[]);

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

  // 분류특성
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };


  // 검색어 구분 선택(select)
  const choiceSelect = (event) => {
    setSearchSelect(event.target.value);
  };

  // 검색어 입력하는 내용
  const searchTextInput = (event) => {
    setSearchText(event.target.value);
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

    if (!companyCode && !deptCode && !userCode && !startDate && !endDate && !searchText) {
      error = "검색항목을 넣어서 검색해주세요";
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

    // const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    // const currDay = 24 * 60 * 60 * 1000;
    // const currMonth = currDay * 30;
    // const monthInterval = parseInt(diff / currMonth);

    // if (monthInterval > 1) {
    //   error = "한달 이내로 검색해주세요";
    // }

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
  const onSearch = async () => {

    const valid = validation();

    // alert(companyCode + "-" + deptCode  + "-" + userCode + "-" + startDate + "-" + endDate + "-" + searchSelect + "-" + searchText);

    if (valid) {
      try {
        getSearchData(

          {
            status: "L",
            company: companyCode,
            dept: deptCode,
            user: userCode,
            startDate: startDate,
            endDate: endDate,
            state:state.gubun,
            searchSelect: searchSelect,
            searchText: searchText,
            mgrType: mgrType,
          },

        );
      } catch (e) {
        console.error(e);
      }
    }


    /*
    if (valid) {
      try {
        const response = await HistoryDeleteApi.getHistoryDeleteAll({
          params: {
            status: "L",
            company: companyCode,
            dept: deptCode,
            user: userCode,
            startDate: startDate,
            endDate: endDate,
            searchSelect: searchSelect,
            searchText: searchText,
            mgrType: mgrType,
          },
        });
        onSearchCompany(response);
      } catch (e) {
        console.error(e);
      }
    }
    */
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
   * 요청자 처리 저장
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
    <SearchHistoryDistForm
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
      onSearch={onSearch}
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
      choiceSelect={choiceSelect}
      searchTextInput={searchTextInput}
      searchSelect={searchSelect}
      ref={childRef}
    />
  );
}
