import { forwardRef, useImperativeHandle, useState } from "react";
import DeleteModal from "views/templates/doc/modals/delete/DeleteModal";

const DeleteModalContainer = forwardRef(function (props, ref) {
  const [denyOpened, setDenyOpened] = useState(false);
  const [proceedOpened, setProceedOpened] = useState(false);
  const [resultOpened, setResultOpened] = useState(false);

  useImperativeHandle(ref, () => ({
    deleteDoc,
  }));

  /**
   * 폴더/문서 삭제 ************* 구현 필요
   */
  const deleteDoc = (doc) => {
    if (doc) {
      setProceedOpened(true);
    } else {
      setDenyOpened(true);
    }
  };

  /**
   * 삭제 거부 모달 닫기
   */
  const closeDeny = () => {
    setDenyOpened(false);
  };

  /**
   * 삭제 진행 확인
   */
  const clickProceedOk = () => {
    setProceedOpened(false);
    setResultOpened(true);
  };

  /**
   * 삭제 진행 취소
   */
  const closeProceed = () => {
    setProceedOpened(false);
  };

  /**
   * 삭제 결과 모달 닫기
   */
  const closeResult = () => {
    setResultOpened(false);
  };

  return (
    <DeleteModal
      denyOpened={denyOpened}
      proceedOpened={proceedOpened}
      resultOpened={resultOpened}
      onDenyOkClick={closeDeny}
      onDenyClose={closeDeny}
      onProceedOkClick={clickProceedOk}
      onProceedClose={closeProceed}
      onResultOkClick={closeResult}
      onResultClose={closeResult}
    />
  );
});

export default DeleteModalContainer;
