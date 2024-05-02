import React, { useEffect, useState } from "react";
import AuthManageForm from "views/templates/manager/dept/authmanage/AuthManageForm";
import CodeApi from "apis/code-api";

console.debug("AuthManageFormContainer.js");

export default function AuthManageFormContainer() {
  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "3",
          uCodeVal2: "auth-manage",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  const getCompany = (company) => {
    setCompany(company);
  };

  return <AuthManageForm company={company} getCompany={getCompany} result={result} />;
}
