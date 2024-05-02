import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { Tabs , Tab,Typography,Box,Grid, Button} from '@material-ui/core';
import AuthorityTable from "./AuthorityTable";
import styles from "./AuthorityHistory.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="동국제강" />
        <Tab label="인터지스" />
        <Tab label="동국시스템즈" />
        <Tab label="페럼인프라" />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container>
            <Grid item xs={12} className={styles.action}>
              <Button variant="contained" color="primary" className={styles.btnRight} disableElevation>
                  설정 저장
              </Button>
            </Grid>
            <Grid item xs={12}>
              <AuthorityTable />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container>
            <Grid item xs={12} className={styles.action}>
              <Button variant="contained" color="primary" className={styles.btnRight} disableElevation>
                  설정 저장
              </Button>
            </Grid>
            <Grid item xs={12}>
              <AuthorityTable />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container>
            <Grid item xs={12} className={styles.action}>
              <Button variant="contained" color="primary" className={styles.btnRight} disableElevation>
                  설정 저장
              </Button>
            </Grid>
            <Grid item xs={12}>
              <AuthorityTable />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Grid container>
            <Grid item xs={12} className={styles.action}>
              <Button variant="contained" color="primary" className={styles.btnRight} disableElevation>
                  설정 저장
              </Button>
            </Grid>
            <Grid item xs={12}>
                <AuthorityTable />
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}