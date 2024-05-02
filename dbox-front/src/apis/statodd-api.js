import { PanoramaSharp } from "@material-ui/icons";
import httpUtil from "utils/http-util";

console.debug("statodd-api.js");

/**
 * 특이 사용 이력 api
 */
const StatOddApi = {
  async getStatOddAll({ params, headers }) {
    return await httpUtil.get({
      url: `/api/stat-odd`,
      headers,
      params: {
        uComCode: params.uComCode,
        uDeptCode: params.uDeptCode,
        uUserId: params.uUserId,
        statStartDate: params.statStartDate,
        statEndDate: params.statEndDate,
      },
    });
  },
};

export default StatOddApi;
