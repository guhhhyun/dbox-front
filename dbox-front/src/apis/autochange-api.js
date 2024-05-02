import httpUtil from "utils/http-util";

console.debug("autoChange-api.js");

const AutoChangeApi = {
  /**
   * 자동 변환 기간 조회
   */
  async getAutoChange({ params, headers }) {
    return await httpUtil.get({
      url: `/api/autoChange/${encodeURIComponent(params.uCodeVal1)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uCodeType: params.uCodeType,
        uCodeVal1: params.uCodeVal1,
        uCodeVal2: params.uCodeVal2,
      },
    });
  },

  /**
   * 자동 변환 기간 설정
   */
  async patchAutoChange({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/autoChange/${encodeURIComponent(params.rObjectId)}/patch`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uCodeVal2: params.uCodeVal2,
      },
    });
  },
};

export default AutoChangeApi;
