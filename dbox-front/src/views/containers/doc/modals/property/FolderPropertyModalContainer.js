import { forwardRef, Fragment, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import OrgSelectModalContainer from "views/containers/doc/modals/org/OrgSelectModalContainer";
import FolderPropertyModal from "views/templates/doc/modals/property/FolderPropertyModal";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import { CONFIRM_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import DataApi from "apis/data-api";
import CommonUtil from "utils/common-util";
import { TREE_KEY_DIVIDER, FOL_STATUS, ORG_TREE_TYPE, PERMIT_TYPE, SEC_LEVEL } from "constants/code-constants";

console.debug("FolderPropertyModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px",
  },
});

const FolderPropertyModalContainer = forwardRef(function (props, ref) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { openDialog, closeDialog } = useGlobalDialog();

  const user = useSelector((state) => state.session.user);

  const [dataId, setDataId] = useState();

  const DEFAULT_PROPERTY = {
    uFolName: "",
    uSecLevel: SEC_LEVEL.TEAM.key,
    secLevelName: SEC_LEVEL.TEAM.desc,
    uFolStatus: FOL_STATUS.ORDINARY.key,
    folStatusName: FOL_STATUS.ORDINARY.desc,
    createUser: user,
    ownDept: { orgId: user.orgId, orgNm: user.orgNm },
    liveAuthBases: [],
    closedAuthBases: [],
    liveAuthShares: [],
  };

  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState(0);
  const [property, setProperty] = useState(DEFAULT_PROPERTY);
  const [params, setParams] = useState({});
  const [currentSetAuthType, setCurrentSetAuthType] = useState(0);
  const [modified, setModified] = useState(false);

  const authRef = useRef();

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  /**
   * 모달 열기
   */
  const openModal = (dataId) => {
    setOpened(true);
    setModified(false);
    if (dataId) {
      setDataId(dataId);
      getFolderData(dataId);
    } else {
      setProperty(DEFAULT_PROPERTY);
    }
  };

  /**
   * 폴더 데이터 조회
   */
  const getFolderData = async (dataId) => {
    try {
      const response = await DataApi.getDataOne({ params: { dataId } });
      const mappedLiveAuthBaseList = response.data.response.liveAuthBases.map((item) => ({
        rObjectId: item.rObjectId,
        uPermitType: item.uPermitType,
        user: item.user,
        dept: item.dept,
      }));
      const mappedClosedAuthBaseList = response.data.response.closedAuthBases.map((item) => ({
        rObjectId: item.rObjectId,
        uPermitType: item.uPermitType,
        user: item.user,
        dept: item.dept,
      }));
      const mappedLiveAuthShareList = response.data.response.liveAuthShares.map((item) => ({
        rObjectId: item.rObjectId,
        uPermitType: item.uPermitType,
        user: item.user,
        dept: item.dept,
      }));

      // 현재 폴더 정보 세팅
      setProperty({
        dataId: response.data.response.rObjectId,
        uFolName: response.data.response.uFolName,
        uSecLevel: response.data.response.uSecLevel,
        secLevelName: response.data.response.secLevelName,
        uFolStatus: response.data.response.uFolStatus,
        folStatusName: response.data.response.folStatusName,
        createUser: response.data.response.createUserDetail,
        ownDept: response.data.response.ownDeptDetail,
        liveAuthBases: mappedLiveAuthBaseList,
        originalLiveAuthBases: mappedLiveAuthBaseList,
        closedAuthBases: mappedClosedAuthBaseList,
        originalClosedAuthBases: mappedClosedAuthBaseList,
        liveAuthShares: mappedLiveAuthShareList,
        originalLiveAuthShares: mappedLiveAuthShareList,
      });

      // params에 폴더 아이디 세팅
      setParams({
        dataId,
      });
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 탭 전환
   */
  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  /**
   * 폴더 속성 저장
   */
  const saveProperty = (isApply) => {
    // 수정되었을 경우에만 속성 저장
    if (modified) {
      openDialog(CONFIRM_DIALOG, {
        title: "확인",
        content: "폴더 속성을 변경하시겠습니까?",
        onOkClick: async () => {
          await requestFolderModify();

          // 적용일 경우 변경값 초기화
          if (isApply) {
            // 현재 폴더 데이터 다시 조회
            getFolderData(dataId);

            // 속성 수정 여부 초기화
            setModified(false);

            // 모달, 확인창 닫기
            closeDialog();
          } else window.location.reload();
        },
      });
    } else {
      closeModal();
    }
  };

  /**
   * 폴더 속성 저장 진행
   */
  const requestFolderModify = async () => {
    try {
      await DataApi.updateDataOne({
        params: { ...params },
      });
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 속성 변경
   */
  const changeProperty = ({ target: { type, name, value, checked } }) => {
    setModified(true);

    // 조회 속성 변경
    const v = type === "checkbox" ? checked : value;
    setProperty({ ...property, [name]: v });

    // 수정 속성 변경
    setParams({
      ...params,
      folder: {
        ...(params.folder || {}),
        [name]: v,
      },
    });
  };

  /**
   * 권한대상 모달 열기
   */
  const clickAuth = (type) => {
    setCurrentSetAuthType(type);
    authRef.current.openModal();
  };

  /**
   * 보안등급 변경
   */
  const changeSecLevel = (uSecLevel) => {
    setModified(true);

    // 조회 속성 변경
    setProperty({
      ...property,
      uSecLevel,
    });

    // 수정 속성 변경
    setParams({
      ...params,
      folder: {
        ...(params.folder || {}),
        uSecLevel,
      },
    });
  };

  /**
   * 권한대상 선택
   */
  const selectAuthTarget = (targets) => {
    setModified(true);

    if (currentSetAuthType === "LIVE_BASE_R") {
      setLiveAuthProperty(targets, PERMIT_TYPE.READ.key);
      setLiveAuthParams(targets, PERMIT_TYPE.READ.key);
    } else if (currentSetAuthType === "LIVE_BASE_D") {
      setLiveAuthProperty(targets, PERMIT_TYPE.DELETE.key);
      setLiveAuthParams(targets, PERMIT_TYPE.DELETE.key);
    } else if (currentSetAuthType === "CLOSE_BASE_R") {
      setClosedAuthProperty(targets, PERMIT_TYPE.READ.key);
      setClosedAuthParams(targets, PERMIT_TYPE.READ.key);
    } else if (currentSetAuthType === "LIVE_SHARE_R") {
      setLiveShareProperty(targets, PERMIT_TYPE.READ.key);
      setLiveShareParams(targets, PERMIT_TYPE.READ.key);
    } else if (currentSetAuthType === "LIVE_SHARE_D") {
      setLiveShareProperty(targets, PERMIT_TYPE.DELETE.key);
      setLiveShareParams(targets, PERMIT_TYPE.DELETE.key);
    }
  };

  /**
   * Live 권한 조회 속성 설정
   */
  const setLiveAuthProperty = (targets, permitType) => {
    const filtered = property.liveAuthBases.filter(
      (item) => item.uPermitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );
    const mapped = targets.map((item) => ({
      uPermitType: permitType,
      user: item.type === ORG_TREE_TYPE.USER ? item.data : undefined,
      dept: item.type === ORG_TREE_TYPE.DEPT ? item.data : undefined,
    }));

    setProperty({
      ...property,
      liveAuthBases: filtered.concat(mapped),
    });
  };

  /**
   * Closed 권한 조회 속성 설정
   */
  const setClosedAuthProperty = (targets, permitType) => {
    const filtered = property.closedAuthBases.filter(
      (item) => item.uPermitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );
    const mapped = targets.map((item) => ({
      uPermitType: permitType,
      user: item.type === ORG_TREE_TYPE.USER ? item.data : undefined,
      dept: item.type === ORG_TREE_TYPE.DEPT ? item.data : undefined,
    }));

    setProperty({
      ...property,
      closedAuthBases: filtered.concat(mapped),
    });
  };

  /**
   * Live 공유/협업 조회 속성 설정
   */
  const setLiveShareProperty = (targets, permitType) => {
    const filtered = property.liveAuthShares.filter(
      (item) => item.uPermitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );
    const mapped = targets.map((item) => ({
      uPermitType: permitType,
      user: item.type === ORG_TREE_TYPE.USER ? item.data : undefined,
      dept: item.type === ORG_TREE_TYPE.DEPT ? item.data : undefined,
    }));

    // 조회 속성 변경
    setProperty({
      ...property,
      liveAuthShares: filtered.concat(mapped),
    });
  };

  /**
   * Live 권한 수정 속성 설정
   */
  const setLiveAuthParams = (targets, permitType) => {
    const filtered = property.originalLiveAuthBases.filter((item) => item.uPermitType === permitType);

    const filteredGrantLiveAuths = (params.grantLiveAuths || []).filter(
      (item) => item.permitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );

    const filteredRevokeLiveAuths = (params.revokeLiveAuths || []).filter(
      (item) => item.permitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );

    // 권한 추가 대상
    const grantLiveAuths = getAuthList(targets, filtered).map((item) => ({
      permitType,
      type: item.type,
      targetId: item.type === ORG_TREE_TYPE.USER ? item.data.userId : item.data.uCabinetCode,
    }));

    // 권한 삭제 대상
    const revokeLiveAuths = getRevokeList(filtered, targets).map((item) => ({
      rObjectId: item.rObjectId,
      permitType: item.uPermitType,
      type: item.user ? ORG_TREE_TYPE.USER : ORG_TREE_TYPE.DEPT,
      targetId: item.user ? item.user.userId : item.dept.uCabinetCode,
    }));

    // 수정 속성 변경
    setParams({
      ...params,
      grantLiveAuths: filteredGrantLiveAuths.concat(grantLiveAuths),
      revokeLiveAuths: filteredRevokeLiveAuths.concat(revokeLiveAuths),
    });
  };

  /**
   * Closed 권한 수정 속성 설정
   */
  const setClosedAuthParams = (targets, permitType) => {
    // 권한 추가 대상
    const grantClosedAuths = getAuthList(targets, property.originalClosedAuthBases).map((item) => ({
      permitType,
      type: item.type,
      targetId: item.type === ORG_TREE_TYPE.USER ? item.data.userId : item.data.uCabinetCode,
    }));

    // 권한 삭제 대상
    const revokeClosedAuths = getRevokeList(property.originalClosedAuthBases, targets).map((item) => ({
      rObjectId: item.rObjectId,
      type: item.user ? ORG_TREE_TYPE.USER : ORG_TREE_TYPE.DEPT,
      targetId: item.user ? item.user.userId : item.dept.uCabinetCode,
    }));

    // 수정 속성 변경
    setParams({
      ...params,
      grantClosedAuths,
      revokeClosedAuths,
    });
  };

  /**
   * Live 공유/협업 수정 속성 설정
   */
  const setLiveShareParams = (targets, permitType) => {
    const filtered = property.originalLiveAuthShares.filter((item) => item.uPermitType === permitType);

    const filteredGrantShares = (params.grantShares || []).filter(
      (item) => item.permitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );

    const filteredRevokeShares = (params.revokeShares || []).filter(
      (item) => item.permitType === (permitType === PERMIT_TYPE.READ.key ? PERMIT_TYPE.DELETE.key : PERMIT_TYPE.READ.key),
    );

    // 공유/협업 추가 대상
    const grantShares = getAuthList(targets, filtered).map((item) => ({
      permitType,
      type: item.type,
      targetId: item.type === ORG_TREE_TYPE.USER ? item.data.userId : item.data.uCabinetCode,
    }));

    // 공유/협업 삭제 대상
    const revokeShares = getRevokeList(filtered, targets).map((item) => ({
      rObjectId: item.rObjectId,
      permitType: item.uPermitType,
      type: item.user ? ORG_TREE_TYPE.USER : ORG_TREE_TYPE.DEPT,
      targetId: item.user ? item.user.userId : item.dept.uCabinetCode,
    }));

    // 수정 속성 변경
    setParams({
      ...params,
      grantShares: filteredGrantShares.concat(grantShares),
      revokeShares: filteredRevokeShares.concat(revokeShares),
    });
  };

  /**
   * 권한 추가 대상
   */
  const getAuthList = (list1, list2) => {
    return list1.filter(
      (item) =>
        !list2.find((item2) => {
          if (item2.user && item.type === ORG_TREE_TYPE.USER) return item2.user.userId === item.data.userId;
          else if (item2.dept && item.type === ORG_TREE_TYPE.DEPT) return item2.dept.orgId === item.data.orgId;
        }),
    );
  };

  /**
   * 권한 삭제 대상
   */
  const getRevokeList = (list1, list2) => {
    return list1.filter(
      (item) =>
        !list2.find((item2) => {
          if (item.user && item2.type === ORG_TREE_TYPE.USER) return item.user.userId === item2.data.userId;
          else if (item.dept && item2.type === ORG_TREE_TYPE.DEPT) return item.dept.orgId === item2.data.orgId;
        }),
    );
  };

  /**
   * 권한, 공유/협업 대상 리스트
   */
  const getTargets = () => {
    let targets;
    if (currentSetAuthType === "LIVE_BASE_R") {
      targets = property.liveAuthBases
        .filter((item) => item.uPermitType === PERMIT_TYPE.READ.key)
        .map((item) => (item.user ? `${item.user.orgId}${TREE_KEY_DIVIDER}${item.user.userId}` : item.dept.orgId));
    } else if (currentSetAuthType === "LIVE_BASE_D") {
      targets = property.liveAuthBases
        .filter((item) => item.uPermitType === PERMIT_TYPE.DELETE.key)
        .map((item) => (item.user ? `${item.user.orgId}${TREE_KEY_DIVIDER}${item.user.userId}` : item.dept.orgId));
    } else if (currentSetAuthType === "LIVE_SHARE_R") {
      targets = property.liveAuthShares
        .filter((item) => item.uPermitType === PERMIT_TYPE.READ.key)
        .map((item) => (item.user ? `${item.user.orgId}${TREE_KEY_DIVIDER}${item.user.userId}` : item.dept.orgId));
    } else if (currentSetAuthType === "LIVE_SHARE_D") {
      targets = property.liveAuthShares
        .filter((item) => item.uPermitType === PERMIT_TYPE.DELETE.key)
        .map((item) => (item.user ? `${item.user.orgId}${TREE_KEY_DIVIDER}${item.user.userId}` : item.dept.orgId));
    } else if (currentSetAuthType === "CLOSE_BASE_R") {
      targets = property.closedAuthBases
        .filter((item) => item.uPermitType === PERMIT_TYPE.READ.key)
        .map((item) => (item.user ? `${item.user.orgId}${TREE_KEY_DIVIDER}${item.user.userId}` : item.dept.orgId));
    } else if (currentSetAuthType === "CLOSE_BASE_D") {
      targets = property.closedAuthBases
        .filter((item) => item.uPermitType === PERMIT_TYPE.DELETE.key)
        .map((item) => (item.user ? `${item.user.orgId}${TREE_KEY_DIVIDER}${item.user.userId}` : item.dept.orgId));
    }

    return targets;
  };

  return (
    <DynamicButtonModalDialog
      open={opened}
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={() => saveProperty()} className={classes.btnAction}>
            확인
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
          <Button disabled={!modified} onClick={() => saveProperty(true)} className={classes.btnAction}>
            적용
          </Button>
        </Fragment>
      }
      title="폴더 속성"
      maxWidth="xs"
      fullWidth
    >
      <FolderPropertyModal
        tab={tab}
        onTabChange={changeTab}
        property={property}
        onPropertyChange={changeProperty}
        onSecLevelChange={changeSecLevel}
        onAuthClick={clickAuth}
      />
      <OrgSelectModalContainer ref={authRef} targets={getTargets} onOrgSelect={selectAuthTarget} withUser multiple />
    </DynamicButtonModalDialog>
  );
});

export default FolderPropertyModalContainer;
