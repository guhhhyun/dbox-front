import { Async } from "react-async";
import DocCreatorModal from "views/templates/doc/modals/creator/DocCreatorModal";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import DocApi from "apis/doc-api";

console.debug("DocCreatorModalContainer.js");

export default function DocCreatorModalContainer() {
  return (
    <Async promiseFn={DocApi.getDocCreators} params={{}}>
      <Async.Fulfilled>{(data) => <DocCreatorModal creators={data} />}</Async.Fulfilled>
      <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
}
