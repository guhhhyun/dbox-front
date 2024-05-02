import httpUtil from "utils/http-util";

console.debug("sharegroup-api.js");

/**
 * 공유그룹 api
 */
const ShareGroupApi = {
  async getShareGroupAll({ params, headers }) {
    return await httpUtil.get({
      url: `/api/sharegroups`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uComCode: params.uComCode,
        uShareName: params.uShareName,
        uShareDesc: params.uShareDesc,
        uCreateDate: params.uCreateDate,
        uCodeName: params.uCodeName,
      },
    });
  },

  /**
   * 공유그룹에 속한 부서 조회
   */
  async getDeptInShareGroup({ params, headers }) {
    return await httpUtil.get({
      url: `/api/sharegroups/depts/${encodeURIComponent(params.rObjectId)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        comOrgId: params.comOrgId,
        uDeptCode: params.uDeptCode,
        orgNm: params.orgNm,
        uCodeName: params.uCodeName,
      },
    });
  },

  /**
   * 새로운 공유그룹 추가
   */
  async createShareGroup({ params, headers }) {
    return await httpUtil.post({
      url: "/api/sharegroups/create",
      headers,
      data: {
        uComCode: params.uComCode,
        uShareName: params.uShareName,
        uShareDesc: params.uShareDesc,
        uDeptCode: params.uDeptCode,
        uCreateUser: params.uCreateUser,
        uCreateDate: params.uCreateDate,
        uModifyUser: params.uModifyUser,
        uModifyDate: params.uModifyDate,
      },
    });
  },

  /**
   * 공유그룹에 부서 추가
   */
  async patchDept({ params, headers }) {
    return await httpUtil.post({
      url: `/api/sharegroups/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uComCode: params.uComCode,
        uDeptCode: params.uDeptCode,
        uDeptName: params.uDeptName,
      },
    });
  },

  async deleteShareGroup({ params, headers }) {
    return await httpUtil.delete({
      url: `/api/sharegroups/delete/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
      },
    });
  },

  async deleteDept({ params, headers }) {
    return await httpUtil.delete({
      url: `/api/sharegroups/${encodeURIComponent(params.rObjectId)}/depts/${encodeURIComponent(params.uDeptCode)}/delete`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uDeptCode: params.uDeptCode,
      },
    });
  },

  async patchShareGroup({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/sharegroups/update/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uShareName: params.uShareName,
        uShareDesc: params.uShareDesc,
      },
    });
  },
};

export default ShareGroupApi;
