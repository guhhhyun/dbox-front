import React, { useState } from "react";
import ShareGroupAuthDialogContent from "views/templates/manager/group/share/sharegroup/ShareGroupAuthDialogContent";

console.debug("ShareGroupAuthDialogContentContainer.js");

// 공유그룹추가 모달 창 안에 내용
export default function ShareGroupAuthDialogContentContainer({ comCode, onCheckValue, onCheckContentValue, onCheckComCode }) {
  const [shareGroupName, setShareGroupName] = useState("");
  const [shareGroupContent, setShareGroupContent] = useState("");
  const [opt, setOpt] = useState("");

  /**
   * 공유그룹 이름 입력 값
   */
  const shareGroupNameChange = (event) => {
    setShareGroupName(event.target.value);
    onCheckValue(event.target.value);
  };

  /**
   * 공유그룹 설명 입력 값
   */
  const shareGroupContentChange = (event) => {
    setShareGroupContent(event.target.value);
    onCheckContentValue(event.target.value);
  };

  /**
   * select 회사 선택
   */
  const handleChange = (event) => {
    setOpt(event.target.value);
    onCheckComCode(event.target.value);
  };

  return (
    <div>
      <ShareGroupAuthDialogContent
        shareGroupName={shareGroupName}
        shareGroupNameChange={shareGroupNameChange}
        opt={opt}
        shareGroupContent={shareGroupContent}
        shareGroupContentChange={shareGroupContentChange}
        handleChange={handleChange}
        comCode={comCode}
      />
    </div>
  );
}
