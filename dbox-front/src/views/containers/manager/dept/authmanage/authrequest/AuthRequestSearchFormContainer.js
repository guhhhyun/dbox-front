import AuthRequestApi from "apis/authrequest-api";
import CodeApi from "apis/code-api";
import DeptApi from "apis/dept-api";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthRequestSearchForm from "views/templates/manager/dept/authmanage/authrequest/AuthRequestSearchForm";

console.debug("AuthRequestSearchFormContainer.js");

export default function AuthRequestSearchFormContainer({ onSearchCompany, mgrDeptCode, getData }) {
  const now = new Date();
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.deptComCode ? user.mgr.deptComCode : "";
  const [defaultCompanyName, setDefaultCompanyName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUserName] = useState("");

  const childRef = useRef(null);

  const modalOption = {
    title: "조회권한 요청 목록 조회",
    okText: "확인",
    cancelText: "취소",
  };

  const dateText = "기준 초과일";

  useEffect(() => {
    getCodeName(comCode);
    getDeptName();
  }, []);

  //공통코드 부서이름 가져오기
  const getDeptName = async (params) => {
    try {
      if (mgrDeptCode.length > 1) {
        let deptNameList = [];
        for (let i = 0; i < mgrDeptCode.length; i++) {
          const response = await DeptApi.getDeptOne({
            params: {
              deptId: mgrDeptCode[i],
            },
          });
          deptNameList = deptNameList.concat(response.data.response.orgNm);
        }
        setDeptName(deptNameList);
      } else if (mgrDeptCode.length === 1) {
        const response = await DeptApi.getDeptOne({
          params: {
            deptId: mgrDeptCode,
          },
        });
        setDeptName(response.data.response.orgNm);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //공통코드 회사이름 가져오기
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

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  /**
   * 검색 버튼 클릭
   */
  const onSearch = async () => {
    const valid = validation();

    if (valid) {
      try {
        if (mgrDeptCode.length === 1) {
          const response = await AuthRequestApi.selectAuthRequest({
            params: {
              uReqDeptCode: mgrDeptCode,
              displayName: userName,
              startDate: startDate,
              endDate: endDate,
            },
          });
          onSearchCompany(response);
        } else if (mgrDeptCode.length > 1 && userName === "") {
          getData("", startDate, endDate);
        } else if (mgrDeptCode.length > 1 && userName != "") {
          getData(userName, startDate, endDate);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AuthRequestSearchForm
      alertOpened={alertOpened}
      closeAlertModal={closeAlertModal}
      onAlertDialogOkClick={onAlertDialogOkClick}
      errorMsg={errorMsg}
      defaultCompanyName={defaultCompanyName}
      comCode={comCode}
      companyName={companyName}
      deptName={deptName}
      mgrDeptCode={mgrDeptCode}
      userName={userName}
      modalOption={modalOption}
      onSearch={onSearch}
      startChangeDate={startChangeDate}
      endChangeDate={endChangeDate}
      handleNameChange={handleNameChange}
      dateText={dateText}
      ref={childRef}
    />
  );
}
