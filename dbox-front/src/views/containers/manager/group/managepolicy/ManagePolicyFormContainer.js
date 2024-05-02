import React, { useEffect, useState } from "react";
import ManagePolicyForm from "views/templates/manager/group/managepolicy/ManagePolicyForm";
import CodeApi from "apis/code-api";

console.debug("ManagePolicyFormContainer.js");

export default function ManagePolicyFormContainer() {
  const [result, setResult] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "3",
          uCodeVal2: "manage-policy",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <ManagePolicyForm result={result} />;
}
