import { Async } from "react-async";
import DocFeedbackList from "views/templates/doc/modals/feedback/DocFeedbackList";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import DocApi from "apis/doc-api";

export default function DocFeedbackListContainer() {
  return (
    <Async promiseFn={DocApi.getDocFeedbacks} params={{}}>
      <Async.Fulfilled>{(data) => <DocFeedbackList feedbacks={data} />}</Async.Fulfilled>
      <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
}
