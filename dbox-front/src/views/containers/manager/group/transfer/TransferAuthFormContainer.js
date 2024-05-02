import React, { useEffect, useState } from "react";
import TransferAuthForm from "views/templates/manager/group/transfer/TransferAuthForm";
import CodeApi from "apis/code-api";

console.debug("TransferAuthFormContainer.js");

export default function TransferAuthFormContainer() {
  const [result, setResult] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "3",
          uCodeVal2: "transfer-auth",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <TransferAuthForm result={result} />;
}
