import httpUtil from "utils/http-util";

console.debug("project-api.js");

const ProjectApi = {
  /**
   * 프로젝트/투자 단건 조회
   */
  async getProjectOne(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/projects/${params.pjtCode}`,
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
   * 프로젝트/투자 리스트 조회
   */
  async getProjectList(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/projects`,
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
   * 프로젝트/투자 개수 조회
   */
  async getProjectCount(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/projects/count`,
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
   * 프로젝트/투자 생성
   */
  async postProject(options) {
    const { params, headers } = options || {};
    return await httpUtil.post({
      url: `/api/projects`,
      headers,
      data: {
        uPjtName: params?.uPjtName,
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
   * 프로젝트/투자 수정
   */
  async patchProject(options) {
    const { params, headers } = options || {};
    return await httpUtil.patch({
      url: `/api/projects/${params.uPjtCode}`,
      headers,
      data: {
        uPjtName: params?.uPjtName,
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
   * 프로젝트/투자 완료
   */
  async patchProjectFix(options) {
    const { params, headers } = options || {};
    return await httpUtil.patch({
      url: `/api/projects/${params.uPjtCode}/fix`,
      headers,
    });
  },
};

export default ProjectApi;
