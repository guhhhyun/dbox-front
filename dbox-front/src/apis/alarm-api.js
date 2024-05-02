import httpUtil from "utils/http-util";

console.debug("alarm-api.js");

const AlarmApi = {
  /**
   * 알람 리스트 조회
   */
  async getAlarmList(options) {
    const { headers } = options || {};
    return await httpUtil.get({
      url: `/api/alarms`,
      headers,
    });
  },

  /**
   * 알람 개수 조회
   */
  async getAlarmCount(options) {
    const { headers } = options || {};
    return await httpUtil.get({
      url: `/api/alarms/count`,
      headers,
    });
  },

  /**
   * 알람 리스트 삭제
   */
  async deleteAlarmList(options) {
    const { params, headers } = options || {};
    return await httpUtil.delete({
      url: `/api/alarms`,
      headers,
      params: {
        alarmIds: JSON.stringify(params.alarmIds),
      },
    });
  },

  /**
   * 관리자 알람/통보방식 조회
   */
  async getNotiConfig({ params, headers }) {
    return await httpUtil.get({
      url: `/api/alarm/${encodeURIComponent(params.uComCode)}`,
      headers,
      params: {
        rObjectId: params.rObjectId,
        uComCode: params.uComCode,
        uEventCode: params.uEventCode,
        uAlarmYn: params.uAlarmYn,
        uEmailYn: params.uEmailYn,
        uMmsYn: params.uMmsYn,
        uCodeName1: params.uCodeName1,
        uCodeName2: params.uCodeName2,
      },
    });
  },

  /**
   * 관리자 알람/통보방식 수정
   */
  async patchNotiConfig({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/alarm/patch/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        rObjectId: params.rObjectId,
        uAlarmYn: params.uAlarmYn,
        uEmailYn: params.uEmailYn,
        uMmsYn: params.uMmsYn,
      },
    });
  },
};

export default AlarmApi;
