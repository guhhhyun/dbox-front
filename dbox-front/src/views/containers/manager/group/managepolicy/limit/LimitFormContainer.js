import LimitAuthForm from "views/templates/manager/group/managepolicy/limit/LimitForm";
import { useState, useEffect } from "react";
import LimitApi from "apis/limit-api";
import filesize from "filesize";
import { useSelector } from "react-redux";

console.debug("LimitAuthFormContainer.js");

export default function LimitAuthFormContainer() {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const [selectComCode, setSelectComCode] = useState(comCode === "DKG" ? "DKS" : comCode);
  const [limitData, setLimitData] = useState([]);
  const [regValue, setRegValue] = useState("");
  const [copyValue, setCopyValue] = useState("");
  const [moveValue, setMoveValue] = useState("");
  const [delValue, setDelValue] = useState("");
  const [transValue, setTransValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [temRegValue, setTemRegValue] = useState("");
  const [temSizeValue, setTemSizeValue] = useState("");
  const [temTermValue, setTemTermValue] = useState("");
  const [opened, setOpened] = useState(false);
  const [warnOpened, setWarnOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  // 회사 선택
  const handleChange = (event, selectComCode) => {
    selectComCode = event.target.value;
    setSelectComCode(event.target.value);
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (selectComCode) => {
    try {
      const response = await LimitApi.selectLimitValue({
        params: {
          uComCode: selectComCode,
        },
      });
      setLimitData(response.data.response);
      setRegValue(response.data.response[0].uCodeVal);
      setCopyValue(response.data.response[1].uCodeVal);
      setMoveValue(response.data.response[2].uCodeVal);
      setDelValue(response.data.response[3].uCodeVal);
      setTransValue(response.data.response[4].uCodeVal);
      setSizeValue(filesize(response.data.response[5].uCodeVal, { output: "array" })[0]);
      setTemRegValue(response.data.response[6].uCodeVal);
      setTemSizeValue(response.data.response[7].uCodeVal);
      setTemTermValue(response.data.response[8].uCodeVal);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData(selectComCode);
  }, [selectComCode]);

  const handleRegChange = (event) => {
    setRegValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCopyChange = (event) => {
    setCopyValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleMoveChange = (event) => {
    setMoveValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleDelChange = (event) => {
    setDelValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleTransChange = (event) => {
    setTransValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleSizeChange = (event) => {
    setSizeValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleTemRegChange = (event) => {
    setTemRegValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleTemSizeChange = (event) => {
    setTemSizeValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleTemTermChange = (event) => {
    setTemTermValue(event.target.value.replace(/[^0-9]/g, ""));
  };

  /**
   * 설정 저장
   */
  const saveLimit = async () => {
    try {
      if (
        regValue != "" &&
        regValue < 1001 &&
        copyValue != "" &&
        copyValue < 1001 &&
        moveValue != "" &&
        moveValue < 1001 &&
        delValue != "" &&
        delValue < 1001 &&
        transValue != "" &&
        transValue < 1001 &&
        filesize(sizeValue, { output: "array" })[0] < 11 &&
        sizeValue != "" &&
        temRegValue != "" &&
        temRegValue < 201 &&
        temSizeValue != "" &&
        temSizeValue < 1001 &&
        temTermValue != "" &&
        temTermValue < 15
      ) {
        for (let i = 0; i < limitData.length; i++) {
          let uCodeValue =
            i === 0
              ? regValue
              : i === 1
              ? copyValue
              : i === 2
              ? moveValue
              : i === 3
              ? delValue
              : i === 4
              ? transValue
              : i === 5
              ? sizeValue * (1024 * 1024 * 1024)
              : i === 6
              ? temRegValue
              : i === 7
              ? temSizeValue
              : i === 8
              ? temTermValue
              : null;

          await LimitApi.patchLimitValue({
            params: {
              rObjectId: limitData[i].rObjectId,
              uCodeVal: uCodeValue,
            },
          });
        }
        closeModal();
        setClearOpened(true);
      } else {
        openWarnModal();
        closeModal();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openWarnModal = () => {
    setWarnOpened(true);
  };
  const closeWarnModal = () => {
    setWarnOpened(false);
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

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <LimitAuthForm
      handleChange={handleChange}
      limitData={limitData}
      regValue={regValue}
      copyValue={copyValue}
      moveValue={moveValue}
      delValue={delValue}
      transValue={transValue}
      sizeValue={sizeValue}
      temRegValue={temRegValue}
      temSizeValue={temSizeValue}
      temTermValue={temTermValue}
      handleRegChange={handleRegChange}
      handleCopyChange={handleCopyChange}
      handleMoveChange={handleMoveChange}
      handleDelChange={handleDelChange}
      handleTransChange={handleTransChange}
      handleSizeChange={handleSizeChange}
      handleTemRegChange={handleTemRegChange}
      handleTemSizeChange={handleTemSizeChange}
      handleTemTermChange={handleTemTermChange}
      saveLimit={saveLimit}
      opened={opened}
      onButtonClick={openModal}
      onModalClose={closeModal}
      closeWarnModal={closeWarnModal}
      warnOpened={warnOpened}
      comCode={comCode}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
    />
  );
}
