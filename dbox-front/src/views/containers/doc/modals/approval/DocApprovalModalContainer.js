import { Async } from "react-async";
import DocApprovalModal from "views/templates/doc/modals/approval/DocApprovalModal";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import DocApi from "apis/doc-api";

console.debug("DocApprovalModalContainer.js");

export default function DocApprovalModalContainer() {
  return (
    <Async promiseFn={DocApi.getDocRelatedApprovals} params={{}}>
      <Async.Fulfilled>{(data) => <DocApprovalModal approvals={data} />}</Async.Fulfilled>
      <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
}
