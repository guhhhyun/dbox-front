import React, { useEffect, useState } from "react";
import UnusualForm from "views/templates/manager/group/unusual/UnusualForm";
import CodeApi from "apis/code-api";

console.debug("UnusualFormContainer.js");

export default function UnusualFormContainer() {
  const [result, setResult] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "3",
          uCodeVal2: "unusual",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <UnusualForm result={result} />;
}
