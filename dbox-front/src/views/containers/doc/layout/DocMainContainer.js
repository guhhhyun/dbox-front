import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { setDocPageDivided, setDocPageDividedHeight } from "stores/setting";
import DocMain from "views/templates/doc/layout/DocMain";
import { CATEGORY_FOLDER, PAGE_KEY, SIDEBAR_TAB } from "constants/code-constants";
import { setId, setTab, setTreeType, TREE_ALL, TREE_TYPES } from "stores/doc";
import CommonUtil from "utils/common-util";
import { useState } from "react";

console.debug("DocMainContainer.js");

export default function DocMainContainer() {
  const dispatcher = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const nodeId = useSelector((state) => state.doc.id);
  const sidebarTab = useSelector((state) => state.doc.tab);
  const treeType = useSelector((state) => state.doc.treeType);
  const divided = useSelector((state) => state.setting.docPageDivided);
  const dividedHeight = useSelector((state) => state.setting.docPageDividedHeight);

  const docMainRef = useRef(null);

  // 뒤로가기 시 데이터 다시 불러오기
  useEffect(() => {
    setStateFromQueryString(history.location.search, true);

    const unlisten = history.listen((location) => {
      if ("/doc" === location.pathname) {
        setStateFromQueryString(location.search);
      }
    });
    return () => {
      if ("/doc" !== history.location.pathname) unlisten();
    };
  }, []);

  /**
   * 쿼리스트링대로 state 세팅
   */
  const setStateFromQueryString = (query, replaceUrl) => {
    const parsed = queryString.parse(query);

    // 쿼리스트링 키값
    const primaryTabKey = `${PAGE_KEY.PRIMARY}Tab`;
    const primaryIdKey = `${PAGE_KEY.PRIMARY}Id`;
    const primaryTreeTypeKey = `${PAGE_KEY.PRIMARY}TreeType`;
    const secondaryTabKey = `${PAGE_KEY.SECONDARY}Tab`;
    const secondaryIdKey = `${PAGE_KEY.SECONDARY}Id`;
    const secondaryTreeTypeKey = `${PAGE_KEY.PRIMARY}TreeType`;
    const dividedKey = "divided";

    // 쿼리에 없을 경우 로컬스토리지 state 적용하고 거기에도 없으면 기본값 적용
    let newPrimaryTab = parsed[primaryTabKey] || SIDEBAR_TAB.DEPT.key;
    const newPrimaryId = parsed[primaryIdKey] || (newPrimaryTab === SIDEBAR_TAB.DEPT.key ? CATEGORY_FOLDER.DEPT.key : user.orgId);
    let newPrimaryTreeType = (CommonUtil.isJson(parsed[primaryTreeTypeKey]) ? JSON.parse(parsed[primaryTreeTypeKey]) : parsed[primaryTreeTypeKey]) ?? TREE_ALL;
    let newSecondaryTab = parsed[secondaryTabKey] || SIDEBAR_TAB.DEPT.key;
    const newSecondaryId = parsed[secondaryIdKey] || (newSecondaryTab === SIDEBAR_TAB.DEPT.key ? CATEGORY_FOLDER.DEPT.key : user.orgId);
    let newSecondaryTreeType =
      (CommonUtil.isJson(parsed[secondaryTreeTypeKey]) ? JSON.parse(parsed[secondaryTreeTypeKey]) : parsed[secondaryTreeTypeKey]) ?? TREE_ALL;
    let newDivided = (CommonUtil.isJson(parsed[dividedKey]) ? JSON.parse(parsed[dividedKey]) : divided) || false;

    // 올바른 값이 아닐 경우 기본값 적용
    if (!Object.values(SIDEBAR_TAB).some((item) => item.key === newPrimaryTab)) newPrimaryTab = SIDEBAR_TAB.DEPT.key;
    if (!Object.values(SIDEBAR_TAB).some((item) => item.key === newSecondaryTab)) newSecondaryTab = SIDEBAR_TAB.DEPT.key;
    if (!Object.keys(TREE_TYPES).some((item) => parseInt(item) === newPrimaryTreeType)) newPrimaryTreeType = TREE_ALL;
    if (!Object.keys(TREE_TYPES).some((item) => parseInt(item) === newSecondaryTreeType)) newSecondaryTreeType = TREE_ALL;
    if (typeof newDivided !== "boolean") newDivided = false;

    dispatcher(
      setTab({
        [PAGE_KEY.PRIMARY]: newPrimaryTab,
        [PAGE_KEY.SECONDARY]: newSecondaryTab,
      }),
    );
    dispatcher(
      setId({
        [PAGE_KEY.PRIMARY]: newPrimaryId,
        [PAGE_KEY.SECONDARY]: newSecondaryId,
      }),
    );
    dispatcher(
      setTreeType({
        [PAGE_KEY.PRIMARY]: newPrimaryTreeType,
        [PAGE_KEY.SECONDARY]: newSecondaryTreeType,
      }),
    );
    dispatcher(setDocPageDivided(newDivided));

    if (replaceUrl) {
      // state 기준으로 현재 url 변경
      const stringified = queryString.stringify({
        [primaryTabKey]: newPrimaryTab,
        [primaryIdKey]: newPrimaryId,
        [primaryTreeTypeKey]: newPrimaryTreeType,
        [secondaryTabKey]: newSecondaryTab,
        [secondaryIdKey]: newSecondaryId,
        [secondaryTreeTypeKey]: newSecondaryTreeType,
        [dividedKey]: newDivided,
      });
      history.replace(`/doc?${stringified}`);
    }
  };

  /**
   * 리사이즈된 사이즈 적용
   */
  const resizeContent = (event, data) => {
    dispatcher(setDocPageDividedHeight(data.size.height));
  };

  /**
   * 기본 그리드 검색
   */
  const searchPrimaryGrid = (event, searchTypeChecked) => {
    event.preventDefault();
  };

  /**
   * 분할 그리드 검색
   */
  const searchSecondaryGrid = (event, searchTypeChecked) => {
    event.preventDefault();
  };

  return (
    <DocMain
      ref={docMainRef}
      resizeHeight={dividedHeight}
      onResize={resizeContent}
      onPrimarySearchClick={searchPrimaryGrid}
      onSecondarySearchClick={searchSecondaryGrid}
      divided={divided}
    />
  );
}
