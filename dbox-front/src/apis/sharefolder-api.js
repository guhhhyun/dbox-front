import httpUtil from "utils/http-util";

console.debug("sharefolder-api.js");

const ShareFolderApi = {
  /**
   * 자료 하위 리스트 조회
   */
  async getShareFolderList(options) {
    const { headers } = options || {};
    return await httpUtil.get({
      url: `/api/share-folder`,
      headers,
    });
  },
};

export default ShareFolderApi;
