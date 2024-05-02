import httpUtil from "utils/http-util";

console.debug("limitvalue-api.js");

const LimitValueApi = {
  /**
   * 기능별 제한값 리스트 조회
   */
  async getLimitValueList(options) {
    const { headers } = options || {};
    return await httpUtil.get({
      url: `/api/limit-values`,
      headers,
    });
  },
};

export default LimitValueApi;
