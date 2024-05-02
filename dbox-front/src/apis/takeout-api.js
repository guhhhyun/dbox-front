import httpUtil from "utils/http-util";

console.debug("takeout-api.js");

const TakeoutApi = {
  /**
   * 반출 사유 목록 조회
   */
  async getTakeoutReasons({ params, headers }) {
    return await httpUtil.get({
      url: `/api/takeout-requests/${params.orgId}/configs/${params.mode ? params.mode : "D"}`,
      headers,
    });
  },
  /**
   * 반출 리스트 조회
   */
  async getTakeoutList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/takeout-requests`,
      headers,
    });
  },
  /**
   * 반출 프리패스 동의서 정보 조회
   */
  async getAgreement({ params, headers }) {
    return await httpUtil.get({
      url: `/api/agreement`,
      headers,
    });
  },
  /**
   * 동의서 등록
   */
  async registAgreement({ params, headers }) {
    return await httpUtil.post({
      url: `/api/external/register/agreem`,
      headers,
      data: params,
    });
  },

  /**
   * 반출 설정 수정
   */
  async patchTakeout({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/takeout-configs/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        valueIndex: params.valueIndex,
        uAutoApprYn: params.uAutoApprYn,
        uFreePassYn: params.uFreePassYn,
        uDeleteOption: params.uDeleteOption,
        uDeleteDays: params.uDeleteDays,
        uAutoName: params.uAutoName,
        uFreeName: params.uFreeName,
        mode: params.mode,
        type: params.type,
      },
    });
  },

  /**
   * 반출 설정 목록 삭제
   */
  async deleteTakeout({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/takeout-configs/${encodeURIComponent(params.rObjectId)}/repeating`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        valueIndex: params.valueIndex,
        uAutoName: params.uAutoName,
        uFreeName: params.uFreeName,
        type: params.type,
      },
    });
  },
};

export default TakeoutApi;
