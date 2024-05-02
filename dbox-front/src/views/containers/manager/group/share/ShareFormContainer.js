import React, { useEffect, useState } from "react";
import ShareForm from "views/templates/manager/group/share/ShareForm";
import CodeApi from "apis/code-api";

console.debug("ShareFormContainer.js");

export default function ShareFormContainer() {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "3",
          uCodeVal2: "share",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <ShareForm value={value} handleChange={handleChange} result={result} />;
}
