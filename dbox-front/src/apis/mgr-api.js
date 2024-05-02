import httpUtil from "utils/http-util";

console.debug("mgr-api.js");

const MgrApi = {
  /**
   * 관리자 여부 조회
   */
  async getMgrChk({ options }) {
    const { headers } = options || {};
    return await httpUtil.get({
      url: `/api/manager`,
      headers,
    });
  },
};

export default MgrApi;
