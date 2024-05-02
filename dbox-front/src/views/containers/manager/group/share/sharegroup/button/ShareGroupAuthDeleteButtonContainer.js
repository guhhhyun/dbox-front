import { useState } from "react";
import ShareGroupAuthDeleteButton from "views/templates/manager/group/share/sharegroup/button/ShareGroupAuthDeleteButton";
import ShareGroupApi from "apis/sharegroup-api";

console.debug("ShareGroupAuthDeleteButtonContainer.js");

export default function ShareGroupAuthDeleteButtonContainer({ shareGroupGridData, leftGridgetData, onResetGridData }) {
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  /**
   * 삭제창 확인
   */
  const deleteShareGroup = async () => {
    try {
      await ShareGroupApi.deleteShareGroup({
        params: {
          rObjectId: shareGroupGridData.rObjectId,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setConfirmDeleteOpened(false);
    setClearOpened(true);
    leftGridgetData();
    onResetGridData([]);
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
    <ShareGroupAuthDeleteButton
      confirmDeleteOpened={confirmDeleteOpened}
      onDeleteOkClick={deleteShareGroup}
      onDeleteButtonClick={openConfirmDelete}
      onDeleteClose={closeConfirmDelete}
      shareGroupGridData={shareGroupGridData}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
    />
  );
}
