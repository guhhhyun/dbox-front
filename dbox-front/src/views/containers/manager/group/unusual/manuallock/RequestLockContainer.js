import React, { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import UnusualApi from "apis/unusual-api";
import RequestLock from "views/templates/manager/group/unusual/manuallock/RequestLock";

console.debug("RequestLockContainer.js");

export default function RequestLockContainer() {
  const now = new Date();
  const [lockUserCode, setLockUserCode] = useState("");
  const [lockUserName, setLockUserName] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [lockDate, setLockDate] = useState(now);
  const [opened, setOpened] = useState(false);
  const [openedLock, setOpenedLock] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  let mgrType = "D";
  if (user.mgr.companyComCode || user.mgr.groupComCode) mgrType = "I";

  const childRef = useRef(null);
  const content = lockUserName + "님을 잠금 처리 하시겠습니까";

  const modalOption = {
    title: "잠금 사용자 검색",
    okText: "확인",
    cancelText: "취소",
  };

  /**
   * 잠금 처리 저장
   */
  const onModalOkClick = () => {
    const result = childRef.current.lockUser();
    setLockUserCode(result.lockUserCode);
    setLockUserName(result.lockUserName);
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

  /**
   * 요청에 의한 잠금 모달 열기
   */
  const openLockModal = () => {
    //잠금 처리 여부
    lockChk();
  };

  /**
   * 요청에 의한 잠금 모달 닫기
   */
  const closeLockModal = () => {
    setOpenedLock(false);
  };

  /**
   * 잠금 처리 저장
   */
  const onLockSubmit = async () => {
    await lock();
    setOpenedLock(false);
    setLockUserCode("");
    setLockUserName("");
    setRequestReason("");
    setLockDate("");
  };

  const lockChk = async () => {
    try {
      const response = await UnusualApi.getUnusualAll({
        params: {
          status: "L",
          user: lockUserCode,
          company: comCode,
          mgrType: mgrType,
        },
      });
      validation(response.data.response.length);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 유효성 검사
   */
  const validation = (chk) => {
    let error = "";
    const now = new Date();
    const yesterday = new Date(now.setDate(now.getDate() - 1));

    if (chk > 0) {
      error = "이미 잠금 처리 된 사용자입니다.";
    }

    if (new Date(lockDate) < yesterday) {
      error = "잠금일은 오늘 이전일로 선택할 수 없습니다.";
    }

    if (!lockDate) {
      error = "잠금일을 선택해주세요";
    }

    if (!requestReason) {
      error = "요청사유를 입력해주세요";
    }

    if (!lockUserName) {
      error = "잠금 처리 할 사용자를 선택해주세요";
    }

    if (error) {
      setErrorMsg(error);
      openAlertModal();
    } else {
      setOpenedLock(true);
    }
  };

  /**
   *
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
   * 요청에 의한 잠금 처리
   */
  const lock = async () => {
    try {
      const response = await UnusualApi.registUserLock({
        params: {
          user: lockUserCode,
          requestReason: requestReason,
          lockDate: lockDate,
          status: "L",
          type: "M",
        },
      });

      if (response.status == 200) {
        console.log("OK");
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onRequestReasonChanged = useCallback((e) => {
    setRequestReason(e.target.value);
  }, []);

  const onLockDateChanged = useCallback((e) => {
    setLockDate(e.target.value);
  }, []);

  return (
    <RequestLock
      alertOpened={alertOpened}
      closeAlertModal={closeAlertModal}
      onAlertDialogOkClick={onAlertDialogOkClick}
      errorMsg={errorMsg}
      lockUserCode={lockUserCode}
      lockUserName={lockUserName}
      requestReason={requestReason}
      lockDate={lockDate}
      modalOption={modalOption}
      opened={opened}
      openModal={openModal}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      onLockDateChanged={onLockDateChanged}
      onLockSubmit={onLockSubmit}
      openLockModal={openLockModal}
      closeLockModal={closeLockModal}
      openedLock={openedLock}
      content={content}
      onRequestReasonChanged={onRequestReasonChanged}
      ref={childRef}
    />
  );
}
