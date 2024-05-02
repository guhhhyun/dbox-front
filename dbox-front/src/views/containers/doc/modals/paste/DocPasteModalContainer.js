import { forwardRef, useImperativeHandle, useRef } from "react";
import DocPasteModal from "views/templates/doc/modals/paste/DocPasteModal";

console.debug("DocPasteModalContainer.js");

const DocPasteModalContainer = forwardRef(function (props, ref) {
  const type = "move";

  const pasteRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: pasteRef.current.openModal,
  }));

  return <DocPasteModal ref={pasteRef} type={type} />;
});

export default DocPasteModalContainer;
