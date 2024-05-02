import httpUtil from "utils/http-util";

console.debug("code-api.js");

const CodeApi = {
  /**
   * 코드 리스트 조회
   */
  async getCodeList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/codes`,
      headers,
      params: {
        uCodeType: params.uCodeType,
        uCodeVal1: params.uCodeVal1,
        uCodeVal2: params.uCodeVal2,
        uCodeVal3: params.uCodeVal3,
      },
    });
  },

  /**
   * 특이사용자 식별 기준값 수정
   */
  async patchCode({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/codes/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        uCodeType: params.uCodeType,
        uCodeVal1: params.uCodeVal1,
        uCodeVal2: params.uCodeVal2,
        uCodeVal3: params.uCodeVal3,
        uCodeName1: params.uCodeName1,
        uCodeName2: params.uCodeName2,
      },
    });
  },

  /**
   * 코드 리스트 조회
   */
  async getCodeLogviewAuthList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/codes/logviewAuth/${encodeURIComponent(params.codeType)}`,
      headers,
      params: {
        uCodeType: params.uCodeType,
        uCodeVal1: params.uCodeVal1,
        uCodeVal2: params.uCodeVal2,
        uCodeVal3: params.uCodeVal3,
      },
    });
  },

  /**
   * 이력조회 권한 수정
   */
  async patchCodeLogviewAuth({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/codes/logviewAuth/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        uCodeType: params.uCodeType,
        uCodeVal1: params.uCodeVal1,
        uCodeVal2: params.uCodeVal2,
        uCodeVal3: params.uCodeVal3,
        uCodeName1: params.uCodeName1,
        uCodeName2: params.uCodeName2,
        uCodeName3: params.uCodeName3,
      },
    });
  },

  /**
   * 메뉴 리스트 조회
   */
  async getCodeMenuList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/codes/menu-category`,
      headers,
      params: {
        uCodeDesc: params.uCodeDesc,
        uCodeVal2: params.uCodeVal2,
      },
    });
  },
};

export default CodeApi;
