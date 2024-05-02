import React, { useState } from "react";
import SelectStopword from "views/templates/manager/group/share/searchblind/SelectStopword";

console.debug("SelectStopwordContainer.js");

export default function SelectStopwordContainer({ getApproval }) {
  const [approval, setApproval] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    setApproval({
      ...approval,
      [name]: event.target.value,
    });

    getApproval(event.target.value);
  };

  return <SelectStopword getApproval={getApproval} handleChange={handleChange} />;
}
