import React, { useEffect, useState } from "react";
import ManageAuthForm from "views/templates/manager/group/manageauth/ManageAuthForm";
import CodeApi from "apis/code-api";

console.debug("ManageAuthFormContainer.js");

export default function ManageAuthFormContainer() {
  const [result, setResult] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "3",
          uCodeVal2: "manage-auth",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <ManageAuthForm result={result} />;
}
