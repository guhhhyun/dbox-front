import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import DocSidebar from "views/templates/doc/layout/DocSidebar";
import { setPrStatus, setTreeType } from "stores/doc";
import { setDocPageDividedWidth } from "stores/setting";
import { CATEGORY_FOLDER, COM_CODE, SIDEBAR_TAB, TREE_KEY_DIVIDER } from "constants/code-constants";

console.debug("DocSidebarContainer.js");

export const [WIDTH_NARROW, WIDTH_WIDE] = Array(2).keys();

export default function DocSidebarContainer({ pageKey }) {
  const pageKeyNodeId = `${pageKey}Id`;
  const pageKeySidebarTab = `${pageKey}Tab`;
  const pageKeyTreeType = `${pageKey}TreeType`;

  const dispatcher = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const nodeId = useSelector((state) => state.doc.id[pageKey]);
  const sidebarTab = useSelector((state) => state.doc.tab[pageKey]);
  const treeType = useSelector((state) => state.doc.treeType);
  const prStatus = useSelector((state) => state.doc.prStatus);
  const dividedWidth = useSelector((state) => state.setting.docPageDividedWidth);

  const [tabIndex, setTabIndex] = useState(SIDEBAR_TAB.DEPT.index);
  const [widthStatus, setWidthStatus] = useState(WIDTH_NARROW);
  const [beforeNodeId, setBeforeNodeId] = useState(null);

  useEffect(() => {
    setTabIndex(SIDEBAR_TAB[sidebarTab].index);
  }, [sidebarTab]);

  /**
   * 사이드바 너비 토글
   */
  const toggleWidthStatus = () => {
    if (WIDTH_NARROW === widthStatus) setWidthStatus(WIDTH_WIDE);
    else setWidthStatus(WIDTH_NARROW);
  };

  /**
   * 탭 변경
   */
  const changeTab = (event, newValue) => {
    const parsed = queryString.parse(history.location.search);
    parsed[pageKeySidebarTab] = newValue;

    // 이전 노드 아이디가 있을 경우 쿼리스트링에 세팅하고 현재 노드 아이디 저장
    if (beforeNodeId) parsed[pageKeyNodeId] = beforeNodeId;
    else parsed[pageKeyNodeId] = newValue === SIDEBAR_TAB.DEPT.key ? CATEGORY_FOLDER.DEPT.key : `${CATEGORY_FOLDER.DEPT.key}${TREE_KEY_DIVIDER}${user.orgId}`;
    setBeforeNodeId(nodeId);

    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);
  };

  /**
   * 조회할 트리 타입 변경
   */
  const changeTreeType = (event) => {
    const parsed = queryString.parse(history.location.search);
    parsed[pageKeyTreeType] = event.target.value;
    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);
  };

  /**
   * 조회할 프로젝트 상태 변경
   */
  const changePrStatus = (event) => {
    dispatcher(
      setPrStatus({
        ...prStatus,
        [pageKey]: event.target.value,
      }),
    );
  };

  /**
   * 리사이즈된 사이즈 적용
   */
  const resizeContent = (event, data) => {
    dispatcher(setDocPageDividedWidth(data.size.width));
  };

  return (
    <DocSidebar
      pageKey={pageKey}
      widthStatus={widthStatus}
      onWidthStatusClick={toggleWidthStatus}
      tab={sidebarTab}
      tabIndex={tabIndex}
      onTabChange={changeTab}
      treeType={treeType[pageKey]}
      onTreeTypeChange={changeTreeType}
      prStatus={prStatus[pageKey]}
      onPrStatusChange={changePrStatus}
      showResearch={user.comOrgId === COM_CODE.DKS.key}
      resizeWidth={dividedWidth}
      onResize={resizeContent}
    />
  );
}
