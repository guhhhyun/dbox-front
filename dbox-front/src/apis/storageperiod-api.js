import httpUtil from "utils/http-util";

console.debug("storageperiod-api.js");

const StoragePeriodApi = {
  /**
   * 삭제, 폐기 문서 기간 조회
   */
  async selectStoragePeriod({ params, headers }) {
    return await httpUtil.get({
      url: `/api/storagePeriod/${encodeURIComponent(params.uCodeVal1)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uCodeVal1: params.uCodeVal1,
        uCodeVal2: params.uCodeVal2,
        uCodeVal3: params.uCodeVal3,
      },
    });
  },

  /**
   * 삭제, 폐기 스케쥴 조회
   */
  async selectDeleteSchedule({ params, headers }) {
    return await httpUtil.get({
      url: `/api/storagePeriod/${encodeURIComponent(params.uCodeVal1)}/schedule`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        methodName: params.methodName,
        startDate: params.startDate,
        aNextInvocation: params.aNextInvocation,
        methodArguments: params.methodArguments,
        hourtime: params.hourtime,
        uCodeVal1: params.uCodeVal1,
      },
    });
  },

  /**
   * 삭제, 폐기 문서 기간 수정
   */
  async patchStoragePeriod({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/storagePeriod/${encodeURIComponent(params.rObjectId)}/patch`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uCodeVal3: params.uCodeVal3,
      },
    });
  },

  /**
   * 삭제스케쥴 수정
   */
  async patchDeleteSchedule({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/storagePeriod/schedule/patch`,
      headers,
      data: {
        comCode: params.comCode,
        hourtime: params.hourtime,
        methodName: params.methodName,
      },
    });
  },
};

export default StoragePeriodApi;
