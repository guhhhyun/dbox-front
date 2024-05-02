import httpUtil from "utils/http-util";
import { TOKEN } from "constants/http-constants";

console.debug("external-api.js");

const ExternalApi = {
  /**
   * 인스톨러 다운로드 조회
   */
  async getAgentInstaller({ params, headers }) {
    return await httpUtil.get({
      url: `/api/external/infs-installer`,
      headers,
    });
  },

  /**
   * 뷰어 url 조회
   */
  async getViewer(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/external/${params.dataId}/viewer`,
      headers,
      params: {
        token: params.token,
      },
    });
  },
};

export default ExternalApi;
