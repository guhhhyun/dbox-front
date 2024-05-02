import { useState, useCallback } from "react";
import AlertModalButtonContainer from "views/containers/manager/common/AlertModalButtonContainer";

console.debug("TestModalButtonContainer.js");

export default function TestModalButtonContainer({ deptManagers }) {
  const buttonName = "삭제";
  const content = "삭제하시겠습니까?";

  /**
   * 조직도 호출?
   */

   const onModalSave = useCallback(() => {
     test();
   }, []);

   const test = () => {
     alert("삭제");
   };

  return <AlertModalButtonContainer onModalSave={onModalSave} buttonName={buttonName} content={content} />;
}
