import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommonUtil from "utils/common-util";
import { LAST_LOGIN_ID } from "constants/localstorage-constants";

export default function UserCheck({ userId, path }) {
  const history = useHistory();

  useEffect(() => {
    const lastLoginId = CommonUtil.getLocalStorageItem(LAST_LOGIN_ID); // 기존 로그인 아이디
    CommonUtil.setLocalStorageItem(LAST_LOGIN_ID, userId); // 새로운 로그인 아이디 저장

    // 기존 로그인 아이디와 새로운 로그인 아이디가 다를 경우 기본 페이지로 이동
    if (userId && lastLoginId != userId) {
      history.push(path || "/doc");
    }
  }, []);

  return null;
}
