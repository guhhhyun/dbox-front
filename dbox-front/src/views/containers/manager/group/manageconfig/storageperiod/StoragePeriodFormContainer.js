import React, { useState, useRef } from "react";
import StoragePeriodForm from "views/templates/manager/group/manageconfig/storageperiod/StoragePeriodForm";

console.debug("StoragePeriodFormContainer.js");

export default function StoragePeriodFormContainer() {
  const [company, setCompany] = useState("DKS");
  const childRef = useRef();

  const onCompanyChange = (event, company) => {
    company = event.target.value;
    setCompany(event.target.value);
    childRef.current.getData(company);
  };

  return <StoragePeriodForm onCompanyChange={onCompanyChange} company={company} ref={childRef} />;
}
