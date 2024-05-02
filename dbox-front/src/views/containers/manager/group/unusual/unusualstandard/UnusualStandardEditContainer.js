import { React, useEffect, useState, useCallback } from "react";
import UnusualStandardEdit from "views/templates/manager/group/unusual/unusualstandard/UnusualStandardEdit";
import CodeApi from "apis/code-api";

console.debug("UnusualStandardEditContainer.js");

export default function UnusualStandardEditContainer(props) {
  const [state, setState] = useState("");
  const [rObjectId, setRObjectId] = useState("");
  const [lockType, setLockType] = useState("");
  const [deptPer, setDeptPer] = useState("");
  const [personPer, setPersonPer] = useState("");
  const [warningNumber, setWarningNumber] = useState("");

  let comCode = props.comCode;
  let companyName = props.companyName;

  useEffect(() => {
    getCodeName(comCode);
  }, []);

  const getCodeName = async () => {
    try {
      const response = await CodeApi.getCodeList({
        params: {
          uCodeType: "CONFIG_ODD",
          uCodeVal1: comCode,
        },
      });
      setRObjectId(response.data.response[0].rObjectId);
      setLockType(response.data.response[0].uCodeVal2);
      setDeptPer(response.data.response[0].uCodeVal3);
      setPersonPer(response.data.response[0].uCodeName1);
      setWarningNumber(response.data.response[0].uCodeName2);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async () => {
    await save();
  };

  /**
   * 특이사용자 기준 설정 식별
   */
  const save = async () => {
    try {
      const response = await CodeApi.patchCode({
        params: {
          rObjectId: rObjectId,
          uCodeType: "CONFIG_ODD",
          uCodeVal1: comCode,
          uCodeVal2: lockType,
          uCodeVal3: deptPer,
          uCodeName1: personPer,
          uCodeName2: warningNumber,
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

  const onChangeDept = useCallback((e) => {
    setDeptPer(e.target.value);
  }, []);

  const onChangePerson = useCallback((e) => {
    setPersonPer(e.target.value);
  }, []);

  const onChangeNumber = useCallback((e) => {
    setWarningNumber(e.target.value);
  }, []);

  return (
    <UnusualStandardEdit
      companyName={companyName}
      lockType={lockType}
      setLockType={setLockType}
      deptPer={deptPer}
      personPer={personPer}
      warningNumber={warningNumber}
      onChangeDept={onChangeDept}
      onChangePerson={onChangePerson}
      onChangeNumber={onChangeNumber}
      onSubmit={onSubmit}
    />
  );
}
