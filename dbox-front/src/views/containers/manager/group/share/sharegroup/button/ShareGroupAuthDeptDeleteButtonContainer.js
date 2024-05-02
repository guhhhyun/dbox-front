import { useState } from "react";
import ShareGroupAuthDeptDeleteButton from "views/templates/manager/group/share/sharegroup/button/ShareGroupAuthDeptDeleteButton";
import ShareGroupApi from "apis/sharegroup-api";

console.debug("ShareGroupAuthDeleteButtonContainer.js");

export default function ShareGroupAuthDeptDeleteButtonContainer({ shareGroupGridData, deptGridData, leftGridgetData, rightGridgetData, clickDeptGridData }) {
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  /**
   * 삭제창 확인 버튼 클릭
   */
  const deleteShareGroupDept = async () => {
    try {
      await ShareGroupApi.deleteDept({
        params: {
          rObjectId: deptGridData.rObjectId,
          uDeptCode: deptGridData.uDeptCode,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setConfirmDeleteOpened(false);
    setClearOpened(true);
    leftGridgetData();
    rightGridgetData(shareGroupGridData.rObjectId);
    clickDeptGridData();
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
    <ShareGroupAuthDeptDeleteButton
      confirmDeleteOpened={confirmDeleteOpened}
      onDeleteOkClick={deleteShareGroupDept}
      onDeleteButtonClick={openConfirmDelete}
      onDeleteClose={closeConfirmDelete}
      deptGridData={deptGridData}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
    />
  );
}
