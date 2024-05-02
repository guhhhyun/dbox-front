import React, { useState } from "react";
import ShareGroupAuthUpdateDialogContent from "views/templates/manager/group/share/sharegroup/ShareGroupAuthUpdateDialogContent";

console.debug("ShareGroupAuthUpdateDialogContentContainer.js");

// 공유그룹추가 모달 창 안에 내용
export default function ShareGroupAuthUpdateDialogContentContainer({ getCheckValue, getCheckContentValue, shareGroupGridData }) {
  /**
   * 공유그룹 이름 입력 값
   */
  const shareGroupNameChange = (event) => {
    getCheckValue(event.target.value);
  };

  /**
   * 공유그룹 설명 입력 값
   */
  const shareGroupContentChange = (event) => {
    getCheckContentValue(event.target.value);
    console.log("설명 : " + getCheckContentValue);
  };

  return (
    <div>
      <ShareGroupAuthUpdateDialogContent
        shareGroupNameChange={shareGroupNameChange}
        shareGroupContentChange={shareGroupContentChange}
        shareGroupGridData={shareGroupGridData}
      />
    </div>
  );
}
