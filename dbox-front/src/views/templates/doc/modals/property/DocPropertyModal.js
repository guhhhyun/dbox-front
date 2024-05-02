import { Fragment } from "react";
import { Checkbox, Divider, FormControlLabel, TextField, Typography, Box, makeStyles, Button } from "@material-ui/core";
import LiveAuthTable from "views/templates/doc/modals/property/LiveAuthTable";
import AuthGradeTable from "views/templates/doc/modals/property/AuthGradeTable";
import CloseAuthTable from "views/templates/doc/modals/property/CloseAuthTable";
import StyledTabs from "views/commons/tab/StyledTabs";
import StyledTab from "views/commons/tab/StyledTab";
import TabPanel from "views/commons/tab/TabPanel";
import PreservePopperButtonContainer from "views/containers/doc/modals/property/PreservePopperButtonContainer";
import styles from "./DocPropertyModal.module.css";

console.debug("DocPropertyModal.js");

const useStyles = makeStyles((theme) => ({
  group: {
    display: "flex",
    verticalAlign: "middle",
    justifyContent: "space-between",
  },
  title: {
    lineHeight: 2,
    marginRight: theme.spacing(10),
    color: "#00254C",
    fontSize: "13px",
  },
  caption: {
    display: "inline-block",
    marginLeft: theme.spacing(30),
    lineHeight: 2.5,
    textAlign: "right",
  },
  input: {
    backgroundColor: "#ffffff",
    fontSize: "13px",
    borderRadius: "2px",
    height: "30px",
  },
  divider: {
    margin: "14px 0px",
  },
  btnDocRoot: {
    padding: "4px",
    textAlign: "left",
    fontSize: "0.775rem",
  },
  mgb10: {
    marginBottom: theme.spacing(1),
  },
  pd2: {
    padding: "2px",
  },
}));

export default function DocPropertyModal({ tab, onTabChange, property, onPropertyChange, onSecLevelChange, onAuthClick }) {
  const classes = useStyles();

  return (
    <Fragment>
      <StyledTabs value={tab} onChange={onTabChange} className={styles.tabButton}>
        <StyledTab label="일반" />
        <Typography variant="caption" color="secondary" className={classes.caption}>
          {" "}
          문서상태 : {property.docStatusName}
        </Typography>
      </StyledTabs>
      <Box className={styles.tabContents}>
        <TabPanel value={tab} index={0}>
          <Box className={classes.group}>
            <Typography variant="subtitle2" color="primary" className={classes.title}>
              이름
            </Typography>
            <TextField
              variant="outlined"
              InputProps={{ className: classes.input }}
              style={{ flex: 1 }}
              value={property.objectName}
              onChange={onPropertyChange}
              name="objectName"
            ></TextField>
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Box className={`${classes.group} ${classes.mgb10}`}>
              <Typography variant="subtitle2" className={classes.title}>
                Live 권한 설정
              </Typography>
              <FormControlLabel
                label="비공개"
                control={
                  <Checkbox
                    color="primary"
                    checked={property.notOpenFlag}
                    size="small"
                    className={classes.pd2}
                    onChange={onPropertyChange}
                    name="notOpenFlag"
                  />
                }
                style={{ marginRight: "0px" }}
              />
            </Box>
            <LiveAuthTable liveAuthBases={property.liveAuthBases} onAuthClick={onAuthClick} onChange={onPropertyChange} />
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Box className={classes.group}>
              <Typography variant="subtitle2" className={classes.title}>
                Closed 권한 설정
              </Typography>
              <PreservePopperButtonContainer
                preserve={property.uPreserverFlag}
                regDate={property.uRegDate}
                closedDate={property.uClosedDate}
                expiredDate={property.uExpiredDate}
                onChange={onPropertyChange}
              />
            </Box>
            <Box style={{ marginBottom: "6px" }}>
              <Typography variant="overline">보안등급</Typography>
              <AuthGradeTable secLevel={property.uSecLevel} onSecLevelChange={onSecLevelChange} />
            </Box>
            <Box>
              <CloseAuthTable closedAuthBases={property.closedAuthBases} onAuthClick={onAuthClick} onChange={onPropertyChange} />
            </Box>
            <Box>
              <FormControlLabel
                label="메일자동권한부여"
                control={<Checkbox color="primary" checked={property.uAutoAuthMailFlag} size="small" onChange={onPropertyChange} name="uAutoAuthMailFlag" />}
              />
              <FormControlLabel
                label="개인정보포함여부"
                control={<Checkbox color="primary" checked={property.uPrivacyFlag} size="small" onChange={onPropertyChange} name="uPrivacyFlag" />}
              />
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Typography variant="subtitle2" className={classes.title}>
              원본문서
            </Typography>
            <Button className={classes.btnDocRoot}>
              {property.copyOrgDetail ? `${property.copyOrgDetail?.uFolderPath}/${property.copyOrgDetail?.objectName}` : "-"}
            </Button>
          </Box>
        </TabPanel>
      </Box>
    </Fragment>
  );
}
