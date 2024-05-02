import React, { useRef, useState } from "react";
import TakeoutApprovalFrom from "views/templates/manager/dept/takeoutcontrol/takeoutapproval/TakeoutApprovalForm";
import AuthRequestApi from "apis/authrequest-api";
import { useSelector } from "react-redux";

console.debug("TakeoutApprovalFormContainer.js");

export default function TakeoutApprovalFormContainer() {
  const user = useSelector((state) => state.session.user);
  const deptCode = user.mgr.companyDeptCode ? user.mgr.companyDeptCode : "";
  const [opened, setOpened] = useState(false);
  const [gridData, setGridData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  const childRef = useRef(null);

  const buttonOption = {
    title: "조회권한 요청 처리",
    buttonName: "실행",
    content: "실행 처리 하시겠습니까?",
    okText: "예",
    cancelText: "아니오",
  };

  /**
   * grid 체크한 row 데이터
   */
  const getGridData = (gridData) => {
    setGridData(gridData);
  };

  /**
   * 유효성 검사
   */
  const validation = () => {
    let error = "";
    if (gridData === "" || gridData.length === 0) {
      error = "요청자료를 선택해주세요.";
    } else {
      for (let i = 0; i < gridData.length; i++) {
        if (gridData[i].uReqStatus === null || gridData[i].uReqStatus === "R") {
          error = "처리방법을 선택해주세요.";
        }
        if (gridData[i].uReqStatus === "D" && (gridData[i].uRejectReason === "" || gridData[i].uRejectReason === " ")) {
          error = "반려사유를 입력해주세요.";
        }
      }
    }
    if (error) {
      setErrorMsg(error);
      openAlertModal();
      return false;
    }
    return true;
  };

  /**
   * 모달 "예" 버튼 클릭
   */
  const onModalOkClick = async () => {
    const valid = validation();

    if (valid) {
      try {
        for (let i = 0; i < gridData.length; i++) {
          await AuthRequestApi.patchAuthRequest({
            params: {
              rObjectId: gridData[i].rObjectId,
              uReqStatus: gridData[i].uReqStatus,
              uRejectReason: gridData[i].uReqStatus === "D" ? gridData[i].uRejectReason : "",
              email: gridData[i].email,
              uReqDocId: gridData[i].uReqDocId,
              uReqDocName: gridData[i].uReqDocName,
              uReqDeptCode: gridData[i].uReqDeptCode,
              uOwnDeptCode: gridData[i].uOwnDeptCode,
              uReqUser: gridData[i].uReqUser,
            },
          });
        }
        setOpened(false);
        setClearOpened(true);
        getData();
      } catch (e) {
        console.error(e);
      }
    }
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
   * 모달 열기
   */
  const openModal = () => {
    const valid = validation();
    if (valid) {
      setOpened(true);
    }
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  const onSearchCompany = (response) => {
    childRef.current.getSearchData(response);
  };

  const getData = (userName, startDate, endDate) => {
    childRef.current.getData(userName, startDate, endDate);
  };

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <TakeoutApprovalFrom
      onSearchCompany={onSearchCompany}
      opened={opened}
      buttonOption={buttonOption}
      openModal={openModal}
      closeModal={closeModal}
      onModalOkClick={onModalOkClick}
      getGridData={getGridData}
      errorMsg={errorMsg}
      alertOpened={alertOpened}
      closeAlertModal={closeAlertModal}
      deptCode={deptCode}
      getData={getData}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      ref={childRef}
    />
  );
}
