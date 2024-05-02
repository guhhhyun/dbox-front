import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CodeApi from "apis/code-api";
import UnusualStandardForm from "views/templates/manager/group/unusual/unusualstandard/UnusualStandardForm";

console.debug("UnusualStandardFormContainer.js");

export default function UnusualStandardFormContainer() {
  const user = useSelector((state) => state.session.user);
  const [companyName, setCompanyName] = useState("");
  const comCode = user.mgr.companyComCode;

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

  return <UnusualStandardForm comCode={comCode} companyName={companyName} />;
}
