import httpUtil from "utils/http-util";
import SHA256 from "crypto-js/sha256";

console.debug("login-api.js");

const LoginApi = {
  /**
   * 로그인을 요청한다.
   */
  async login(options) {
    const { params, headers } = options || {};
    return await httpUtil.post({
      url: "/api/login",
      headers,
      data: {
        userId: params.loginId,
        password: SHA256(params.pwd).toString().toUpperCase(),
      },
    });
  },

  /**
   * 로그아웃을 요청한다.
   */
  async logout(options) {
    const { headers } = options || {};
    return await httpUtil.post({
      url: "/api/logout",
      headers,
    });
  },

  /**
   * 현재 사용자를 조회한다. (세션 확인)
   */
  async session(options) {
    const { headers } = options || {};
    return httpUtil.get({
      url: "/api/session",
      headers,
    });
  },
};

export default LoginApi;
