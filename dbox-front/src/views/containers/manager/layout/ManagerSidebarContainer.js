import React, { useEffect, useState } from "react";
import ManagerSidebar from "views/templates/manager/layout/ManagerSidebar";
import CodeApi from "apis/code-api";
import { useHistory } from "react-router";

console.debug("ManagerSidebarContainer.js");

export default function ManagerSidebarContainer() {
  const history = useHistory();
  const [result, setResult] = useState("");
  /**
   * 문서 보안등급 관리 페이지로 이동
   */
  const goGradePage = () => {
    history.push("/manager/grade-change");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await CodeApi.getCodeMenuList({
        params: {
          uCodeDesc: "2",
        },
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return <ManagerSidebar result={result} onGrageClick={goGradePage} />;
}
