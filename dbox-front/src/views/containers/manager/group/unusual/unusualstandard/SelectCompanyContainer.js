import React, { useState } from "react";
import SelectCompany from "views/templates/manager/common/SelectCompany";

console.debug("SelectCompanyContainer.js");

export default function SelectCompanyContainer(props) {
  const [state, setState] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });

    props.onSearchCompany(event.target.value);
  };

  return <SelectCompany state={state} handleChange={handleChange} />;
}
