import { Fragment, useState, forwardRef, useEffect } from "react";
import { Select, MenuItem, FormControl, Box, Grid, Divider, Typography } from "@material-ui/core";
import UnusualStatsSearchFormContainer from "views/containers/manager/group/unusual/unusualstats/UnusualStatsSearchFormContainer";
import UnusualStatsGridContainer from "views/containers/manager/group/unusual/unusualstats/UnusualStatsGridContainer";
import { ListAlt, Label } from "@material-ui/icons";
import styles from "./UnusualStats.module.css";

console.debug("UnusualStatsForm.js");

const UnusualStatsForm = forwardRef(({ onSearch, comCode, onSearchData, getSearchData, handleChange, state, searchKeyword, list }, ref) => {
  const [searchDate, setSearchDate] = useState("");
  const [lastDate, setLastDate] = useState("A");

  let date = new Date();
  const defaultData = date.getFullYear() + "-" + (date.getMonth() + 1);

  useEffect(() => {
    setSearchDate(list);
    if (state.lastDate) {
      setLastDate(state.lastDate);
    } else {
      setLastDate(searchKeyword.endDate);
    }
  }, [list, state.lastDate, searchKeyword.endDate]);

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
        <ListAlt /> 특이 사용 이력
      </Typography>
      <Divider></Divider>
      <Box pt={4}>
        <UnusualStatsSearchFormContainer
          onSearch={onSearch}
          onSearchData={onSearchData}
          getSearchData={getSearchData}
          comCode={comCode}
          defaultData={defaultData}
        />
        <Box className={styles.action}>
          <FormControl variant="outlined" variant="outlined">
              <Select margin="dense" name="lastDate" value={lastDate || defaultData} onChange={handleChange}>
                {lastDate != null ? (
                  Object.values(searchDate).map((item) => <MenuItem value={item.date}>{item.date}</MenuItem>)
                ) : (
                  <MenuItem value={defaultData}>{defaultData}</MenuItem>
                )}
              </Select>
          </FormControl>
        </Box>
        <Box pt={4}>
          <Typography  variant="h4" gutterBottom className={styles.h4}>
            <Label color="primary"/> 특이 사용 이력
          </Typography>
          <UnusualStatsGridContainer comCode={comCode} ref={ref} />
        </Box>
      </Box>
    </Fragment>
  );
});

export default UnusualStatsForm;
