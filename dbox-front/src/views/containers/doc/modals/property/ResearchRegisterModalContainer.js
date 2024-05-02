import { forwardRef, Fragment, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import OrgSelectModalContainer from "views/containers/doc/modals/org/OrgSelectModalContainer";
import ResearchPropertyModal from "views/templates/doc/modals/property/ResearchPropertyModal";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import { CONFIRM_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import ResearchApi from "apis/research-api";
import CommonUtil from "utils/common-util";
import { SEC_LEVEL, TREE_KEY_DIVIDER } from "constants/code-constants";

console.debug("ResearchRegisterModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px",
  },
});

const ResearchRegisterModalContainer = forwardRef(function (props, ref) {
  const { enqueueSnackbar } = useSnackbar();
  const { openDialog, closeDialog } = useGlobalDialog();

  const user = useSelector((state) => state.session.user);

  const DEFAULT_PROPERTY = {
    name: "",
    secLevel: SEC_LEVEL.TEAM.key,
    startYear: format(new Date(), "yyyy"),
    chief: user,
    finishYn: false,
    listOpenYn: true,
    ownTarget: { orgId: user.orgId, orgNm: user.orgNm },
    joinReadTargets: [],
    joinDelTargets: [],
  };

  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState(0);
  const [property, setProperty] = useState(DEFAULT_PROPERTY);

  const ownRef = useRef();
  const joinReadRef = useRef();
  const joinDelRef = useRef();
  const chiefRef = useRef();

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  /**
   * 모달 열기
   */
  const openModal = async (rschCode) => {
    setOpened(true);
    if (rschCode) {
      try {
        const response = await ResearchApi.getResearchOne({ params: { rschCode } });

        // 현재 연구과제 정보 세팅
        setProperty({
          name: response.data.response.uRschName,
          secLevel: response.data.response.uSecLevel,
          startYear: response.data.response.uStartYear,
          chief: response.data.response.chiefDetail,
          finishYn: response.data.response.uFinishYn === "Y",
          listOpenYn: response.data.response.uListOpenYn === "Y",
          ownTarget: response.data.response.ownDeptDetail,
          joinReadTargets: response.data.response.joinDeptReads,
          joinDelTargets: response.data.response.joinDeptDels,
        });
      } catch (error) {
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      }
    } else {
      setProperty(DEFAULT_PROPERTY);
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
   * 이름 변경
   */
  const changeName = (event) => {
    event.preventDefault();

    setProperty({
      ...property,
      name: event.target.value,
    });
  };

  /**
   * 보안등급 변경
   */
  const changeSecLevel = (secLevel) => {
    setProperty({
      ...property,
      secLevel,
    });
  };

  /**
   * 주관부서 설정 모달 열기
   */
  const clickOwn = () => {
    ownRef.current.openModal();
  };

  /**
   * 참여부서(조회/다운로드) 설정 모달 열기
   */
  const clickJoinRead = () => {
    joinReadRef.current.openModal();
  };

  /**
   * 참여부서(편집/삭제) 설정 모달 열기
   */
  const clickJoinDel = () => {
    joinDelRef.current.openModal();
  };

  /**
   * 책임자 설정 모달 열기
   */
  const clickChief = () => {
    chiefRef.current.openModal();
  };

  /**
   * 시행연도 변경
   */
  const changeStartYear = (event) => {
    event.preventDefault();

    setProperty({
      ...property,
      startYear: event.target.value,
    });
  };

  /**
   * 목록보기 활성화 여부 변경
   */
  const changeListOpenYn = (event) => {
    event.preventDefault();

    setProperty({
      ...property,
      listOpenYn: event.target.checked,
    });
  };

  /**
   * 연구과제 속성 저장
   */
  const saveFolderProperty = () => {
    if (!property.name) {
      alert("연구과제명을 입력해주세요");
      return;
    }
    if (!property.startYear) {
      alert("연도를 입력해주세요");
      return;
    }

    openDialog(CONFIRM_DIALOG, {
      title: "확인",
      content: "새 연구과제를 생성하시겠습니까?",
      onOkClick: requestNewResearch,
    });
  };

  /**
   * 새 연구과제 만들기
   */
  const requestNewResearch = async () => {
    try {
      const response = await ResearchApi.postResearch({
        params: {
          uRschName: property.name,
          uSecLevel: property.secLevel,
          uStartYear: property.startYear,
          uChiefId: property.chief.userId,
          uFinishYn: property.finishYn ? "Y" : "N",
          uListOpenYn: property.listOpenYn ? "Y" : "N",
          uOwnDept: property.ownTarget.orgId,
          uJoinDeptReads: property.joinReadTargets.map((item) => item.orgId),
          uJoinDeptDels: property.joinDelTargets.map((item) => item.orgId),
        },
      });

      setOpened(false);
      closeDialog();
      window.location.reload();
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 주관부서 선택
   */
  const selectOwnTarget = (targets) => {
    setProperty({
      ...property,
      ownTarget: targets[0].data,
    });
  };

  /**
   * 참여부서(조회/다운로드) 선택
   */
  const selectJoinReadTarget = (targets) => {
    setProperty({
      ...property,
      joinReadTargets: targets.map((item) => item.data),
    });
  };

  /**
   * 참여부서(편집/삭제) 선택
   */
  const selectJoinDelTarget = (targets) => {
    setProperty({
      ...property,
      joinDelTargets: targets.map((item) => item.data),
    });
  };

  /**
   * 책임자 선택
   */
  const selectChiefTarget = (targets) => {
    setProperty({
      ...property,
      chief: targets[0].data,
    });
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={saveFolderProperty} className={classes.btnAction}>
            확인
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
          <Button disabled className={classes.btnAction}>
            적용
          </Button>
        </Fragment>
      }
      title="연구과제 생성"
      maxWidth="md"
      fullWidth
    >
      <ResearchPropertyModal
        name={property.name}
        onNameChange={changeName}
        secLevel={property.secLevel}
        onSecLevelChange={changeSecLevel}
        ownTarget={property.ownTarget}
        onOwnClick={clickOwn}
        joinReadTargets={property.joinReadTargets}
        onJoinReadClick={clickJoinRead}
        joinDelTargets={property.joinDelTargets}
        onJoinDelClick={clickJoinDel}
        startYear={property.startYear}
        onStartYearChange={changeStartYear}
        chiefName={property.chief.displayName}
        onChiefClick={clickChief}
        finishYn={property.finishYn ? "완료" : "진행중"}
        listOpenYn={property.listOpenYn}
        onListOpenYnChange={changeListOpenYn}
        tab={tab}
        onTabChange={changeTab}
      />
      <OrgSelectModalContainer ref={ownRef} targets={[property.ownTarget.orgId]} onOrgSelect={selectOwnTarget} />
      <OrgSelectModalContainer ref={joinReadRef} targets={property.joinReadTargets.map((item) => item.orgId)} onOrgSelect={selectJoinReadTarget} multiple />
      <OrgSelectModalContainer ref={joinDelRef} targets={property.joinDelTargets.map((item) => item.orgId)} onOrgSelect={selectJoinDelTarget} multiple />
      <OrgSelectModalContainer
        ref={chiefRef}
        targets={[`${property.chief.orgId}${TREE_KEY_DIVIDER}${property.chief.userId}`]}
        onOrgSelect={selectChiefTarget}
        withUser
        selectOnlyUser
      />
    </DynamicButtonModalDialog>
  );
});

export default ResearchRegisterModalContainer;
