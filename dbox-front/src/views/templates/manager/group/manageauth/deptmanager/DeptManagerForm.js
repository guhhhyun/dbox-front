import {useState} from "react";
import {Grid} from "@material-ui/core";
import DeptManagerSearchFormContainer from "views/containers/manager/group/manageauth/deptmanager/DeptManagerSearchFormContainer";
import DeptManagerGridContainer from "views/containers/manager/group/manageauth/deptmanager/DeptManagerGridContainer";
import DividerWith from "views/commons/divider/DividerWith";
import ListAltIcon from "@material-ui/icons/ListAlt";

export default function DeptManagerForm() {

  const [dataToSearchFor, setDataToSearchFor] = useState({});

  const style = {
    iconWrap: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }

  return (
    // TODO Exrpot style.
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item>
        <div style={style.iconWrap}>
          <ListAltIcon />
          <h4 style={{ margin:"5px"}}>부서문서관리자 관리</h4>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid item>
          <DeptManagerSearchFormContainer setDataToSearchFor={setDataToSearchFor} />
        </Grid>
        <DividerWith />
        <Grid item>
          <DeptManagerGridContainer dataToSearchFor={dataToSearchFor} />
        </Grid>
      </Grid>
    </Grid>
  );
}
