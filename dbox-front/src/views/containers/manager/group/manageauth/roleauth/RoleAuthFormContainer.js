import RoleAuthForm from "views/templates/manager/group/manageauth/roleauth/RoleAuthForm";
import { useState, useRef } from "react";
import RoleAuthApi from "apis/roleauth-api";
console.debug("RoleAuthFormContainer.js");

export default function RoleAuthFormContainer() {
  const [roleAuthGridData, setRoleAuthGridData] = useState([]);
  const [roleAuthUserGridData, setRoleAuthUserGridData] = useState();
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [alertModalOpend, setAlertModalOpend] = useState(false);
  const [treeNameId, setTreeNameId] = useState();
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectComCode, setSelectComCode] = useState("DKG");
  const [clearOpened, setClearOpened] = useState(false);

  const childRef = useRef();

  const onGridDataClick = (roleAuthGridData) => {
    setRoleAuthGridData(roleAuthGridData);
    childRef.current.rightGrid.getData("", roleAuthGridData);
    setRoleAuthUserGridData();
  };

  const onGridUserDataClick = (roleAuthUserGridData) => {
    setRoleAuthUserGridData(roleAuthUserGridData);
  };

  /**
   *  조직도 트리 - nameId값
   */
  const clickTreeNameId = (treeNameId) => {
    setTreeNameId(treeNameId);
  };

  /**
   * 추가 - 확인버튼클릭
   */
  const onConfirmOkClick = async () => {
    if (roleAuthGridData.uConfigFlag === "0") {
      if (treeNameId != undefined) {
        try {
          await RoleAuthApi.createRoleAuthUser({
            params: {
              groupName: roleAuthGridData.groupName,
              userId: treeNameId[0],
              uComCode: roleAuthGridData.uComCode,
              uGroupScope: roleAuthGridData.uGroupScope,
              uConfigFlag: roleAuthGridData.uConfigFlag,
            },
          });
        } catch (e) {
          console.error(e);
        }
        setConfirmOpened(false);
        setClearOpened(true);
        childRef.current.rightGrid.getData("", roleAuthGridData);
      } else {
        openAlertDialog();
      }
    } else {
      if (treeNameId != undefined) {
        try {
          await RoleAuthApi.createRoleAuthUser({
            params: {
              groupName: roleAuthGridData.groupName,
              userId: treeNameId[0],
              uComCode: roleAuthGridData.uComCode,
              uGroupScope: roleAuthGridData.uGroupScope,
              uConfigFlag: roleAuthGridData.uConfigFlag,
            },
          });
          await RoleAuthApi.createRoleAuthUser({
            params: {
              groupName: roleAuthGridData.groupName2,
              userId: treeNameId[0],
              uComCode: roleAuthGridData.uComCode,
              uGroupScope: "#",
              uConfigFlag: "#",
            },
          });
        } catch (e) {
          console.error(e);
        }
        setConfirmOpened(false);
        setClearOpened(true);
        childRef.current.rightGrid.getData("", roleAuthGridData);
      } else {
        openAlertDialog();
      }
    }
  };

  /**
   * 삭제버튼클릭
   */
  const onDeleteClick = async () => {
    if (roleAuthGridData.uConfigFlag === "0") {
      try {
        await RoleAuthApi.deleteRoleAuthUser({
          params: {
            rObjectId: roleAuthUserGridData.rObjectId,
            groupName: roleAuthGridData.groupName,
            userId: roleAuthUserGridData.userId,
            uGroupScope: roleAuthGridData.uGroupScope,
            uConfigFlag: roleAuthGridData.uConfigFlag,
          },
        });
      } catch (e) {
        console.error(e);
      }
      setConfirmDeleteOpened(false);
      setClearOpened(true);
      childRef.current.rightGrid.getData("", roleAuthGridData);
      onGridUserDataClick();
    } else {
      try {
        await RoleAuthApi.deleteRoleAuthUser({
          params: {
            groupName: roleAuthGridData.groupName,
            userId: roleAuthUserGridData.userId,
            uGroupScope: roleAuthGridData.uGroupScope,
            uConfigFlag: roleAuthGridData.uConfigFlag,
          },
        });
        await RoleAuthApi.deleteRoleAuthUser({
          params: {
            groupName: roleAuthGridData.groupName2,
            userId: roleAuthUserGridData.userId,
            uGroupScope: "#",
            uConfigFlag: "#",
          },
        });
      } catch (e) {
        console.error(e);
      }
      setConfirmDeleteOpened(false);
      setClearOpened(true);
      childRef.current.rightGrid.getData("", roleAuthGridData);
      onGridUserDataClick();
    }
  };

  // 회사 선택
  const handleChange = (event, selectComCode) => {
    selectComCode = event.target.value;
    setSelectComCode(event.target.value);
    childRef.current.leftGrid.getData(selectComCode);
    setRoleAuthGridData([]);
    childRef.current.rightGrid.getData("＃＃", roleAuthGridData);
  };

  // 검색어 입력하는 내용
  const onSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // 검색 아이콘 클릭 시
  const onInputTextData = (searchText) => {
    childRef.current.rightGrid.getData(searchText, roleAuthGridData);
  };

  const clickSearch = () => {
    onInputTextData(searchText);
  };

  /**
   * 모달 열기
   */
  const onConfirmOpen = () => {
    setConfirmOpened(true);
  };

  /**
   * 모달 닫기
   */
  const onConfirmClose = () => {
    setConfirmOpened(false);
  };

  /**
   * 알림 모달 열기
   */
  const openAlertDialog = () => {
    setAlertModalOpend(true);
  };

  /**
   * 알림 모달 닫기
   */
  const closeAlertDialog = () => {
    setAlertModalOpend(false);
  };

  /**
   * 확인창 열기
   */
  const openConfirmDelete = () => {
    setConfirmDeleteOpened(true);
  };

  /**
   * 확인창 닫기
   */
  const closeConfirmDelete = () => {
    setConfirmDeleteOpened(false);
  };

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <RoleAuthForm
      handleChange={handleChange}
      confirmOpened={confirmOpened}
      onGridDataClick={onGridDataClick}
      onGridUserDataClick={onGridUserDataClick}
      onConfirmOpen={onConfirmOpen}
      onConfirmClose={onConfirmClose}
      onConfirmOkClick={onConfirmOkClick}
      clickTreeNameId={clickTreeNameId}
      onDeleteClick={onDeleteClick}
      openConfirmDelete={openConfirmDelete}
      closeConfirmDelete={closeConfirmDelete}
      confirmDeleteOpened={confirmDeleteOpened}
      closeAlertDialog={closeAlertDialog}
      openAlertDialog={openAlertDialog}
      alertModalOpend={alertModalOpend}
      roleAuthGridData={roleAuthGridData}
      roleAuthUserGridData={roleAuthUserGridData}
      onIconClick={clickSearch}
      onSearchChange={onSearchChange}
      selectComCode={selectComCode}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      ref={childRef}
    />
  );
}
