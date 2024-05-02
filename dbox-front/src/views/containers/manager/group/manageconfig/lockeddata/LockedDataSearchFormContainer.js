import React, {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import CodeApi from "apis/code-api";
import LockedDataApi from "apis/lockeddata-api";
import SearchFormAll from "views/templates/manager/common/search/SearchFormAll";

export default function LockedDataSearchFormContainer({ onSearchCompany }) {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
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

  const childRef = useRef(null);

  const modalOption = {
    title: "사용자 검색",
    okText: "확인",
    cancelText: "취소",
  };

  const dateText = "잠금일";

  useEffect(() => {
    getCodeName();
  }, []);

  const getCodeName = async () => {
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

    if (startDate > endDate) {
      error = "종료일을 시작일 이전으로 선택해주세요";
    }
    if (startDate && !endDate) {
      error = "검색 종료일자를 선택해주세요";
    }
    if (!startDate && endDate) {
      error = "검색 시작일자를 선택해주세요";
    }

    if (error) {
      setErrorMsg(error);
      openAlertModal();
      return false;
    }
    return true;
  };

  const openAlertModal = () => {
    setAlertOpened(true);
  };

  const closeAlertModal = () => {
    setAlertOpened(false);
  };

  const onAlertDialogOkClick = () => {
    setAlertOpened(false);
  };

  const openModal = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
  };

  const onSearch = async () => {
    const valid = validation();
    if (valid) {
      try {
        const response = await LockedDataApi.getLockedData({
          params: {
            company: companyCode,
            dept: deptCode,
            user: userCode,
            startDate: startDate,
            endDate: endDate
          },
        });
        onSearchCompany(response);
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
   * 잠금 처리 저장
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

  return (
    <SearchFormAll
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
      startDate={startDate}
      startChangeDate={startChangeDate}
      endDate={endDate}
      endChangeDate={endChangeDate}
      dateText={dateText}
      ref={childRef}
    />
  );
}
