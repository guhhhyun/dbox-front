import { TextField } from "@material-ui/core";
import React from "react";

console.debug("CompanyTemplateUpdateDialog.js");

export default function CompanyTemplateUpdateDialog({ modalParamNum, templateData, handleTemplateNameChange, templateName }) {
  if (modalParamNum === "1")
    return (
      <div>
        <div>
          PowerPoint 기본양식 가로형 이름 :
          <TextField
            style={{ padding: "3px" }}
            error={templateName === "" ? true : false}
            helperText={templateName === "" ? "템플릿 이름을 입력해주세요." : false}
            variant="outlined"
            defaultValue={templateData[0].objectName}
            onChange={handleTemplateNameChange}
          />
        </div>
      </div>
    );
  else if (modalParamNum === "2") {
    return (
      <div>
        <div>
          PowerPoint 기본양식 세로형 이름 :
          <TextField
            style={{ padding: "3px" }}
            error={templateName === "" ? true : false}
            helperText={templateName === "" ? "템플릿 이름을 입력해주세요." : false}
            variant="outlined"
            defaultValue={templateData[1].objectName}
            onChange={handleTemplateNameChange}
          />
        </div>
      </div>
    );
  } else if (modalParamNum === "3") {
    return (
      <div>
        <div>
          Excel 기본양식 이름 :
          <TextField
            style={{ padding: "3px" }}
            error={templateName === "" ? true : false}
            helperText={templateName === "" ? "템플릿 이름을 입력해주세요." : false}
            variant="outlined"
            defaultValue={templateData[2].objectName}
            onChange={handleTemplateNameChange}
          />
        </div>
      </div>
    );
  } else if (modalParamNum === "4") {
    return (
      <div>
        <div>
          Word 기본양식 이름 :
          <TextField
            style={{ padding: "3px" }}
            error={templateName === "" ? true : false}
            helperText={templateName === "" ? "템플릿 이름을 입력해주세요." : false}
            variant="outlined"
            defaultValue={templateData[3].objectName}
            onChange={handleTemplateNameChange}
          />
        </div>
      </div>
    );
  }
}
