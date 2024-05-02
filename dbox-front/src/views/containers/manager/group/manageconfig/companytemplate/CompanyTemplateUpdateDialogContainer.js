import React from "react";
import CompanyTemplateUpdateDialog from "views/templates/manager/group/manageconfig/companytemplate/CompanyTemplateUpdateDialog";

console.debug("CompanyTemplateUpdateDialogContainer.js");

export default function CompanyTemplateUpdateDialogContainer({ modalParamNum, templateData, handleTemplateNameChange, templateName }) {
  return (
    <CompanyTemplateUpdateDialog
      modalParamNum={modalParamNum}
      templateData={templateData}
      handleTemplateNameChange={handleTemplateNameChange}
      templateName={templateName}
    />
  );
}
