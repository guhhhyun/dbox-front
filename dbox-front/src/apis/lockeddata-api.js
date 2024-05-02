import httpUtil from "utils/http-util";

const LockedDataApi = {
  async getLockedData({params, headers}) {
    return await httpUtil.get({
      url: '/api/locked-data',
      headers,
      params: {
        uLockType: params.type,
        uLockStatus: params.status,
        uCodeValue1: params.company === "DKG" ? "" : params.company,
        orgId: params.dept,
        uUserId: params.user,
        overStartDate: params.startDate,
        overEndDate: params.endDate,
        desigStartDate: params.desigStartDate,
        desigEndDate: params.desigEndDate,
        uUserType: params.mgrType,
      }
    });
  },
  async unlockData({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/locked-data/${params.rObjectId}/unlock`,
      headers
    });
  }
};

export default LockedDataApi;
