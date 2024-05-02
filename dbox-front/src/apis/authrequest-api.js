import httpUtil from "utils/http-util";

console.debug("authrequest-api.js");

/**
 * 조회권한 요청 목록 api
 */
const AuthRequestApi = {
  async selectAuthRequest({ params, headers }) {
    return await httpUtil.get({
      url: `/api/authRequest`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uReqDeptCode: params.uReqDeptCode,
        orgNm: params.orgNm,
        comOrgId: params.comOrgId,
        uReqUser: params.uReqUser,
        displayName: params.displayName,
        uReqDocKey: params.uReqDocKey,
        uReqDocId: params.uReqDocId,
        uReqDocName: params.uReqDocName,
        uSecLevel: params.uSecLevel,
        uReqReason: params.uReqReason,
        uReqDate: params.uReqDate,
        uOpenFlag: params.uOpenFlag,
        uApprover: params.uApprover,
        uRejectReason: params.uRejectReason,
        overStartDate: params.startDate,
        overEndDate: params.endDate,
        uOwnDeptCode: params.uOwnDeptCode,
        email: params.email,
      },
    });
  },

  /**
   * 조회권한 요청결과 목록 api
   */
  async selectAuthWithdrawal({ params, headers }) {
    return await httpUtil.get({
      url: `/api/authWithdrawal`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uReqDeptCode: params.uReqDeptCode,
        orgNm: params.orgNm,
        comOrgId: params.comOrgId,
        uReqUser: params.uReqUser,
        uReqStatus: params.uReqStatus,
        displayName: params.displayName,
        uReqDocKey: params.uReqDocKey,
        uReqDocId: params.uReqDocId,
        uReqDocName: params.uReqDocName,
        uSecLevel: params.uSecLevel,
        uReqReason: params.uReqReason,
        uReqDate: params.uReqDate,
        uOpenFlag: params.uOpenFlag,
        uApprover: params.uApprover,
        uRejectReason: params.uRejectReason,
        overStartDate: params.startDate,
        overEndDate: params.endDate,
        email: params.email,
      },
    });
  },
  /**
   * 조회권한 수정
   */
  async patchAuthRequest({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/authRequest/update`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uReqStatus: params.uReqStatus,
        uRejectReason: params.uRejectReason,
        email: params.email,
        uReqDocId: params.uReqDocId,
        uReqDocName: params.uReqDocName,
        uReqDeptCode: params.uReqDeptCode,
        uOwnDeptCode: params.uOwnDeptCode,
        uReqUser: params.uReqUser,
      },
    });
  },
  /**
   * 조회권한 회수
   */
  async collectAuthWithdrawal({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/authWithdrawal/update`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uReqStatus: params.uReqStatus,
        uReqDocId: params.uReqDocId,
        uReqUser: params.uReqUser,
      },
    });
  },
};

export default AuthRequestApi;
