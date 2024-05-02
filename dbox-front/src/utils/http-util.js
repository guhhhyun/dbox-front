import axios from "axios";
import queryString from "query-string";
import { PREFIX_URL, HTTP_TIMEOUT } from "constants/http-constants";

console.debug("http-util.js");

const axiosInstance = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

const HttpUtil = {
  async send(params) {
    const options = {
      ...params,
      url: `${PREFIX_URL}${params.url}`,
      timeout: params.timeout || HTTP_TIMEOUT,
      headers: {
        ...params.headers,
      },
    };
    return await axiosInstance(options);
  },

  async download(params) {
    return await this.send({
      ...params,
      method: "get",
      responseType: 'blob',
      isBase64Encoded: false
    });
  },

  async get(params) {
    return await this.send({
      ...params,
      method: "get",
    });
  },

  async post(params) {
    return await this.send({
      ...params,
      method: "post",
    });
  },

  async put(params) {
    return await this.send({
      ...params,
      method: "put",
    });
  },

  async patch(params) {
    return await this.send({
      ...params,
      method: "patch",
    });
  },

  async delete(params) {
    return await this.send({
      ...params,
      method: "delete",
    });
  },
};

export default HttpUtil;
