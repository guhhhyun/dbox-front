import httpUtil from "utils/http-util";

const TransferApprovalApi = {

  async getTransferApprovals(params) {
    return await httpUtil.get({
      url: '/api/transfer-approvals',
      params: {
        ...params
      }
    });
  },

  async getReqData(uReqId) {
    return await httpUtil.get({
      url: `/api/transfer-approvals/req-data/${uReqId}`
    });
  },

  async getReqUsers() {
    return await httpUtil.get({ url: '/api/transfer-approvals/req-users' });
  },

  async patchTransferApproval(action, rObjectIds) {
    return await httpUtil.patch({
      url: `/api/transfer-approvals/${action}`,
      data: {
        rObjectIds: rObjectIds
      }
    });
  }

};

export default TransferApprovalApi;
