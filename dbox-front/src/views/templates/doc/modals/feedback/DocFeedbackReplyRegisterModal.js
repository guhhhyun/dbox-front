import { Fragment } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@material-ui/core";

console.debug("DocFeedbackReplyRegisterModal.js");

export default function DocFeedbackReplyRegisterModal({ blind, onBlindChange, feedbackInput, onFeedbackInput, onRegisterClick }) {
  return (
    <Fragment>
      <TextField variant="outlined" size="small" value={feedbackInput} onChange={onFeedbackInput} />
      <Button variant="contained" color="primary" onClick={onRegisterClick}>
        등록
      </Button>
      <FormControlLabel control={<Checkbox checked={blind} onChange={onBlindChange} />} label="비공개" />
    </Fragment>
  );
}
