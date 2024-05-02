import { Fragment } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TopHeaderContainer from "views/containers/header/TopHeaderContainer";
import HistorySampleContainer from "views/containers/history/sample/HistorySampleContainer";
import HistoryLayout from "views/templates/history/layout/HistoryLayout";
import HistoryMain from "views/templates/history/layout/HistoryMain";
import HistoryAttachFormContainer from "views/containers/history/etc/HistoryAttachFormContainer";
import HistoryDeleteFormContainer from "views/containers/history/etc/HistoryDeleteFormContainer";
import historydocdistribution from  "views/containers/history/doc/HistoryDocDistributionFormContainer";

console.debug("HistoryLayoutContainer.js");

export default function HistoryLayoutContainer() {
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
 
  // 로그인 여부 확인 (미인증 시 로그인 화면으로)
  if (!user) history.replace("/login");

  return (
    <Fragment>
      <TopHeaderContainer />
      <HistoryLayout>
        <HistoryMain>
          <Switch>
            <Route path="/history/sample"             component={HistorySampleContainer} />

            
            <Route path="/history/etc/historydocdistribution"   component={historydocdistribution} />
            <Route path="/history/etc/historyattach"            component={HistoryAttachFormContainer} />
            <Route path="/history/etc/historydelete"            component={HistoryDeleteFormContainer} />
          </Switch>
        </HistoryMain>
      </HistoryLayout>
    </Fragment>
  );
}
