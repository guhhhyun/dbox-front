import ManageIdGrid from "views/templates/manager/group/managepolicy/manageid/ManageIdGrid";
import ManageIdApi from "apis/manageid-api";
import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";

console.debug("ManageIdGridContainer.js");

const ManageIdGridContainer = forwardRef(({ onSearchTreeData, comCode }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridIdData, setGridIdData] = useState();
  const [opened, setOpened] = useState(false);
  const [useOpened, setUseOpend] = useState(false);
  const [notUseOpened, setNotUseOpend] = useState(false);
  const [userId, setUserId] = useState();
  const [userLogData, setUserLogData] = useState([]);
  const [searchCompanyData, setSearchCompanyData] = useState();
  const [searchDeptData, setSearchDeptData] = useState();
  const [searchUserData, setSearchUserData] = useState();
  const [clearOpened, setClearOpened] = useState(false);
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const onModalOpen = () => {
    setOpened(true);
  };

  const onModalClose = () => {
    setOpened(false);
  };

  /**
   * 사용버튼
   */
  const onUseModalOpen = () => {
    setUseOpend(true);
  };

  const onUseModalClose = () => {
    setUseOpend(false);
  };

  /**
   * 미사용버튼
   */
  const onNotUseModalOpen = () => {
    setNotUseOpend(true);
  };

  const onNotUseModalClose = () => {
    setNotUseOpend(false);
  };

  /**
   * id 목록 데이터 불러오기
   */
  const getData = async (treeCompanyData, treeDeptData, treeUserData) => {
    if (comCode === "DKG") {
      try {
        const response = await ManageIdApi.selectUserId({
          params: {
            comOrgId: treeCompanyData,
            orgId: treeDeptData,
            socialPerId: treeUserData,
          },
        });
        gridRef.current.api.setRowData(response.data.response);
        setSearchCompanyData(treeCompanyData);
        setSearchDeptData(treeDeptData);
        setSearchUserData(treeUserData);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await ManageIdApi.selectUserId({
          params: {
            comOrgId: comCode,
            orgId: treeDeptData,
            socialPerId: treeUserData,
          },
        });
        gridRef.current.api.setRowData(response.data.response);
        setSearchCompanyData(treeCompanyData);
        setSearchDeptData(treeDeptData);
        setSearchUserData(treeUserData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    getData();
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    var socialPerId = selectedRows[0] === undefined ? null : selectedRows[0].socialPerId;
    setGridIdData(selectedRows);
    setUserId(socialPerId);
  };

  /**
   * 접속이력 데이터 불러오기
   */
  const getLogData = async (userId) => {
    try {
      const response = await ManageIdApi.selectUserIdLog({
        params: {
          uUserId: userId,
        },
      });
      setUserLogData(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 사용 버튼 -> 확인 버튼 클릭
   */
  const onOkClick = async () => {
    // edms_user에 있는 사용자인 경우
    for (let i = 0; i < gridIdData.length; i++) {
      if (gridIdData[i].userState === "0" || gridIdData[i].userState === "1") {
        try {
          await ManageIdApi.updateIdStatus({
            params: {
              socialPerId: gridIdData[i].socialPerId,
              userState: 1,
            },
          });
        } catch (e) {
          console.error(e);
        }
        onSearchTreeData(searchCompanyData, searchDeptData, searchUserData);
      }
      // edms_user에 없는 사용자인 경우 edms_user에 추가
      else if (gridIdData[i].userState === null) {
        try {
          await ManageIdApi.createUserId({
            params: {
              socialPerId: gridIdData[i].socialPerId,
              email: gridIdData[i].email,
              uCabinetCode: gridIdData[i].uCabinetCode,
              orgId: gridIdData[i].orgId,
            },
          });
        } catch (e) {
          console.error(e);
        }
        onSearchTreeData(searchCompanyData, searchDeptData, searchUserData);
      } else {
      }
    }
    onUseModalClose();
    onNotUseModalClose();
    setGridIdData();
    setClearOpened(true);
  };

  /**
   * 미사용 버튼 -> 확인 버튼 클릭
   */
  const onNotOkClick = async () => {
    // edms_user에 있는 사용자인 경우
    for (let i = 0; i < gridIdData.length; i++) {
      if (gridIdData[i].userState === "0" || gridIdData[i].userState === "1") {
        try {
          await ManageIdApi.updateIdStatus({
            params: {
              socialPerId: gridIdData[i].socialPerId,
              userState: 0,
            },
          });
        } catch (e) {
          console.error(e);
        }
        onSearchTreeData(searchCompanyData, searchDeptData, searchUserData);
      }
      // edms_user에 없는 사용자인 경우 edms_user에 추가
      else if (gridIdData[i].userState === null) {
        try {
          await ManageIdApi.createUserId({
            params: {
              socialPerId: gridIdData[i].socialPerId,
              email: gridIdData[i].email,
              uCabinetCode: gridIdData[i].uCabinetCode,
              orgId: gridIdData[i].orgId,
            },
          });
        } catch (e) {
          console.error(e);
        }
        onSearchTreeData(searchCompanyData, searchDeptData, searchUserData);
      } else {
      }
    }
    onUseModalClose();
    onNotUseModalClose();
    setGridIdData();
    setClearOpened(true);
  };

  useEffect(() => {
    getLogData(userId);
  }, [userId]);

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <ManageIdGrid
      onGridReady={onGridReady}
      onSelectionChanged={onSelectionChanged}
      gridIdData={gridIdData}
      opened={opened}
      onModalOpen={onModalOpen}
      onModalClose={onModalClose}
      userLogData={userLogData}
      onOkClick={onOkClick}
      onNotOkClick={onNotOkClick}
      useOpened={useOpened}
      notUseOpened={notUseOpened}
      onUseModalOpen={onUseModalOpen}
      onUseModalClose={onUseModalClose}
      onNotUseModalOpen={onNotUseModalOpen}
      onNotUseModalClose={onNotUseModalClose}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      ref={gridRef}
    />
  );
});
export default ManageIdGridContainer;
