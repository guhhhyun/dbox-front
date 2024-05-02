import TemplateApi from "apis/template-api";
import React from "react";
import { useState } from "react";
import CompanyTemplateCreateDialog from "views/templates/manager/group/manageconfig/companytemplate/CompanyTemplateCreateDialog";

console.debug("CompanyTemplateCreateDialogContainer.js");

export default function CompanyTemplateCreateDialogContainer({ modalParamNum, handleFileChange, handleTemplateNameChange }) {
  return <CompanyTemplateCreateDialog modalParamNum={modalParamNum} handleFileChange={handleFileChange} handleTemplateNameChange={handleTemplateNameChange} />;
}
