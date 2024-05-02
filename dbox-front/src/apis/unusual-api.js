import { PanoramaSharp } from "@material-ui/icons";
import httpUtil from "utils/http-util";

console.debug("unusual-api.js");

/**
 * 특이사용자 api
 */
const UnusualApi = {
  async getUnusualAll({ params, headers }) {
    return await httpUtil.get({
      url: `/api/unusuals`,
      headers,
      params: {
        uLockType: params.type,
        uLockStatus: params.status,
        uCodeValue1: params.company === "DKG" ? "" : params.company,
        orgId: params.dept,
        uUserId: params.user,
        overStartDate: params.startDate,
        overEndDate: params.endDate,
        desigStartDate: params.desigStartDate,
        desigEndDate: params.desigEndDate,
        uUserType: params.mgrType,
      },
    });
  },

  /**
   * 특이사용자 잠금 처리
   */
  async patchUnusual({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/unusuals/${encodeURIComponent(params.rObjectId)}/users/${encodeURIComponent(params.userObjectId)}`,
      headers,
      data: {
        uLockStatus: params.uLockStatus,
        uLockType: params.uLockType,
        uUndesigReason: params.uUndesigReason,
      },
    });
  },

  /**
   * 사용자 잠금 처리
   */
  async registUserLock({ params, headers }) {
    return await httpUtil.post({
      url: `/api/unusuals`,
      headers,
      data: {
        uUserId: params.user,
        uLockStatus: params.status,
        uLockType: params.type,
        uDeigReason: params.requestReason,
        uDesigDate: params.lockDate,
      },
    });
  },

  /**
   * 사전Warning 기준값 조회 api
   */
  async getDeptInform({ params, headers }) {
    return await httpUtil.get({
      url: `/api/deptInform/${encodeURIComponent(params.uComCode)}/${encodeURIComponent(params.uDeptCode)}`,
      headers,
      params: {
        uComCode: params.uComCode,
        uDeptCode: params.uDeptCode,
      },
    });
  },

  /**
   * 사전Warning 기준값 수정
   */
  async patchDeptInform({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/deptInform`,
      headers,
      data: {
        type: params.type,
        uComCode: params.uComCode,
        uDeptCode: params.uDeptCode,
        uCountDownload: params.uCountDownload,
        uCountTakeout: params.uCountTakeout,
        uCountReqPermit: params.uCountReqPermit,
        uCountPrint: params.uCountPrint,
        uCountDelete: params.uCountDelete,
      },
    });
  },

  /**
   * 사전Warning 기준값 사별 전체 api
   */
  async getDeptInformAll({ params, headers }) {
    return await httpUtil.get({
      url: `/api/deptInform/excel/${encodeURIComponent(params.uComCode)}`,
      headers,
      params: {},
    });
  },
};

export default UnusualApi;
