import httpUtil from "utils/http-util";

console.debug("node-api.js");

const DataApi = {
  /**
   * 자료 단건 조회
   */
  async getDataOne(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/data/${params.dataId}`,
      headers,
      params: {
        isUDocKey: params.isUDocKey,
      },
    });
  },

  /**
   * 자료 하위 리스트 조회
   */
  async getDataChildren(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/data/${params.dataId}/children`,
      headers,
      params: {
        hamType: params.hamType,
        folderType: params.folderType,
        withDoc: params.withDoc,
        checkHasChildren: params.checkHasChildren,
      },
    });
  },

  /**
   * 자료 자손 리스트 조회
   */
  async getDataDescendants({ params, headers }) {
    return await httpUtil.get({
      url: `/api/data/${params.dataId}/descendants${params.download ? "?download=" + params.download : ""}`,
      headers,
    });
  },

  /**
   * 자료 하위 생성
   */
  async postDataChildren({ params, headers }) {
    return await httpUtil.post({
      url: `/api/data/${params.dataId}/children`,
      headers,
      data: {
        dataName: params.dataName,
        dateType: params.dateType,
        folderType: params.folderType,
        hamType: params.hamType,
        templateType: params.templateType,
      },
    });
  },

  /**
   * 자료 경로 조회
   */
  async getDataPaths({ params, headers }) {
    return await httpUtil.get({
      url: `/api/data/${params.dataId}/paths`,
      headers,
    });
  },

  /**
   * 자료 잠금 조회
   */
  async getDataIsLock({ params, headers }) {
    return await httpUtil.get({
      url: `/api/data/${params.dataId}/lock/${params.dataType}`,
      headers,
      params: {
        hasWAuth: params.hasWAuth,
        sOpenContent: params.sOpenContent,
      },
    });
  },

  /**
   * 자료 수정
   */
  async updateDataOne(options) {
    const { params, headers } = options || {};
    const response = await httpUtil.patch({
      url: `/api/data/${params.dataId}/versions/${params.versions}/update?isLock=false`,
      headers,
      data: params,
    });
    return response.data?.response;
  },

  /**
   * 자료 잠금
   */
  async lockDataOne(options) {
    const { params, headers } = options || {};
    const response = await httpUtil.patch({
      url: `/api/data/${params.dataId}/lock`,
      headers,
    });
    return response.data?.response;
  },

  /**
   * 자료 수정
   */
  async unlockDataOne(options) {
    const { params, headers } = options || {};
    const response = await httpUtil.patch({
      url: `/api/data/${params.dataId}/unlock`,
      headers,
    });
    return response.data?.response;
  },

  /**
   * 자료 이동/복사/이관
   */
  async changeDataPath({ params, headers } = {}) {
    return await httpUtil.post({
      url: `/api/data/path/chg`,
      headers,
      data: {
        uptPthGbn: params.uptPthGbn,
        sourceFolders: params.sourceFolders,
        sourceFiles: params.sourceFiles,
        sourcePjts: params.sourcePjts,
        sourceRscs: params.sourceRscs,
        targetGubun: params.targetGubun,
        targetDboxId: params.targetDboxId,
      },
    });

    // return {
    //   data: { response: true },
    // };
  },
};

export default DataApi;
