import httpUtil from "utils/http-util";

console.debug("approval-api.js");

const ApprovalApi = {
  /**
   * 자료이관 승인 설정 조회
   */
  async getApproval({ params, headers }) {
    return await httpUtil.get({
      url: `/api/approval/${encodeURIComponent(params.uCodeVal1)}`,
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
   * 자료이관 승인 설정 수정
   */
  async patchApproval({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/approval/${encodeURIComponent(params.rObjectId)}/patch`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uCodeVal2: params.uCodeVal2,
      },
    });
  },
};

export default ApprovalApi;
