import { Fragment } from "react";
import DocVersionModalContainer from "views/containers/doc/modals/version/DocVersionModalContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("DocVersionRenderer.js");

export default function DocVersionRenderer({ text, opened, onDoubleClick, onModalClose, onContextMenu }) {
  return (
    <Fragment>
      <div style={{ width: "100%", textAlign: !text ? "left" : undefined }} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu}>
        {text || "-"}
      </div>
      <ModalDialog open={opened} title="전체 버전 리스트 모달" onClose={onModalClose} maxWidth="xs" fullWidth>
        <DocVersionModalContainer />
      </ModalDialog>
    </Fragment>
  );
}
