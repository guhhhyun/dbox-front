import React, { useState, useEffect, useCallback } from "react";
import TakeoutManageForm from "views/templates/manager/dept/takeoutcontrol/takeoutmanage/TakeoutManageForm";
import TakeoutApi from "apis/takeout-api";
import { useSelector } from "react-redux";

console.debug("TakeoutManageFormContainer.js");

export default function TakeoutManageFormContainer() {
  const user = useSelector((state) => state.session.user);
  const [result, setResult] = useState("");
  const [type, setType] = useState("");
  const [valueIndex, setValueIndex] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [content, setContent] = useState("");
  const [opened, setOpened] = useState(false);
  const [openedConfirm, setOpenedConfirm] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [deleteDays, setDeleteDays] = useState("");
  const [deleteOption, setDeleteOption] = useState("");
  const [autoApprYn, setAutoApprYn] = useState("");
  const [freePassYn, setFreePassYn] = useState("");
  const [autoName, setAutoName] = useState("");
  const [freeName, setFreeName] = useState("");
  const [autoConfirmOpened, setAutoConfirmOpened] = useState(false);
  const [isValidAuto1, setIsValidAuto1] = useState(false);
  const [isValidAuto2, setIsValidAuto2] = useState(false);
  const [isAutoAgreed, setIsAutoAgreed] = useState(false);

  useEffect(() => {
    getData();
    agreementChk();
  }, []);

  const getData = async () => {
    try {
      const response = await TakeoutApi.getTakeoutReasons({
        params: {
          orgId: user.orgId,
          mode: "M",
        },
      });
      setResult(response.data.response);
      setDeleteOption(response.data.response.uDeleteOption);
      setDeleteDays(response.data.response.uDeleteDays);
      setAutoApprYn(response.data.response.uAutoApprYn);
      setFreePassYn(response.data.response.uFreePassYn);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 동의서 정보 조회
   */
  const agreementChk = async () => {
    const agreementRst = await TakeoutApi.getAgreement({});
    for (let obj of agreementRst.data.response) {
      if (obj.uAgreeType === "T" && obj.uAgreeYn === "Y") {
        setIsAutoAgreed(true);
        break;
      }
    }
  };

  /**
   * 추가
   */
  const onRegister = (type) => {
    setType(type);
    if (type === "C") {
      setOpenedConfirm(true);
    } else {
      openConfirmModal();
    }
  };

  /**
   * 편집
   */
  const onUpdate = (type, index, param) => {
    if (type === "A") {
      setAutoName(param);
    } else {
      setFreeName(param);
    }

    setType(type);
    setValueIndex(index);
    openTakeoutModal();
  };

  /**
   * 모달 열기
   */
  const openConfirmModal = () => {
    setOpened(true);
  };

  /**
   * 유효성 검사
   */
  const validation = () => {
    let error = "";

    if (type === "A") {
      if (!autoName) {
        error = "자동승인 목록을 입력해주세요";
      }
    } else {
      if (!freeName) {
        error = "프리패스 목록을 입력해주세요";
      }
    }

    if (error) {
      setContent(error);
      setAlertOpened(true);
      return false;
    }
    return true;
  };

  const onAutoConfirm = () => {
    if (isValidAuto1 && isValidAuto2) {
      requestAgreement();
    } else {
      setContent("보안 확인 문자를 정확히 입력하세요.");
      setAlertOpened(true);
    }
  };

  const onAutoCloseConfirm = () => {
    setAutoConfirmOpened(false);
  };

  /**
   * 자동승인 동의서
   */
  const requestAgreement = async () => {
    try {
      const agreementRst = await TakeoutApi.registAgreement({
        params: {
          uUserId: user.userId,
          uAgreeType: "T",
          uComCode: user.comOrgId,
          uDeptCode: user.orgId,
          uAgreeName: "외부반출승인동의서",
          uAgreeYn: "Y",
          uReason: "개정사유",
        },
      });
      if (agreementRst.status == 200) {
        setAutoApprYn("Y");
        setContent("동의서가 저장되었습니다");
        setAlertOpened(true);
        onAutoCloseConfirm();
      } else {
        setContent("저장에 실패하였습니다. 다시 시도해주세요");
        setAlertOpened(true);
      }
    } catch (e) {
      console.error(e);
      setContent("저장에 실패하였습니다. 다시 시도해주세요");
      setAlertOpened(true);
    }
  };
  /**

  /**
   * 데이터 저장
   */
  const onModalOkClick = async () => {
    const valid = validation();
    if (valid) {
      try {
        const response = await TakeoutApi.patchTakeout({
          params: {
            rObjectId: result?.rObjectId,
            uAutoName: autoName,
            uFreeName: freeName,
            mode: "I",
            type: type,
          },
        });
        setOpened(false);
        getData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  /**
   * Alert 확인버튼
   */
  const onAlertDialogOkClick = () => {
    setAlertOpened(false);
  };

  /**
   * 모달 닫기
   */
  const closeConfirmModal = () => {
    setOpened(false);
  };

  const onDeleteDays = useCallback((e) => {
    setDeleteDays(e.target.value);
  }, []);

  const onAutoName = useCallback((e) => {
    setAutoName(e.target.value);
  }, []);

  const onFreeName = useCallback((e) => {
    setFreeName(e.target.value);
  }, []);

  /**
   * 수정 모달 열기
   */
  const openTakeoutModal = () => {
    setOpenedModal(true);
  };

  /**
   * 수정 모달 닫기
   */
  const closeTakeoutModal = () => {
    setOpenedModal(false);
  };

  /**
   * 저장 데이터 저장
   */
  const onOkConfirm = async () => {
    try {
      const response = await TakeoutApi.patchTakeout({
        params: {
          rObjectId: result?.rObjectId,
          uAutoApprYn: autoApprYn,
          uFreePassYn: freePassYn,
          uDeleteOption: deleteOption,
          uDeleteDays: deleteDays,
          mode: "U",
          type: "C",
        },
      });
      setOpenedConfirm(false);
      getData();
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 저장 모달 닫기
   */
  const onCloseConfirm = () => {
    setOpenedConfirm(false);
  };

  /**
   * 수정 저장
   */
  const updateTakeoutModal = async () => {
    const valid = validation();
    if (valid) {
      try {
        const response = await TakeoutApi.patchTakeout({
          params: {
            rObjectId: result?.rObjectId,
            valueIndex: valueIndex,
            uAutoName: autoName,
            uFreeName: freeName,
            mode: "U",
            type: type,
          },
        });
        setOpenedModal(false);
        getData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  /**
   * 삭제 저장
   */
  const deleteTakeoutModal = async () => {
    try {
      const response = await TakeoutApi.deleteTakeout({
        params: {
          rObjectId: result.rObjectId,
          valueIndex: valueIndex,
          uAutoName: autoName,
          uFreeName: freeName,
          type: type,
        },
      });
      setOpenedModal(false);
      getData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TakeoutManageForm
      result={result}
      type={type}
      onRegister={onRegister}
      openedConfirm={openedConfirm}
      opened={opened}
      alertOpened={alertOpened}
      setAlertOpened={setAlertOpened}
      content={content}
      setContent={setContent}
      onAlertDialogOkClick={onAlertDialogOkClick}
      onOkConfirm={onOkConfirm}
      onCloseConfirm={onCloseConfirm}
      onModalOkClick={onModalOkClick}
      closeConfirmModal={closeConfirmModal}
      deleteOption={deleteOption}
      setDeleteOption={setDeleteOption}
      autoApprYn={autoApprYn}
      setAutoApprYn={setAutoApprYn}
      freePassYn={freePassYn}
      setFreePassYn={setFreePassYn}
      autoName={autoName}
      freeName={freeName}
      onFreeName={onFreeName}
      deleteDays={deleteDays}
      onDeleteDays={onDeleteDays}
      onAutoName={onAutoName}
      onUpdate={onUpdate}
      openedModal={openedModal}
      updateTakeoutModal={updateTakeoutModal}
      deleteTakeoutModal={deleteTakeoutModal}
      closeTakeoutModal={closeTakeoutModal}
      autoConfirmOpened={autoConfirmOpened}
      setAutoConfirmOpened={setAutoConfirmOpened}
      isAutoAgreed={isAutoAgreed}
      isValidAuto1={isValidAuto1}
      setIsValidAuto1={setIsValidAuto1}
      isValidAuto2={isValidAuto2}
      setIsValidAuto2={setIsValidAuto2}
      onAutoConfirm={onAutoConfirm}
      onAutoCloseConfirm={onAutoCloseConfirm}
    />
  );
}
