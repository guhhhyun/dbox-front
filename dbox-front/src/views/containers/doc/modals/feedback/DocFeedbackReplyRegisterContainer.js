import { Fragment, useState } from "react";
import { IconButton } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import DocFeedbackReplyRegisterModal from "views/templates/doc/modals/feedback/DocFeedbackReplyRegisterModal";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("DocFeedbackReplyRegisterContainer.js");

export default function DocFeedbackReplyRegisterContainer() {
  const [opened, setOpened] = useState(false);
  const [blind, setBlind] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState(null);

  /**
   * 답글 작성 모달 열기
   */
  const clickButton = () => {
    setOpened(true);
  };

  /**
   * 답글 작성 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 비공개 여부 변경
   */
  const toggleBlind = (event) => {
    setBlind(event.target.checked);
  };

  /**
   * 피드백 내용 변경
   */
  const changeFeedbackInput = (event) => {
    setFeedbackInput(event.target.value);
  };

  /**
   * 피드백 등록
   */
  const registerFeedbackReply = () => {
    alert("register feedback reply");
  };

  return (
    <Fragment>
      <IconButton onClick={clickButton}>
        <Reply />
      </IconButton>
      <ModalDialog open={opened} title="답글 작성" onClose={closeModal} maxWidth="xs" fullWidth>
        <DocFeedbackReplyRegisterModal
          blind={blind}
          onBlindChange={toggleBlind}
          feedbackInput={feedbackInput}
          onFeedbackInputChange={changeFeedbackInput}
          onRegisterClick={registerFeedbackReply}
        />
      </ModalDialog>
    </Fragment>
  );
}
