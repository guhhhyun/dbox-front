import { Fragment, forwardRef } from "react";
import UnusualWarningStandardContainer from "views/containers/manager/group/unusual/unusualstandard/UnusualWarningStandardContainer";
import UnusualStandardEditContainer from "views/containers/manager/group/unusual/unusualstandard/UnusualStandardEditContainer";

console.debug("UnusualStandardForm.js");

export default function UnusualStandardForm({ comCode, companyName }) {
  return (
    <Fragment>
      <UnusualWarningStandardContainer comCode={comCode} companyName={companyName} />
      <UnusualStandardEditContainer comCode={comCode} companyName={companyName} />
    </Fragment>
  );
}
