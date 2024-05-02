import httpUtil from "utils/http-util";

console.debug("dept-api.js");

const DeptApi = {
  /**
   * 부서 전체 조회
   */
  async getDeptList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/depts/tree`,
      headers,
      params: {
        deptId: params.deptId,
        addJobYn: params.addJobYn,
        userYn: params.userYn,
      },
    });
  },

  /**
   * 부서 하위 조회
   */
  async getDeptChildren({ params, headers }) {
    return await httpUtil.get({
      url: `/api/depts/${params.deptId}/children`,
      headers,
    });
  },

  /**
   * 부서 단건 조회
   */
  async getDeptOne({ params, headers }) {
    return await httpUtil.get({
      url: `/api/depts/${params.deptId}`,
      headers,
    });
  },

  /**
   * 부서 경로 조회
   */
  async getDeptPath({ params, headers }) {
    return await httpUtil.get({
      url: `/api/depts/${params.orgId}/path`,
      headers,
    });
  },

  /**
   * 부서 관리자 조회 ******************************
   */
  async getDeptAdminUsers({ params, headers }) {
    return Promise.resolve({ main: "지창면 팀장", sub: "이은주 차장" });
    // return await httpUtil.get({
    //   url: `/api/docs/${docId}/paths`,
    //   headers,
    //   params: {
    //     docId: params.docId,
    //     mode: params.mode,
    //   },
    // });
  },
};

export default DeptApi;
