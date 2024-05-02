import { useSelector } from "react-redux";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import LockedDataApi from "apis/lockeddata-api";
import LockedDataGrid from "views/templates/manager/group/manageconfig/lockeddata/LockedDataGrid";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";

const LockedDataGridContainer = forwardRef(({ setCheckedList }, ref) => {
  const user = useSelector((state) => state.session.user);
  const [opened, setOpened] = useState(false);
  const [robjectid, setRobjectid] = useState(0);
  const [userObjectId, setUserObjectId] = useState(0);
  const [content, setContent] = useState("");

  const [progressing, setProgressing] = useState(false);

  const mgrType = user.mgr.companyComCode || user.mgr.groupComCode ? "I" : "D";

  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getSearchData,
    getData,
  }));

  const getSearchData = (response) => {
    gridRef.current.api.setRowData(response.data.response);
  };

  const getData = async () => {
    const params = {
      type: "L",
      company: comCode,
      mgrType: mgrType,
    }
    try {
      const response = await LockedDataApi.getLockedData({
        params,
      });
      gridRef.current.api.setRowData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  const onGridReady = () => {
    getData();
  };

  const openModal = (params) => {
    const data = params.data;
    setContent(`${data.objectName} 파일을 잠금 해제 합니다.`)
    setRobjectid(params.data.rObjectId);
    setUserObjectId(params.data.userObjectId);
    setOpened(true);
  };

  const onModalOkClick = async () => {
    setProgressing(true);
    await onModalSave();
    setOpened(false);
    await getData();
    setProgressing(false);
  };

  const onModalSave = async () => {
    try {
      const response = await LockedDataApi.unlockData({
        params: {
          rObjectId: robjectid,
          userObjectId: userObjectId,
          uLockStatus: "L",
          uLockType: "O",
        },
      });

      if (response.status === 200) {
        console.log("OK");
      } else {
        sendErrorCode(response)

      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendErrorCode = (response) => {
    throw new Error(response.data.message);
  }

  const closeModal = () => {
    setOpened(false);
  };

  return (
    <>
      <LockedDataGrid
        ref={gridRef}
        onGridReady={onGridReady}
        openModal={openModal}
        opened={opened}
        content={content}
        onModalOkClick={onModalOkClick}
        onModalClose={closeModal}
      />
      {progressing && <CenterCircularProgress />}
    </>
  );
});

export default LockedDataGridContainer;
