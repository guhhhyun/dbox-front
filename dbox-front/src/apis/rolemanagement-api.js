import httpUtil from "utils/http-util";

console.debug("rolemanagement-api.js");

const RoleManagementApi = {
  /**
   * 엽무역할별 정책 조회
   */
  async getRoleManagement({ params, headers }) {
    return await httpUtil.get({
      url: `/api/rolemanagement/${encodeURIComponent(params.uDocFlag)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uAuthType: params.uAuthType,
        uAuthScope: params.uAuthScope,
        uOptionVal: params.uOptionVal,
        uSelected: params.uSelected,
        uAuthDesc: params.uAuthDesc,
        uDocFlag: params.uDocFlag,
        uAuthL: params.uAuthL,
        uAuthS: params.uAuthS,
        uAuthT: params.uAuthT,
        uAuthC: params.uAuthC,
        uAuthG: params.uAuthG,
        uSortOrder: params.uSortOrder,
        groupName: params.groupName,
        groupName2: params.groupName2,
      },
    });
  },
  /**
   * 엽무역할 정책 변경
   */
  async updatePolicy({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/rolemanagement/update/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uAuthScope: params.uAuthScope,
        uOptionVal: params.uOptionVal,
        unUOptionVal: params.unUOptionVal,
        uSelected: params.uSelected,
        uDocFlag: params.uDocFlag,
      },
    });
  },
};

export default RoleManagementApi;
