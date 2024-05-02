import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApprovalForm from "views/templates/manager/group/manageconfig/approval/ApprovalForm";
import ApprovalApi from "apis/approval-api";

console.debug("ApprovalFormContainer.js");

export default function ApprovalFormContainer() {
  const [selectApproval, setSelectApproval] = useState("");
  const [opened, setOpened] = useState(false);
  const [approvalData, setApprovalData] = useState([]);
  const [approvalDefaultValue, setApprovalDefaultValue] = useState("");
  const [warnOpened, setWarnOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  /**
   *  회사선택
   */
  const onCompanyChange = (event) => {
    var selectCompany = event.target.value;
    getData(selectCompany);
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (selectCompany) => {
    try {
      const response = await ApprovalApi.getApproval({
        params: {
          uCodeType: "CONFIG_TRANS_WF",
          uCodeVal1: selectCompany,
        },
      });
      setApprovalData(response.data.response);
      setApprovalDefaultValue(response.data.response[0].uCodeVal2);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (comCode != "DKG") {
      getData(comCode);
    }
  }, []);
  /**
   *  승인 여부 선택
   */
  const onApprovalChange = (event) => {
    setSelectApproval(event.target.value);
    setApprovalDefaultValue(event.target.value);
  };

  /**
   * 확인 버튼
   */
  const onModalOkClick = async () => {
    try {
      await ApprovalApi.patchApproval({
        params: {
          rObjectId: approvalData[0].rObjectId,
          uCodeVal2: selectApproval === "" ? approvalDefaultValue : selectApproval,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setOpened(false);
    setClearOpened(true);
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

  const openWarnModal = () => {
    setWarnOpened(true);
  };

  const closeWarnModal = () => {
    setWarnOpened(false);
  };

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <ApprovalForm
      onCompanyChange={onCompanyChange}
      onApprovalChange={onApprovalChange}
      onButtonClick={openModal}
      openWarnModal={openWarnModal}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      closeWarnModal={closeWarnModal}
      closeClearModal={closeClearModal}
      clearOpened={clearOpened}
      opened={opened}
      warnOpened={warnOpened}
      approvalData={approvalData}
      approvalDefaultValue={approvalDefaultValue}
      comCode={comCode}
    />
  );
}
