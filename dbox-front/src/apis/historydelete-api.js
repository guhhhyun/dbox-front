import httpUtil from "utils/http-util";

console.debug("sharegroup-api.js");

/**
 * 공유그룹 api
 */
const HistoryDeleteApi = {
  
  async getHistoryDeleteAll({ params, headers }) {
    
    return await httpUtil.post({
      url: "/api/history/historydeletes",
      headers,
      data: params,


      //data: {
        // rObjectId: params.rObjectId,
        // uComCode: params.uComCode,
        // searchText: params.searchText
        // status: "L",
        //     company: companyCode,
        //     searchText: searchText,
        //     mgrType: mgrType,
       //},

    });
  },


  async selectHistoryMessengerAttachUser({ params, headers }) {
    
    return await httpUtil.get({
      url: "/api/history/messengeruser",
      headers,
      params: params,
    });
  },

  async selectHistoryExternalAttach({ params, headers }) {
    
    return await httpUtil.get({
      url: "/api/history/externalattach",
      headers,
      params: params,
    });
  },

  async selectHistoryExternalAttachDetail({ params, headers }) {
    
    return await httpUtil.get({
      url: "/api/history/externalattachdetail",
      headers,
      params: params,
    });
  },

  async selectHistoryDocDistribution({ params, headers }) {

    return await httpUtil.get({
      url: "/api/history/docdistribution",
      headers,
      params: params,
    });
  },

  async selectHistoryLogDetail({ params, headers }) {
    
    return await httpUtil.get({
      url: "/api/history/historylogdetail",
      headers,
      params: params,
    });
  },

  

  

};

export default HistoryDeleteApi;
