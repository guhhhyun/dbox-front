import httpUtil from "utils/http-util";

const DeptTransferApi = {

  async getDeptTransfers() {
    return await httpUtil.get({ url: "/api/dept-transfers" });
  },

  async getFoldersAsTree(params) {
    return await httpUtil.get({
      url: "/api/dept-transfers/folders/tree" ,
      params: {
        ...params
      }
    });
  },

  async getDeptTransfersRequested(uDeptCode) {
    return await httpUtil.get({ url: `/api/dept-transfers/requests/${uDeptCode}` });
  },

  async selectAggregateDataToTransfer(rObjectIds) {
    return await httpUtil.post({
      url: "/api/dept-transfers/data/aggregate",
      data: rObjectIds
    });
  },

  async insertTransfer(params) {
    const data = {...params};
    return await httpUtil.post({
      url: `/api/dept-transfers/${params.rObjectId}`,
      data
    });
  },

  async deleteDeptTransfersRequested(rObjectIds) {
    return await httpUtil.delete({
      url: "/api/dept-transfers/requests",
      data: rObjectIds
    });
  }
};

export default DeptTransferApi;
