import httpUtil from "utils/http-util";

console.debug("limit-api.js");

/**
 * 기능별 제한 api
 */
const LimitApi = {
  async selectLimitValue({ params, headers }) {
    return await httpUtil.get({
      url: `/api/limit/${encodeURIComponent(params.uComCode)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uCodeVal: params.uCodeVal,
        uCodeVal1: params.uCodeVal1,
        uCodeName: params.uCodeName,
        uComCode: params.uComCode,
      },
    });
  },

  async patchLimitValue({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/limit/${encodeURIComponent(params.rObjectId)}/update/${encodeURIComponent(params.uCodeVal)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uCodeVal: params.uCodeVal,
      },
    });
  },
};

export default LimitApi;
