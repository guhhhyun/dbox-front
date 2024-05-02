import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import LoginForm from "views/templates/login/LoginForm";
import AgentCheck from "views/templates/agent/AgentCheck";
import LoginApi from "apis/login-api";
import CommonUtil from "utils/common-util";
import { setUser } from "stores/session";
import { KEEP_LOGIN_ID, LOGIN_ID } from "constants/localstorage-constants";

console.debug("LoginFormContainer.js");

export default function LoginFormContainer() {
  const history = useHistory();
  const dispatcher = useDispatch();

  const [loginId, setLoginId] = useState(CommonUtil.getLocalStorageItem(LOGIN_ID, ""));
  const [password, setPassword] = useState("");
  const [keepLoginId, setKeepLoginId] = useState(CommonUtil.getLocalStorageItem(KEEP_LOGIN_ID, false));

  /**
   * 로그인
   */
  const login = async () => {
    try {
      const response = await LoginApi.login({
        params: {
          loginId: loginId,
          pwd: password,
        },
      });

      // session store에 사용자 정보 저장
      const user = response.data.response.user;
      dispatcher(setUser(user));

      // 로그인 아이디와 저장여부 저장
      if (keepLoginId && loginId) {
        localStorage.keepLoginId = keepLoginId;
        localStorage.loginId = loginId;
      } else {
        localStorage.keepLoginId = false;
        localStorage.loginId = "";
      }
      history.replace("/doc");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* <AgentCheck></AgentCheck> */}
      <LoginForm
        loginId={loginId}
        onLoginIdChanged={setLoginId}
        password={password}
        onPasswordChanged={setPassword}
        keepLoginId={keepLoginId}
        onKeepLoginIdChanged={setKeepLoginId}
        onLoginSubmit={login}
      />
    </>
  );
}
