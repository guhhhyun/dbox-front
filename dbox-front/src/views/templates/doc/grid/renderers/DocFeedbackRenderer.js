import { Fragment } from "react";
import DocFeedbackModalContainer from "views/containers/doc/modals/feedback/DocFeedbackModalContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("DocFeedbackRenderer.js");

export default function DocFeedbackRenderer({ text, opened, onDoubleClick, onModalClose, onContextMenu }) {
  return (
    <Fragment>
      <div style={{ width: "100%", textAlign: !(text || text === 0) ? "left" : undefined }} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu}>
        {(text || text === 0) ? `${text} 건` : "-"}
      </div>
      <ModalDialog open={opened} title="전체 피드백 리스트 모달" onClose={onModalClose} maxWidth="lg" fullWidth>
        <DocFeedbackModalContainer />
      </ModalDialog>
    </Fragment>
  );
}
