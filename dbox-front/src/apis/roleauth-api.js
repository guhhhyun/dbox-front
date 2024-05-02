import httpUtil from "utils/http-util";

console.debug("roleauth-api.js");

const RoleAuthApi = {
  /**
   * 엽무역할 조회
   */
  async getRoleAuthGroup({ params, headers }) {
    return await httpUtil.get({
      url: `/api/roleAuthGroup`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uAuthGroup: params.uAuthGroup,
        uConfigFlag: params.uConfigFlag,
        uComCode: params.uComCode,
        uAuthName: params.uAuthName,
        uAuthDesc: params.uAuthDesc,
        uCodeName1: params.uCodeName1,
        uGroupScope: params.uGroupScope,
        groupName: params.groupName,
      },
    });
  },

  /**
   * 업무역할별 사용자 조회
   */
  async getRoleAuthGroupUsers({ params, headers }) {
    return await httpUtil.get({
      url: `/api/roleAuthGroup/${encodeURIComponent(params.uAuthGroup)}/users/${encodeURIComponent(params.uConfigFlag)}/${encodeURIComponent(
        params.uGroupScope,
      )}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        userNames: params.userNames,
        displayName: params.uComCode,
        comOrgId: params.comOrgId,
        orgId: params.orgId,
        orgNm: params.orgNm,
        userId: params.userId,
        name: params.name,
        uCodeName1: params.uCodeName1,
        uAuthGroup: params.uAuthGroup,
        uConfigFlag: params.uConfigFlag,
        uCodeType: params.uCodeType,
        groupName: params.groupName,
        groupName2: params.groupName2,
        uGroupScope: params.uGroupScope,
      },
    });
  },

  /**
   * 사용자 추가
   */
  async createRoleAuthUser({ params, headers }) {
    return await httpUtil.post({
      url: `/api/roleAuthGroup/createUser`,
      headers,
      data: {
        groupName: params.groupName,
        userId: params.userId,
        uComCode: params.uComCode,
        uGroupScope: params.uGroupScope,
        uConfigFlag: params.uConfigFlag,
      },
    });
  },

  /**
   * 사용자 삭제
   */
  async deleteRoleAuthUser({ params, headers }) {
    return await httpUtil.delete({
      url: `/api/roleAuthGroup/deleteUser`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        groupName: params.groupName,
        userId: params.userId,
        uGroupScope: params.uGroupScope,
        uConfigFlag: params.uConfigFlag,
      },
    });
  },
};

export default RoleAuthApi;
