import { Fragment } from "react";
import { Grid, Typography, Divider, Box } from "@material-ui/core";
import SelectCompanyContainer from "views/containers/manager/common/SelectCompanyContainer";
import SelectStopwordContainer from "views/containers/manager/group/share/searchblind/SelectStopwordContainer";
import StopwordGridContainer from "views/containers/manager/group/share/searchblind/StopwordGridContainer";
import StopwordListContainer from "views/containers/manager/group/share/searchblind/StopwordListContainer";
import SearchExclusionDeptGridContainer from "views/containers/manager/group/share/searchblind/SearchExclusionDeptGridContainer";
import { ListAlt, Label } from "@material-ui/icons";
import styles from "./SearchBlind.module.css";

console.debug("SearchBlindForm.js");

export default function SearchBlindForm() {
  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
        <ListAlt /> 검색 블라인드 관리
      </Typography>
      <Divider></Divider>
      <Box pt={4} pb={4}>
        <SelectCompanyContainer />
      </Box>
      <Box pb={4}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom className={styles.h4}>
              <Label color="primary"/> 검색 제외 단어(불용어)
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <SelectStopwordContainer />
          </Grid>
          <Grid item xs={12}>
            <StopwordGridContainer />
          </Grid>
          <Grid item xs={12}>
            <StopwordListContainer />
          </Grid> 
        </Grid>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom className={styles.h4}>
              <Label color="primary"/> 검색 제외 부서
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SearchExclusionDeptGridContainer />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
