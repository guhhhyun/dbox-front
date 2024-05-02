import httpUtil from "utils/http-util";

const AutoClosingApi = {

  async getAutoClosingPeriodFor(company) {
    return await httpUtil.get({
      url: `/api/auto-closing/periods/${company}`
    });
  },

  async getDataToClose({ params }) {
    return await httpUtil.get({
      url: `/api/auto-closing/data`,
      params: {
        ...params
      }
    });
  },

  async getDataByDocKeyToClose(docKey) {
    return await httpUtil.get({
      url: `/api/auto-closing/data/${docKey}`
    });
  },

  async patchAutoClosingPeriodFor({ params }) {
    const data = {
      url: `/api/auto-closing/periods/${params.r_object_id}`,
      data: {
        uCodeVal2: params.u_code_val2,
        uCodeVal3: params.u_code_val3
      },
    }
    return await httpUtil.patch(data);
  },

  async destoryById(objectId) {
    const data = {
      url: `/api/auto-closing/data/${objectId}`,
    }
    return await httpUtil.delete(data);
  }
};

export default AutoClosingApi;
