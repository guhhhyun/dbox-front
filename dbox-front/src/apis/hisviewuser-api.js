import httpUtil from "utils/http-util";

console.debug("hisviewuser-api.js");

const HisViewUserApi = {
  /**
   * 이력조회 권한 추가 사용자 리스트 조회
   */
  async getHisViewUserList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/hisViewUsers`,
      headers,
      params: {
        uHisCode: params.uHisCode,
        uComCode: params.uComCode,
        displayName: params.displayName,
        uUserId: params.uUserId,
      },
    });
  },

  /**
   * 이력조회 권한 사용자 추가
   */
  async registHisViewUser({ params, headers }) {
    return await httpUtil.post({
      url: `/api/hisViewUsers`,
      headers,
      data: {
        uHisCode: params.uHisCode,
        uComCode: params.uComCode,
        uUserId: params.uUserId,
      },
    });
  },

  /**
   * 이력조회 권한 사용자 삭제
   */
  async deleteHisViewUser({ params, headers }) {
    return await httpUtil.delete({
      url: `/api/hisViewUsers/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {},
    });
  },
};

export default HisViewUserApi;
