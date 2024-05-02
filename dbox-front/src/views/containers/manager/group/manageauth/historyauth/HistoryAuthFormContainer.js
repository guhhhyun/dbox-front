import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useSelector } from "react-redux";
import CodeApi from "apis/code-api";
import HisViewUserApi from "apis/hisviewuser-api";
import HistoryAuthForm from "views/templates/manager/group/manageauth/historyauth/HistoryAuthForm";

console.debug("HistoryAuthFormContainer.js");

const HistoryAuthFormContainer = forwardRef((props, ref) => {
  const childRef = useRef(null);
  const user = useSelector((state) => state.session.user);
  const [companyName, setCompanyName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [opened, setOpened] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [checkedDeleteList, setCheckedDeleteList] = useState("");
  const [addUser, setAddUser] = useState({});
  const [codeName, setCodeName] = useState("");

  const comCode = user.mgr.companyComCode;
  const modalOption = {
    title: "사용자 추가",
    okText: "확인",
    cancelText: "취소",
  };

  const content = codeName + " 조회 권한을 해제하시겠습니까?";
  const alertContent = "이미 권한이 존재하는 사용자 입니다";

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
      setCompanyName(response.data.response[0].uCodeName1);
    } catch (e) {
      console.error(e);
    }
  };

  const getUserData = (params, name) => {
    setCodeName(name);
    setCodeValue(params.uCodeVal2);
    childRef.current.rightGrid.getUserData(params.uCodeVal2);
  };

  const onSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const onClick = () => {
    childRef.current.rightGrid.getSearchText(searchText, codeValue);
  };

  /**
   * 사용자 추가 저장
   */
  const onModalOkClick = async () => {
    setOpened(false);
    const chk = await getChk(addUser);

    if (chk > 0) {
      openAlertModal();
    } else {
      onModalSave(addUser);
    }
  };

  const getData = async () => {
    await childRef.current.leftGrid.getData();
    await childRef.current.rightGrid.getUserData(codeValue);
  };

  const getChk = async (params) => {
    try {
      const response = await HisViewUserApi.getHisViewUserList({
        params: {
          uHisCode: codeValue,
          uComCode: params.companyCode,
          uUserId: params.userCode,
        },
      });

      return response.data.response.length;
    } catch (e) {
      console.error(e);
    }
  };

  const onModalSave = async (params) => {
    try {
      const response = await HisViewUserApi.registHisViewUser({
        params: {
          uHisCode: codeValue,
          uComCode: params.companyCode,
          uUserId: params.userCode,
        },
      });
      if (response.status == 200) {
        console.log("OK");
      } else {
        throw new Error(response.data.message);
      }
      await getData();
    } catch (e) {
      console.error(e);
    }
  };

  const onDeleteModalOkClick = () => {
    checkedDeleteList.map((checked) => onSave(checked.data));
  };

  /**
   * 추가 사용자 삭제
   */
  const onSave = async (params) => {
    try {
      const response = await HisViewUserApi.deleteHisViewUser({
        params: {
          rObjectId: params.rObjectId,
        },
      });
      if (response.status == 200) {
        console.log("OK");
      } else {
        throw new Error(response.data.message);
      }
      setOpenedDelete(false);
      await getData();
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 삭제 모달 열기
   */
  const openDeleteModal = () => {
    setOpenedDelete(true);
  };

  /**
   * 삭제 모달 닫기
   */
  const closeDeleteModal = () => {
    setOpenedDelete(false);
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

  return (
    <HistoryAuthForm
      comCode={comCode}
      companyName={companyName}
      getUserData={getUserData}
      onSearchChange={onSearchChange}
      onClick={onClick}
      modalOption={modalOption}
      opened={opened}
      openModal={openModal}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      content={content}
      openedDelete={openedDelete}
      onDeleteModalOkClick={onDeleteModalOkClick}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      alertOpened={alertOpened}
      alertContent={alertContent}
      closeAlertModal={closeAlertModal}
      onAlertDialogOkClick={onAlertDialogOkClick}
      setCheckedDeleteList={setCheckedDeleteList}
      setAddUser={setAddUser}
      ref={childRef}
    />
  );
});
export default HistoryAuthFormContainer;
