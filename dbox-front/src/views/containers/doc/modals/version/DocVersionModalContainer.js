import { Async } from "react-async";
import DocVersionModal from "views/templates/doc/modals/version/DocVersionModal";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import DocApi from "apis/doc-api";

console.debug("DocVersionModalContainer.js");

export default function DocVersionModalContainer() {
  return (
    <Async promiseFn={DocApi.getDocVersions} params={{}}>
      <Async.Fulfilled>{(data) => <DocVersionModal versions={data} />}</Async.Fulfilled>
      <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
}
