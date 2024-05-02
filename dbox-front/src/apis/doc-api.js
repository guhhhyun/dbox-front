import httpUtil from "utils/http-util";

console.debug("doc-api.js");

const DocApi = {
  /**
   * 자료 경로 조회 ******************************
   */
  async getDocPaths({ params, headers }) {
    return Promise.resolve([
      { docId: "1", name: "동국시스템즈" },
      { docId: "2", name: "그룹지원본부" },
      { docId: "3", name: "강병프로젝트TFT" },
    ]);
    // return await httpUtil.get({
    //   url: `/api/docs/${docId}/paths`,
    //   headers,
    //   params: {
    //     docId: params.docId,
    //     mode: params.mode,
    //   },
    // });
  },
  /**
   * 피드백 리스트 조회 ******************************
   */
  async getDocFeedbacks({ params, headers }) {
    return Promise.resolve([
      {
        feedbackId: "1",
        text: "유익한 정보 감사드립니다.",
        creator: {
          name: "양두경",
          jobLevel: "차장",
          deptName: "기획팀",
        },
        createdDate: "2020-09-11 11:30:00",
      },
      {
        feedbackId: "2",
        parentFeedbackId: "1",
        text: "취합된 자료 중에 42page 출처 오류가 있습니다.",
        creator: {
          name: "김혁",
          jobLevel: "팀장",
          deptName: "인사팀",
        },
        createdDate: "2020-09-11 11:30:00",
      },
    ]);
    // return await httpUtil.get({
    //   url: `/api/docs/${docId}/feedbacks`,
    //   headers,
    //   params: {
    //     docId: params.docId,
    //     mode: params.mode,
    //   },
    // });
  },
  /**
   * 작성자 리스트 조회 ******************************
   */
  async getDocCreators({ params, headers }) {
    return Promise.resolve([
      {
        creatorId: "soik.cha",
        name: "차소익",
        jobPosition: "사원",
        deptName: "강병프로젝트TFT",
        entName: "동국시스템즈",
      },
      {
        creatorId: "dooyeon.yoo",
        name: "유두연",
        jobPosition: "사원",
        deptName: "강병프로젝트TFT",
        entName: "동국시스템즈",
      },
    ]);
    // return await httpUtil.get({
    //   url: `/api/docs/${docId}/creators`,
    //   headers,
    //   params: {
    //     docId: params.docId,
    //     mode: params.mode,
    //   },
    // });
  },
  /**
   * 연관 결재정보 리스트 조회 ******************************
   */
  async getDocRelatedApprovals({ params, headers }) {
    return Promise.resolve([
      {
        approvalId: "1",
        text: "휴가 결재",
        creator: {
          name: "차소익",
          jobPosition: "사원",
          deptName: "강병프로젝트TFT",
        },
        approveDate: "2020-09-11 11:30:00",
      },
      {
        approvalId: "2",
        text: "외박 결재",
        creator: {
          name: "유두연",
          jobPosition: "사원",
          deptName: "강병프로젝트TFT",
        },
        approveDate: "2020-09-11 11:30:00",
      },
    ]);
    // return await httpUtil.get({
    //   url: `/api/docs/${docId}/related-approvals`,
    //   headers,
    //   params: {
    //     docId: params.docId,
    //     mode: params.mode,
    //   },
    // });
  },
  /**
   * 버전 리스트 조회 ******************************
   */
  async getDocVersions({ params, headers }) {
    return Promise.resolve([
      {
        versionId: "1",
        fileSize: 123,
        createdDate: "2020-09-11 11:30:00",
      },
      {
        versionId: "2",
        fileSize: 456,
        createdDate: "2020-09-11 11:30:00",
      },
    ]);
    // return await httpUtil.get({
    //   url: `/api/docs/${docId}/related-approvals`,
    //   headers,
    //   params: {
    //     docId: params.docId,
    //     mode: params.mode,
    //   },
    // });
  },
  async getDocAttr({params,headers}) {
    let response = await httpUtil.get({
      url: `/api/data/${params.docId}`,
      headers,
      params: {
      }
    });
    return response.data?.response;
  },
  async updateTakeoutRequest({params,headers}) {
    let response = await httpUtil.post({
      url: `/api/takeout-requests`,
      headers,
      data: {
        uApprType: params.uApprType,
        uReqDocId: params.uReqDocId,
        uReqReason: params.uReqReason
      }
    });
    return response.data?.response;
  },
  async updateTakeoutRequestFree({params,headers}) {
    let response = await httpUtil.post({
      url: `/api/takeout-requests/free`,
      headers,
      data: params
    });
    return response.data?.response;
  },
  async authRequest({params,headers}) {
    let response = await httpUtil.post({
      url: `/api/auth-requests`,
      headers,
      data: params
    });
    return response.data?.response;
  },
};

export default DocApi;
