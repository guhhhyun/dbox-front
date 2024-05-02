import React, { useEffect, useState } from "react";
import TakeoutControlForm from "views/templates/manager/dept/takeoutcontrol/TakeoutControlForm";
import CodeApi from "apis/code-api";

console.debug("TakeoutControlFormContainer.js");

export default function TakeoutControlFormContainer() {
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
          uCodeVal2: "takeout-control",
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

  return <TakeoutControlForm company={company} getCompany={getCompany} result={result} />;
}
