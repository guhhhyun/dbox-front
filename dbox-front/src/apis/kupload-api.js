import httpUtil from "utils/http-util";

console.debug("node-api.js");

const KUploadApi = {
  async checkKUpload({ params, headers }) {
    return await httpUtil.get({
      url: `/kupload/handler/raonkhandler.jsp`,
      headers,
    });
  },
};

export default KUploadApi;
