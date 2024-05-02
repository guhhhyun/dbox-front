import {forwardRef} from "react";
import {Grid} from "@material-ui/core";

import LockedDataSearchFormContainer from "views/containers/manager/group/manageconfig/lockeddata/LockedDataSearchFormContainer";
import LockedDataGridContainer from "views/containers/manager/group/manageconfig/lockeddata/LockedDataGridContainer";

const LockedDataForm = forwardRef(({onSearchCompany, getData}, ref) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <LockedDataSearchFormContainer onSearchCompany={onSearchCompany} />
      </Grid>
      <Grid item xs={12}>
        <LockedDataGridContainer ref={ref} />
      </Grid>
    </Grid>
  );
});

export default LockedDataForm;

