import { useState } from "react";
import DocFeedbackModal from "views/templates/doc/modals/feedback/DocFeedbackModal";

console.debug("DocFeedbackModalContainer.js");

export default function DocFeedbackModalContainer() {
  const [blind, setBlind] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState(null);

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
  const registerFeedback = () => {
    alert("register feedback");
  };

  return (
    <DocFeedbackModal
      blind={blind}
      onBlindChange={toggleBlind}
      feedbackInput={feedbackInput}
      onFeedbackInputChange={changeFeedbackInput}
      onRegisterClick={registerFeedback}
    />
  );
}
