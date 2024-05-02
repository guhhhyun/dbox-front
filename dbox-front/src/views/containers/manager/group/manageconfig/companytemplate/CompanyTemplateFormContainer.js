import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import CompanyTemplateForm from "views/templates/manager/group/manageconfig/companytemplate/CompanyTemplateForm";

console.debug("CompanyTemplateFormContainer.js");

export default function CompanyTemplateFormContainer() {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const [company, setCompany] = useState(comCode === "DKG" ? "DKS" : comCode);
  const childRef = useRef();

  const onCompanyChange = (event, company) => {
    company = event.target.value;
    setCompany(event.target.value);
    childRef.current.getData(company);
  };

  return <CompanyTemplateForm company={company} onCompanyChange={onCompanyChange} ref={childRef} comCode={comCode} />;
}
