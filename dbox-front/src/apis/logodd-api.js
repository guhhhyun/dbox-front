import { PanoramaSharp } from "@material-ui/icons";
import httpUtil from "utils/http-util";

console.debug("logodd-api.js");

/**
 * 특이 사용 이력 api
 */
const LogOddApi = {
  async getLogOddAll({ params, headers }) {
    return await httpUtil.get({
      url: `/api/log-odd`,
      headers,
      params: {
        logStartDate: params.logStartDate,
        logEndDate: params.logEndDate,
        uUserId: params.userId,
      },
    });
  },
};

export default LogOddApi;
