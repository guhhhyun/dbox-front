import React, { useEffect, useState } from "react";
import GradeForm from "views/templates/manager/group/grade/GradeForm";
import CodeApi from "apis/code-api";

console.debug("GradeFormContainer.js");

export default function GradeFormContainer() {
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
          uCodeVal2: "grade-change",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <GradeForm handleChange={handleChange} value={value} result={result} />;
}
