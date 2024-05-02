import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import DocCopyModalContainer from "views/containers/doc/modals/paste/DocCopyModalContainer";
import DocMoveModalContainer from "views/containers/doc/modals/paste/DocMoveModalContainer";

const DocPasteModal = forwardRef(function ({ type }, ref) {
  const moveRef = useRef(null);
  const copyRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: "move" === type ? moveRef.current.openModal : copyRef.current.openModal,
  }));

  return <Fragment>{"move" === type ? <DocMoveModalContainer ref={moveRef} /> : <DocCopyModalContainer ref={copyRef} />}</Fragment>;
});

export default DocPasteModal;
