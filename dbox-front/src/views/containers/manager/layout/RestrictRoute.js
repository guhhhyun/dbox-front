import React, { useEffect, useState, Fragment } from "react";
import { Async } from "react-async";
import { Route, Redirect } from "react-router-dom";
import { HttpStatus } from "constants/http-constants";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import CodeApi from "apis/code-api";

const RestrictRoute = ({ component: Component, ...rest }) => {
  const path = rest.location.pathname.split("/");
  let useYn = "n";

  return (
    <Fragment>
      <Async
        promiseFn={CodeApi.getCodeMenuList}
        params={{
          uCodeDesc: "2",
        }}
      >
        <Async.Fulfilled>
          {(data) => {
            if (data.status == HttpStatus.OK) {
              data.data.response.forEach((item) => {
                if (item.code.uCodeVal1 == path[path.length - 1]) {
                  useYn = "y";
                }
              });
              return <Route {...rest} render={(props) => (useYn == "y" ? <Component {...props} /> : <Redirect to="/doc" />)} />;
            }
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
    </Fragment>
  );
};
export default RestrictRoute;
