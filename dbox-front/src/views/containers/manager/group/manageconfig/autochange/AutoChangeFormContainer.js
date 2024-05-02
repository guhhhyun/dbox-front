import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AutoChangeForm from "views/templates/manager/group/manageconfig/autochange/AutoChangeForm";
import AutoChangeApi from "apis/autochange-api";

console.debug("AutoChangeFormContainer.js");

export default function AutoChangeFormContainer() {
  const [selectAutoChange, setSelectAutoChange] = useState("");
  const [opened, setOpened] = useState(false);
  const [autoChangeData, setAutoChangeData] = useState([]);
  const [autoChangeDefaultValue, setAutoChangeDefaultValue] = useState("");
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
      const response = await AutoChangeApi.getAutoChange({
        params: {
          uCodeType: "CONFIG_CLOSED_PERIOD",
          uCodeVal1: selectCompany,
        },
      });
      setAutoChangeData(response.data.response);
      setAutoChangeDefaultValue(response.data.response[0].uCodeVal2);
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
  const onAutoChange = (event) => {
    setSelectAutoChange(event.target.value);
    setAutoChangeDefaultValue(event.target.value);
  };

  /**
   * 확인 버튼
   */
  const onModalOkClick = async () => {
    try {
      await AutoChangeApi.patchAutoChange({
        params: {
          rObjectId: autoChangeData[0].rObjectId,
          uCodeVal2: selectAutoChange === "" ? autoChangeDefaultValue : selectAutoChange,
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
    <AutoChangeForm
      onCompanyChange={onCompanyChange}
      onAutoChange={onAutoChange}
      onButtonClick={openModal}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      opened={opened}
      autoChangeData={autoChangeData}
      autoChangeDefaultValue={autoChangeDefaultValue}
      comCode={comCode}
      openWarnModal={openWarnModal}
      closeWarnModal={closeWarnModal}
      closeClearModal={closeClearModal}
      warnOpened={warnOpened}
      clearOpened={clearOpened}
    />
  );
}
