import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import CodeApi from "apis/code-api";
import UnusualApi from "apis/unusual-api";
import SearchFormAll from "views/templates/manager/common/search/SearchFormAll";

console.debug("LockManageSearchFormContainer.js");

export default function LockManageSearchFormContainer({ onSearchCompany }) {
  const now = new Date();
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
  let mgrType = "D";
  if (user.mgr.companyComCode || user.mgr.groupComCode) mgrType = "I";

  const childRef = useRef(null);

  const modalOption = {
    title: "사용자 잠금 현황 검색",
    okText: "확인",
    cancelText: "취소",
  };

  const dateText = "잠금일";

  useEffect(() => {
    getCodeName(comCode);
  }, []);

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

    if (valid) {
      try {
        const response = await UnusualApi.getUnusualAll({
          params: {
            status: "L",
            company: companyCode,
            dept: deptCode,
            user: userCode,
            desigStartDate: startDate,
            desigEndDate: endDate,
            mgrType: mgrType,
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
