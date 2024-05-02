import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import AlertDialog from "views/commons/dialog/AlertDialog";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import UnusualApi from "apis/unusual-api";
import LockManageGrid from "views/templates/manager/group/unusual/lockmanage/LockManageGrid";

console.debug("LockManageGridContainer.js");

const LockManageGridContainer = forwardRef(({ setCheckedList }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const [opened, setOpened] = useState(false);
  const [robjectid, setRobjectid] = useState(0);
  const [userObjectId, setUserObjectId] = useState(0);
  const content = "잠금 해제 하시겠습니까? \n해제사유를 작성해 주시기 바랍니다.";
  const [requestReason, setRequestReason] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const gridRef = useRef(null);
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  let mgrType = "D";
  if (user.mgr.companyComCode || user.mgr.groupComCode) mgrType = "I";

  useImperativeHandle(ref, () => ({
    getSearchData,
    getData,
  }));

  const getSearchData = (response) => {
    gridRef.current.api.setRowData(response.data.response);
  };

  const getData = async () => {
    try {
      const response = await UnusualApi.getUnusualAll({
        params: {
          status: "L",
          company: comCode,
          mgrType: mgrType,
        },
      });
      gridRef.current.api.setRowData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    getData();
    setGridApi(params.api);
  };

  /**
   * 유효성 검사
   */
  const validation = () => {
    let error = "";
    if (!requestReason) {
      error = "해제 사유를 입력해주세요";
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
   * 모달 열기
   */
  const openModal = (params) => {
    setRobjectid(params.data.rObjectId);
    setUserObjectId(params.data.userObjectId);
    setOpened(true);
  };

  /**
   * 잠금 해제 저장
   */
  const onModalOkClick = async () => {
    const valid = validation();

    if (valid) {
      await onModalSave();
      setOpened(false);
      getData();
    }
  };

  const onModalSave = async () => {
    try {
      const response = await UnusualApi.patchUnusual({
        params: {
          rObjectId: robjectid,
          userObjectId: userObjectId,
          uLockStatus: "U",
          uUndesigReason: requestReason,
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

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  const onRowSelected = (event) => {
    setCheckedList(gridApi.getSelectedNodes());
  };

  return (
    <Fragment>
      <AlertDialog open={alertOpened} content={errorMsg} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />

      <LockManageGrid
        ref={gridRef}
        onGridReady={onGridReady}
        openModal={openModal}
        opened={opened}
        content={content}
        onModalOkClick={onModalOkClick}
        onModalClose={closeModal}
        onRowSelected={onRowSelected}
        onRequestReasonChanged={setRequestReason}
      />
    </Fragment>
  );
});

export default LockManageGridContainer;
