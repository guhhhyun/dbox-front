import { Async } from "react-async";
import { Redirect, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HttpStatus } from "constants/http-constants";
import ManagerLayout from "views/templates/manager/layout/ManagerLayout";
import TopHeaderContainer from "views/containers/header/TopHeaderContainer";
import ManageConfigFormContainer from "views/containers/manager/group/manageconfig/ManageConfigFormContainer";
import ManageAuthFormContainer from "views/containers/manager/group/manageauth/ManageAuthFormContainer";
import GradeFormContainer from "views/containers/manager/group/grade/GradeFormContainer";
import ShareFormContainer from "views/containers/manager/group/share/ShareFormContainer";
import TransferAuthFormContainer from "views/containers/manager/group/transfer/TransferAuthFormContainer";
import UnusualFormContainer from "views/containers/manager/group/unusual/UnusualFormContainer";
import AuthManageFormContainer from "views/containers/manager/dept/authmanage/AuthManageFormContainer";
import TransferApprovalFormContainer from "views/containers/manager/dept/transferapproval/TransferApprovalFormContainer";
import ManagePolicyFormContainer from "views/containers/manager/group/managepolicy/ManagePolicyFormContainer";
import AttachFormContainer from "views/containers/manager/group/attach/AttachFormContainer";
import PresetFormContainer from "views/containers/manager/dept/preset/PresetFormContainer";
import TakeoutControlFormContainer from "views/containers/manager/dept/takeoutcontrol/TakeoutControlFormContainer";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import ManagerMain from "views/templates/manager/layout/ManagerMain";
import MgrApi from "apis/mgr-api";
import RestrictRoute from "./RestrictRoute";
import { setUser } from "stores/session";

console.debug("ManagerLayoutContainer.js");

export default function ManagerLayoutContainer() {
  const dispatcher = useDispatch();
  const history = useHistory();

  return (
    <Async promiseFn={MgrApi.getMgrChk}>
      <Async.Fulfilled>
        {(data) => {
          const newUser = data.data.response.user;
          dispatcher(setUser(newUser.user));

          return (
            <div>
              <TopHeaderContainer />
              <ManagerLayout>
                <ManagerMain>
                  <Switch>
                    <RestrictRoute path="/manager/group/manage-config" component={ManageConfigFormContainer} />
                    <RestrictRoute path="/manager/group/manage-auth" component={ManageAuthFormContainer} />
                    <RestrictRoute path="/manager/group/grade-change" component={GradeFormContainer} />
                    <RestrictRoute path="/manager/group/share" component={ShareFormContainer} />
                    <RestrictRoute path="/manager/group/transfer-auth" component={TransferAuthFormContainer} />
                    <RestrictRoute path="/manager/group/unusual" component={UnusualFormContainer} />
                    <RestrictRoute path="/manager/group/manage-policy" component={ManagePolicyFormContainer} />
                    <RestrictRoute path="/manager/group/attach" component={AttachFormContainer} />
                    <RestrictRoute path="/manager/dept/preset" component={PresetFormContainer} />
                    <RestrictRoute path="/manager/dept/auth-manage" component={AuthManageFormContainer} />
                    <RestrictRoute path="/manager/dept/takeout-control" component={TakeoutControlFormContainer} />
                    <RestrictRoute path="/manager/dept/transfer-approval" component={TransferApprovalFormContainer} />
                  </Switch>
                </ManagerMain>
              </ManagerLayout>
            </div>
          );
        }}
      </Async.Fulfilled>
      <Async.Rejected>
        {(error) => {
          if (error?.response?.status === HttpStatus.UNAUTHORIZED) return <Redirect to="/login" />;
          else return <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />;
        }}
      </Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
}
