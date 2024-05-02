import httpUtil from "utils/http-util";

console.debug("template-api.js");

const TemplateApi = {
  async getTemplateList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/templates/${encodeURIComponent(params.comOrgId)}/select/${encodeURIComponent(params.delStatus)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uComCode: params.uComCode,
        uTemplateType: params.uTemplateType,
        uTemplateName: params.uTemplateName,
        objectName: params.objectName,
        uSortOrder: params.uSortOrder,
        contentExtension: params.contentExtension,
        rCreationDate: params.rCreationDate,
        rModifyDate: params.rModifyDate,
        comOrgId: params.comOrgId,
        uDeleteStatus: params.uDeleteStatus,
        delStatus: params.delStatus,
      },
    });
  },
  // async templateUpdate({ params, headers }) {
  //   return await httpUtil.patch({
  //     url: `/api/templates/${encodeURIComponent(params.rObjectId)}/patch/${encodeURIComponent(params.objectName)}`,
  //     headers,
  //     data: {
  //       rObjectId: params.rObjectId,
  //       uTemplateName: params.uTemplateName,
  //       file: params.file,
  //     },
  //   });
  // },
  async deleteTemplate({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/templates/${encodeURIComponent(params.rObjectId)}/delete`,
      headers,
      data: {
        rObjectId: params.rObjectId,
      },
    });
  },
  async templateNameUpdate({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/templates/${encodeURIComponent(params.rObjectId)}/nameUpdate/${encodeURIComponent(params.objectName)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        objectName: params.objectName,
      },
    });
  },
};

export default TemplateApi;
