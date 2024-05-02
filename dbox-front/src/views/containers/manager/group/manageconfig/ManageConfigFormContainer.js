import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ManageConfigForm from "views/templates/manager/group/manageconfig/ManageConfigForm";

console.debug("ManageConfigFormContainer.js");

export default function ManageConfigFormContainer() {
  const [company, setCompany] = useState("");

  const user = useSelector((state) => state.session.user);

  const getCompany = (company) => {
    setCompany(company);
  };

  if (!user) return <Redirect to="/login" />;

  return <ManageConfigForm company={company} getCompany={getCompany} />;
}
