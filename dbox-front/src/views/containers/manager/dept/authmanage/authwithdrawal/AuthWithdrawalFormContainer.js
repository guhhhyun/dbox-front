import React, { useRef, useState } from "react";
import AuthWithdrawalForm from "views/templates/manager/dept/authmanage/authwithdrawal/AuthWithdrawalForm";
import AuthRequestApi from "apis/authrequest-api";
import { useSelector } from "react-redux";

console.debug("AuthWithdrawalFormContainer.js");

export default function AuthWithdrawalFormContainer() {
  const user = useSelector((state) => state.session.user);
  const deptCode = user.mgr.companyDeptCode ? user.mgr.companyDeptCode : "";
  const [opened, setOpened] = useState(false);
  const [gridData, setGridData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);
  const childRef = useRef(null);

  const buttonOption = {
    title: "권환회수 처리",
    buttonName: "권한회수",
    content: "권환회수 처리 하시겠습니까?",
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
      error = "권한 회수할 자료를 선택해 주세요.";
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
          await AuthRequestApi.collectAuthWithdrawal({
            params: {
              rObjectId: gridData[i].rObjectId,
              uReqStatus: gridData[i].uReqStatus,
              uReqDocId: gridData[i].uReqDocId,
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
   * 모달 열기(버튼클릭)
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
    <AuthWithdrawalForm
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
