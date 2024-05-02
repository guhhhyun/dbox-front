import { Fragment } from "react";
import DocCreatorModalContainer from "views/containers/doc/modals/creator/DocCreatorModalContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("DocCreatorRenderer.js");

export default function DocCreatorRenderer({ text, opened, onDoubleClick, onModalClose, onContextMenu }) {
  return (
    <Fragment>
      <div style={{ width: "100%", textAlign: !text ? "left" : undefined }} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu}>
        {text || "-"}
      </div>
      <ModalDialog open={opened} title="전체 작성자 리스트 모달" onClose={onModalClose} maxWidth="xs" fullWidth>
        <DocCreatorModalContainer />
      </ModalDialog>
    </Fragment>
  );
}
