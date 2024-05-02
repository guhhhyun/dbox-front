import { Fragment } from "react";
import DocApprovalModalContainer from "views/containers/doc/modals/approval/DocApprovalModalContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("DocApprovalRenderer.js");

export default function DocApprovalRenderer({ text, opened, onDoubleClick, onModalClose, onContextMenu }) {
  return (
    <Fragment>
      <div style={{ width: "100%", textAlign: !text ? "left" : undefined }} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu}>
        {text || "-"}
      </div>
      <ModalDialog open={opened} title="전체 결재정보 리스트 모달" onClose={onModalClose} maxWidth="lg" fullWidth>
        <DocApprovalModalContainer />
      </ModalDialog>
    </Fragment>
  );
}
