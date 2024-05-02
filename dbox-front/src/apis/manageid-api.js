import httpUtil from "utils/http-util";

console.debug("manageid-api.js");

/**
 * 사용자 id 관리 api
 */
const ManageIdApi = {
  async selectUserId({ params, headers }) {
    return await httpUtil.get({
      url: `/api/manageId`,
      headers,
      params: {
        socialPerId: params.socialPerId,
        displayName: params.displayName,
        comOrgId: params.comOrgId,
        orgNm: params.orgNm,
        empType: params.empType,
        name: params.name,
        uCodeName1: params.uCodeName1,
        edmsId: params.edmsId,
        parentGroup: params.parentGroup,
        orgId: params.orgId,
        userState: params.userState,
        uLockStatus: params.uLockStatus,
        localEmpYn: params.localEmpYn,
      },
    });
  },
  /**
   * 접속이력 조회
   */
  async selectUserIdLog({ params, headers }) {
    return await httpUtil.get({
      url: `/api/manageIdLog/${encodeURIComponent(params.uUserId)}`,
      headers,
      params: {
        uUserId: params.uUserId,
        uLoginDate: params.uLoginDate,
        uUserIp: params.uUserIp,
      },
    });
  },

  /**
   * edms_user에 사용자 추가
   */
  async createUserId({ params, headers }) {
    return await httpUtil.post({
      url: "/api/manageId/createUser",
      headers,
      data: {
        socialPerId: params.socialPerId,
        email: params.email,
        uCabinetCode: params.uCabinetCode,
        orgId: params.orgId,
      },
    });
  },

  /**
   * user_state값 수정(edms_user에 있는 사용자인 경우)
   */
  async updateIdStatus({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/manageId/${encodeURIComponent(params.socialPerId)}/updateStatus/${encodeURIComponent(params.userState)}`,
      headers,
      data: {
        socialPerId: params.socialPerId,
        userState: params.userState,
      },
    });
  },
};

export default ManageIdApi;
