import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import PresetForm from "views/templates/manager/dept/preset/PresetForm";
import CodeApi from "apis/code-api";
import UserPresetApi from "apis/userprest-api";
import PreservationPeriodApi from "apis/preservationperiod-api";

console.debug("PresetFormContainer.js");

export default function PresetFormContainer() {
  const user = useSelector((state) => state.session.user);
  const [showResults, setShowResults] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [result, setResult] = useState();
  let liveReadList = new Array();
  let liveDeleteList = new Array();
  let closedReadList = new Array();
  const [rObjectId, setRObjectId] = useState("");
  const [mode, setMode] = useState("");
  const [configType, setConfigType] = useState("");
  const [configName, setConfigName] = useState("");
  const [openFlag, setOpenFlag] = useState("");
  const [liveRead, setLiveRead] = useState("");
  const [liveDelete, setLiveDelete] = useState();
  const [closedRead, setClosedRead] = useState("");
  const [secLevel, setSecLevel] = useState("");
  const [pcRegFlag, setPcRegFlag] = useState("");
  const [copyFlag, setCopyFlag] = useState("");
  const [editSaveFlag, setEditSaveFlag] = useState("");
  const [mailPermitFlag, setMailPermitFlag] = useState("");
  const [preserveFlag, setPreserveFlag] = useState("");
  const [preserveList, setPreserveList] = useState();
  const [preserveResult, setPreserveResult] = useState();
  const [state, setState] = useState("");

  const childRef = useRef(null);

  const modalOption = {
    title: "권한 추가",
    okText: "확인",
    cancelText: "취소",
  };

  const [content, setContent] = useState("");

  useEffect(() => {
    getCodeName();
    getPreservationPeriodByComCode();
  }, []);

  const getPreservationPeriodByComCode = async () => {
    const response = await PreservationPeriodApi.getPreservationPeriodByComCode(user.comOrgId);
    const data = response.data.response;
    setPreserveResult(data);
  };

  const getCodeName = async () => {
    try {
      const response = await CodeApi.getCodeList({
        params: {
          uCodeType: "PRESERVE_VALUE",
        },
      });
      setPreserveList(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 유효성 검사
   */
  const validation = () => {
    let error = "";

    if (!secLevel) {
      error = "보안등급을 설정해주세요";
    }

    if (!preserveFlag) {
      error = "보존연한을 설정해주세요";
    }

    if (!configName) {
      error = "사전 설정명을 입력해주세요";
    }

    if (error) {
      openAlertModal(error);
      return false;
    }
    return true;
  };

  const changeItem = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });

    setPreserveFlag(event.target.value);
  };

  const getDetailData = async (params) => {
    //기본값 여부
    setConfigType(params.uConfigType);

    if (params === "group") {
      setShowResults(false);
    } else {
      setShowResults(true);
      try {
        const response = await UserPresetApi.getUserPresetAll({
          params: {
            rObjectId: params.rObjectId,
          },
        });
        const data = response.data.response;
        if (data) {
          setRObjectId(params.rObjectId);
          setConfigName(data[0].uConfigName);
          setOpenFlag(data[0].uOpenFlag);
          setSecLevel(data[0].uSecLevel);
          setPcRegFlag(data[0].uPcRegFlag);
          setCopyFlag(data[0].uCopyFlag);
          setEditSaveFlag(data[0].uEditSaveFlag);
          setMailPermitFlag(data[0].uMailPermitFlag);
          setPreserveFlag(data[0].uPreserveFlag);
          setLiveRead("");
          setLiveDelete("");
          setClosedRead("");
        }
        setResult(response.data.response);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onRegister = () => {
    setResult("");
    setRObjectId("");
    setMode("");
    setConfigName("");
    setOpenFlag("");
    setLiveRead("");
    setLiveDelete("");
    setClosedRead("");
    setSecLevel("");
    setPcRegFlag("C");
    setCopyFlag("K");
    setEditSaveFlag("V");
    setMailPermitFlag("Y");
    setPreserveFlag("");
    setConfigType("C");
    setShowResults(true);
  };

  /**
   * 수정
   */
  const handleClick = (param, e) => {
    e.preventDefault();

    switch (param) {
      case "R":
        setMode("R");
        break;
      case "D":
        setMode("D");
        break;
      case "C":
        setMode("C");
        break;
    }
    openModal();
  };

  /**
   * 검색 데이터 저장
   */
  const onModalOkClick = () => {
    const result = childRef.current.getMultiValue();

    switch (mode) {
      case "R":
        liveReadList = liveRead;
        result.selectedNodes.map(async (item) => {
          try {
            let cnt = 0;
            if (rObjectId) {
              const response = await UserPresetApi.getUserPresetDetailCount({
                params: {
                  rObjectId: rObjectId,
                  uLiveReadAuthor: item.key,
                },
              });
              cnt = response.data.response;
            }
            if (cnt === 0) {
              if (item.img === "USER") {
                //사용자
                liveReadList = [...liveReadList, { id: item.data.userId, name: item.data.displayName, type: item.img }];
              } else {
                //그룹
                liveReadList = [...liveReadList, { id: item.data.orgId, name: item.data.orgNm, type: item.img }];
              }
              setLiveRead(liveReadList);
            } else {
              openAlertModal("D");
            }
          } catch (e) {
            console.error(e);
          }
        });
        break;

      case "D":
        liveDeleteList = liveDelete;
        result.selectedNodes.map(async (item) => {
          try {
            let cnt = 0;
            if (rObjectId) {
              const response = await UserPresetApi.getUserPresetDetailCount({
                params: {
                  rObjectId: rObjectId,
                  uLiveDeleteAuthor: item.key,
                },
              });
              cnt = response.data.response;
            }
            if (cnt === 0) {
              if (item.img === "USER") {
                //사용자
                liveDeleteList = [...liveDeleteList, { id: item.data.userId, name: item.data.displayName, type: item.img }];
              } else {
                //그룹
                liveDeleteList = [...liveDeleteList, { id: item.data.orgId, name: item.data.orgNm, type: item.img }];
              }
              setLiveDelete(liveDeleteList);
            } else {
              openAlertModal("D");
            }
          } catch (e) {
            console.error(e);
          }
        });
        break;

      case "C":
        closedReadList = closedRead;

        result.selectedNodes.map(async (item) => {
          try {
            let cnt = 0;
            if (rObjectId) {
              const response = await UserPresetApi.getUserPresetDetailCount({
                params: {
                  rObjectId: rObjectId,
                  uClosedReadAuthor: item.key,
                },
              });
              cnt = response.data.response;
            }
            if (cnt === 0) {
              if (item.img === "USER") {
                //사용자
                closedReadList = [...closedReadList, { id: item.data.userId, name: item.data.displayName, type: item.img }];
              } else {
                //그룹
                closedReadList = [...closedReadList, { id: item.data.orgId, name: item.data.orgNm, type: item.img }];
              }
              setClosedRead(closedReadList);
            } else {
              openAlertModal("D");
            }
          } catch (e) {
            console.error(e);
          }
        });
        break;
    }
    setOpened(false);
  };
  const onSave = () => {
    const presetData = childRef.current.result;
    const checkedRegInputs = childRef.current.checkedRegInputs;
    const checkedInputs = childRef.current.checkedInputs;

    presetData.map((item, index) => {
      const regChecked = checkedRegInputs.filter((checkedRegInput) => checkedRegInput == index);
      let regFlag = "F";
      if (regChecked.length > 0) {
        regFlag = "T";
      }

      const secChecked = checkedInputs.filter((checkedInput) => checkedInput == index);
      let secFlag = "F";
      if (secChecked.length > 0) {
        secFlag = "T";
      }

      onSaveData(item, regFlag, secFlag);
    });
  };

  const onSaveData = async (params, regFlag, secFlag) => {
    try {
      const response = await UserPresetApi.patchUserPreset({
        params: {
          rObjectId: params.rObjectId,
          uRegBaseFlag: regFlag == "T" ? "1" : "0",
          uSecBaseFlag: secFlag == "T" ? "1" : "0",
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
    openAlertModal("S");
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
   * Alert 모달 열기
   */
  const openAlertModal = (params) => {
    switch (params) {
      case "S":
        setContent("저장되었습니다");
        break;
      case "D":
        setContent("중복 접근자는 제외되고 추가되었습니다.");
        break;
      default:
        setContent(params);
        break;
    }
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
   * 저장 모달 열기
   */
  const openModalSave = () => {
    setAlertModal(true);
  };

  /**
   * 저장 모달 닫기
   */
  const closeModalSave = () => {
    setAlertModal(false);
  };

  /**
   * PC 문서 등록 여부
   */
  const onChange = (param, e) => {
    //e.preventDefault();

    switch (param) {
      case "P":
        setPcRegFlag(e.target.value);
        break;

      case "C":
        setCopyFlag(e.target.value);
        break;

      case "E":
        setEditSaveFlag(e.target.value);
        break;

      case "M":
        setMailPermitFlag(e.target.value);
        break;

      default:
        break;
    }
  };

  const onClose = (mode, params, e) => {
    switch (mode) {
      case "R":
        setLiveRead("");
        liveRead.map((item) => {
          if (item.id !== params) {
            liveReadList = [...liveReadList, { id: item.id, name: item.name, type: item.type }];
            setLiveRead(liveReadList);
          }
        });
        break;
      case "D":
        liveDelete.map((item) => {
          setLiveDelete("");
          if (item.id !== params) {
            liveDeleteList = [...liveDeleteList, { id: item.id, name: item.name, type: item.type }];
            setLiveDelete(liveDeleteList);
          }
        });
        break;
      case "C":
        closedRead.map((item) => {
          setClosedRead("");
          if (item.id !== params) {
            closedReadList = [...closedReadList, { id: item.id, name: item.name, type: item.type }];
            setClosedRead(closedReadList);
          }
        });
        break;
    }
  };

  const onConfigName = useCallback((e) => {
    setConfigName(e.target.value);
  }, []);

  const onSaveDetail = async () => {
    const valid = validation();

    if (valid) {
      if (rObjectId === "") {
        /**
         * 추가
         */
        try {
          const response = await UserPresetApi.createUserPreset({
            params: {
              uConfigName: configName,
              liveRead: liveRead,
              liveDelete: liveDelete,
              closedRead: closedRead,
              uSecLevel: secLevel,
              uPcRegFlag: pcRegFlag,
              uCopyFlag: copyFlag,
              uEditSaveFlag: editSaveFlag,
              uMailPermitFlag: mailPermitFlag,
              uOpenFlag: openFlag,
            },
          });
          if (response.status == 200) {
            openAlertModal("S");
            const getPresetData = childRef.current.getData;
            getPresetData();
          } else {
            throw new Error(response.data.message);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const response = await UserPresetApi.patchUserPreset({
            params: {
              rObjectId: rObjectId,
              uConfigName: configName,
              liveRead: liveRead,
              liveDelete: liveDelete,
              closedRead: closedRead,
              uSecLevel: secLevel,
              uPcRegFlag: pcRegFlag,
              uCopyFlag: copyFlag,
              uEditSaveFlag: editSaveFlag,
              uMailPermitFlag: mailPermitFlag,
              uOpenFlag: openFlag,
            },
          });
          if (response.status == 200) {
            openAlertModal("S");
            console.log("OK");
          } else {
            throw new Error(response.data.message);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <PresetForm
      showResults={showResults}
      onRegister={onRegister}
      getDetailData={getDetailData}
      alertOpened={alertOpened}
      closeAlertModal={closeAlertModal}
      onAlertDialogOkClick={onAlertDialogOkClick}
      ref={childRef}
      opened={opened}
      modalOption={modalOption}
      onModalOkClick={onModalOkClick}
      onModalClose={closeModal}
      result={result}
      configType={configType}
      configName={configName}
      openFlag={openFlag}
      setOpenFlag={setOpenFlag}
      liveRead={liveRead}
      setLiveRead={setLiveRead}
      liveDelete={liveDelete}
      setLiveDelete={setLiveDelete}
      closedRead={closedRead}
      setClosedRead={setClosedRead}
      handleClick={handleClick}
      liveReadList={liveReadList}
      liveDeleteList={liveDeleteList}
      closedReadList={closedReadList}
      secLevel={secLevel}
      setSecLevel={setSecLevel}
      pcRegFlag={pcRegFlag}
      onChange={onChange}
      copyFlag={copyFlag}
      editSaveFlag={editSaveFlag}
      mailPermitFlag={mailPermitFlag}
      preserveFlag={preserveFlag}
      setPreserveFlag={setPreserveFlag}
      onConfigName={onConfigName}
      onClose={onClose}
      onSave={onSave}
      onSaveDetail={onSaveDetail}
      alertModal={alertModal}
      openModalSave={openModalSave}
      closeModalSave={closeModalSave}
      preserveList={preserveList}
      changeItem={changeItem}
      content={content}
      preserveResult={preserveResult}
    />
  );
}
