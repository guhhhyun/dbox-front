import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import ExternalStorageModalContainer from "views/containers/externalstorage/ExternalStorageModalContainer";
import TopHeader from "views/templates/header/TopHeader";
import LoginApi from "apis/login-api";
import { TREE_PROJECT, TREE_RESEARCH } from "stores/doc";
import CommonUtil from "utils/common-util";
import { COM_CODE, PAGE_KEY, SIDEBAR_TAB } from "constants/code-constants";

console.debug("TopHeaderContainer.js");

export default function TopHeaderContainer() {
  const showHeader = window.location === window.parent.location;

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state) => state.session.user);

  const [menuOpened, setMenuOpened] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(false);

  const externalStorageRef = useRef(null);

  /**
   * 자료실로 이동
   */
  const clickToData = () => {
    const stringified = queryString.stringify({
      [`${PAGE_KEY.PRIMARY}Tab`]: SIDEBAR_TAB.DEPT.key
    });
    history.push(`/doc?${stringified}`)
  }

  /**
   * 프로젝트/투자로 이동
   */
  const clickToProject = () => {
    const stringified = queryString.stringify({
      [`${PAGE_KEY.PRIMARY}TreeType`]: TREE_PROJECT,
      [`${PAGE_KEY.PRIMARY}Tab`]: SIDEBAR_TAB.ORG.key
    });
    history.push(`/doc?${stringified}`)
  }

  /**
   * 연구과제로 이동
   */
  const clickToResearch = () => {
    const stringified = queryString.stringify({
      [`${PAGE_KEY.PRIMARY}TreeType`]: TREE_RESEARCH,
      [`${PAGE_KEY.PRIMARY}Tab`]: SIDEBAR_TAB.ORG.key
    });
    history.push(`/doc?${stringified}`)
  }

  /**
   * 이력관리로 이동
   */
  const clickToHistory = () => {
    history.push(`/history`)
  }

  /**
   * 관리자로 이동
   */
  const clickToManager = () => {
    history.push(`/manager`)
  }

  /**
   * 외부저장매체로 이동
   */
  const clickToExternalStorage = () => {
    // externalStorageRef.current.openModal();
    history.push(`/externalstorage`)
  }

  /**
   * 메뉴 열기
   */
  const openMenu = (event) => {
    setMenuOpened(true);
    setMenuAnchorEl(event.currentTarget)
  }

  /**
   * 메뉴 닫기
   */
  const closeMenu = () => {
    setMenuOpened(false);
  }

  /**
   * 로그아웃
   */
  const logout = async () => {
    try {
      await LoginApi.logout();
      history.push(`/login`);
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  return <Fragment>
    {showHeader && <TopHeader
      menuOpened={menuOpened}
      menuAnchorEl={menuAnchorEl}
      onMenuClick={openMenu}
      onMenuClose={closeMenu}
      onLogoutClick={logout}
      user={user}
      onToDataClick={clickToData}
      onToProjectClick={clickToProject}
      onToResearchClick={clickToResearch}
      onToHistoryClick={clickToHistory}
      onToManagerClick={clickToManager}
      onToExternalStorageClick={clickToExternalStorage}
      showResearch={user.comOrgId === COM_CODE.DKS.key}
    />}
    {/* <ExternalStorageModalContainer ref={externalStorageRef} /> */}
  </Fragment>;
}
