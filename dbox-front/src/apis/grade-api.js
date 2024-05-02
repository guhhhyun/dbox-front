import httpUtil from "utils/http-util";

console.debug("grade-api.js");

/**
 * 보안등급 api
 */
const GradeRedefinitionApi = {
  async selectGradeRedefinition({ params, headers }) {
    return await httpUtil.get({
      url: `/api/grade/redefinition/`,
      headers,
      params: {
        uCodeType: params.uCodeType,
        uCodeVal1: params.uCodeVal1,
        rObjectId: params.rObjectId,
        uCodeName1: params.uCodeName1,
      },
    });
  },

  async updateGradeRedefinition({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/grade/redefinition/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uCodeName1: params.uCodeName1,
      },
    });
  },
};

export default GradeRedefinitionApi;
