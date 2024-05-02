import httpUtil from "utils/http-util";

const DeptManagerApi = {

  async getDepts() {
    return await httpUtil.get({ url: '/api/depts' });
  },

  async getPositions() {
    return await httpUtil.get({ url: '/api/dbox-users/positions' });
  },

  async getDeptManagers(params) {
    return await httpUtil.get({
      url: '/api/dept-managers',
      params: {
        ...params
      }
    });
  },

  async deleteDeptManager(objectId) {
    return await httpUtil.delete({
      url: `/api/dept-managers/${objectId}`
    });
  }

};

export default DeptManagerApi;
