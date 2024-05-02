import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import UnusualApi from "apis/unusual-api";
import UnlockHistoryGrid from "views/templates/manager/group/unusual/unlockhistory/UnlockHistoryGrid";

console.debug("UnlockHistoryGridContainer.js");

const UnlockHistoryGridContainer = forwardRef(({ setCheckedList }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const [opened, setOpened] = useState(false);
  const [robjectid, setRobjectid] = useState(0);
  const [userObjectId, setUserObjectId] = useState(0);
  const [lockType, setLockType] = useState(0);
  const content = "잠금 해제 처리 하시겠습니까?";
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  let mgrType = "D";
  if (user.mgr.companyComCode || user.mgr.groupComCode) mgrType = "I";

  const gridRef = useRef(null);

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
          status: "U",
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
   * 모달 열기
   */
  const openModal = (params) => {
    setRobjectid(params.data.rObjectId);
    setUserObjectId(params.data.userObjectId);
    setLockType(params.data.uLockType);
    setOpened(true);
  };

  /**
   * 잠금 처리 저장
   */
  const onModalOkClick = async () => {
    await onModalSave();
    setOpened(false);
    getData();
  };

  const onModalSave = async () => {
    try {
      const response = await UnusualApi.patchUnusual({
        params: {
          rObjectId: robjectid,
          userObjectId: userObjectId,
          uLockStatus: "L",
          uLockType: lockType,
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
    <UnlockHistoryGrid
      ref={gridRef}
      onGridReady={onGridReady}
      openModal={openModal}
      opened={opened}
      content={content}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      onRowSelected={onRowSelected}
    />
  );
});

export default UnlockHistoryGridContainer;
