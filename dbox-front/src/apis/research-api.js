import httpUtil from "utils/http-util";

console.debug("research-api.js");

const ResearchApi = {
  /**
   * 연구과제 단건 조회
   */
  async getResearchOne(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/researchs/${params.rschCode}`,
      headers,
      params: {
        rDeptCode: params?.deptCode,
        ownJoin: params?.ownJoin,
        uFinishYn: params?.finishYn,
        uFolId: params?.uFolId,
        withListOpen: params?.withListOpen,
      },
    });
  },

  /**
   * 연구과제 리스트 조회
   */
  async getResearchList(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/researchs`,
      headers,
      params: {
        rDeptCode: params?.deptCode,
        ownJoin: params?.ownJoin,
        uFinishYn: params?.finishYn,
        uFolId: params?.uFolId,
        withListOpen: params?.withListOpen,
      },
    });
  },

  /**
   * 연구과제 개수 조회
   */
  async getResearchCount(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/researchs/count`,
      headers,
      params: {
        rDeptCode: params?.deptCode,
        ownJoin: params?.ownJoin,
        uFinishYn: params?.finishYn,
        uFolId: params?.uFolId,
        withListOpen: params?.withListOpen,
      },
    });
  },

  /**
   * 연구과제 생성
   */
  async postResearch(options) {
    const { params, headers } = options || {};
    return await httpUtil.post({
      url: `/api/researchs`,
      headers,
      data: {
        uRschName: params?.uRschName,
        uSecLevel: params?.uSecLevel,
        uStartYear: params?.uStartYear,
        uChiefId: params?.uChiefId,
        uFinishYn: params?.uFinishYn,
        uListOpenYn: params?.uListOpenYn,
        uOwnDept: params?.uOwnDept,
        uJoinDeptReads: params?.uJoinDeptReads,
        uJoinDeptDels: params?.uJoinDeptDels,
      },
    });
  },

  /**
   * 연구과제 수정
   */
  async patchResearch(options) {
    const { params, headers } = options || {};
    return await httpUtil.patch({
      url: `/api/researchs/${params.uRschCode}`,
      headers,
      data: {
        uRschName: params?.uRschName,
        uSecLevel: params?.uSecLevel,
        uStartYear: params?.uStartYear,
        uChiefId: params?.uChiefId,
        uFinishYn: params?.uFinishYn,
        uListOpenYn: params?.uListOpenYn,
        uOwnDept: params?.uOwnDept,
        uJoinDeptReads: params?.uJoinDeptReads,
        uJoinDeptDels: params?.uJoinDeptDels,
      },
    });
  },

  /**
   * 연구과제 완료
   */
  async patchResearchFix(options) {
    const { params, headers } = options || {};
    return await httpUtil.patch({
      url: `/api/researchs/${params.uRschCode}/fix`,
      headers,
    });
  },
};

export default ResearchApi;
