import {useEffect, useRef, useState} from "react";
import AutoClearGrid from "views/templates/manager/group/manageconfig/autoclear/AutoClearGrid";
import AutoClearDetailGrid from "views/templates/manager/group/manageconfig/autoclear/AutoClearDetailGrid";
import AutoClosingApi from "apis/autoclosing-api";
import DividerWith from "views/commons/divider/DividerWith";

export default function AutoClearGridContainer( { dataToSearchFor, setAlert } ) {

  const gridRef = useRef(null);
  const detailRef = useRef(null);

  const [objectId, setObjectId] = useState();
  const [docKey, setDocKey] = useState("");

  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState("");

  const setRowData = (ref, data) => {
    const current = ref.current;
    if (current) {
      current.api.setRowData(data);
    }
  }

  useEffect(() => {
    getDataToClose(dataToSearchFor);
  }, [dataToSearchFor]);

  const getDataToClose = async (params) => {
    const response = await AutoClosingApi.getDataToClose({params});
    setRowData(gridRef, response.data.response);
    setRowData(detailRef, []);
  };

  const getDataByDocKeyToClose = async (docKey) => {
    const isNotValidDocKey = docKey.trim().length < 1;
    if (isNotValidDocKey) {
      setRowData(detailRef, []);
      return;
    }
    const response = await AutoClosingApi.getDataByDocKeyToClose(docKey);
    setRowData(detailRef, response.data.response);
    setDocKey(docKey);
  };

  const onGridReady = () => {
    getDataToClose();
  };

  const openModal = (params) => {
    const data = params.data;
    setObjectId(data.r_object_id);
    setContent(`${data.object_name} ${data.r_version_label} 버전을 삭제 합니다.`)
    setOpened(true);
  };

  const onModalOkClick = async () => {
    await onModalSave();
    setOpened(false);
  };

  const onModalSave = async () => {
    const response = await AutoClosingApi.destoryById(objectId);
    if(response.status === 200) {
      setAlert({ open: true, content: "삭제 되었습니다.", callback: getDataToClose });
    }
  };

  const closeModal = () => {
    setOpened(false);
  };

  return (
    <>
      <AutoClearGrid
        ref={gridRef}
        onGridReady={onGridReady}
        getDataByDocKeyToClose={getDataByDocKeyToClose}
      />
      <DividerWith/>
      <AutoClearDetailGrid
        ref={detailRef}
        openModal={openModal}
        opened={opened}
        content={content}
        onModalOkClick={onModalOkClick}
        onModalClose={closeModal}
      />
    </>
  );
};
