import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Async } from "react-async";
import DocMainContainer from "views/containers/doc/layout/DocMainContainer";
import DocLayout from "views/templates/doc/layout/DocLayout";
import UserCheck from "views/commons/check/UserCheck";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import AgentCheck from "views/templates/agent/AgentCheck";
import LoginApi from "apis/login-api";
import { setUser } from "stores/session";
import { HttpStatus } from "constants/http-constants";

console.debug("DocLayoutContainer.js");

export default function DocLayoutContainer() {
  const dispatcher = useDispatch();

  return (
    <Async promiseFn={LoginApi.session}>
      <Async.Fulfilled>
        {(data) => {
          const newUser = data.data.response?.user;
          dispatcher(setUser(newUser));
          return (
            <DocLayout>
              <DocMainContainer />
              <UserCheck userId={newUser.userId} />
            </DocLayout>
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
