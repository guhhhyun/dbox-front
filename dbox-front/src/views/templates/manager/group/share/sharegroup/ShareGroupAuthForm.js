import { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { FormControl, Box, Typography, Divider, InputLabel, Select, MenuItem, Grid, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ListAlt, NavigateNext } from "@material-ui/icons";
import ShareGroupAuthGridContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthGridContainer";
import ShareGroupAuthDeptGridContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthDeptGridContainer";
import ShareGroupAuthSearchButtonContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthSearchButtonContainer";
import ShareGroupAuthLeftModalButtonContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthLeftModalButtonContainer";
import ShareGroupAuthRightModalButtonContainer from "views/containers/manager/group/share/sharegroup/ShareGroupAuthRightModalButtonContainer";
import styles from "./ShareGroupAuth.module.css";

console.log("ShareGroupAuthForm.js");

const StyledFormControl = withStyles((theme) => ({
  root: {
    width: '150px',
    marginRight: theme.spacing(1)
  },
}))(FormControl);

const StyledSelect = withStyles((theme) => ({
  root: {
    padding: "7.5px",
  },
}))(Select);

const StyledInputLabel = withStyles((theme) => ({
  outlined: {
        transform: "translate(14px, 9px) scale(1)",
      },
}))(InputLabel);


const ShareGroupAuthForm = forwardRef(
  ({ shareGroupGridData, deptGridData, clickGridData, clickDeptGridData, onInputTextData, handleChange, leftGridgetData, rightGridgetData }, ref) => {
    const leftGridRef = useRef(null);
    const rightGridRef = useRef(null);

    const user = useSelector((state) => state.session.user);
    const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

    useImperativeHandle(ref, () => ({
      leftGrid: leftGridRef.current,
      rightGrid: rightGridRef.current,
    }));

    return (
      <Fragment>
        <Typography variant="h3" gutterBottom className={styles.h3}>
          <ListAlt /> 조직 공유 그룹 설정
        </Typography>
        <Divider></Divider>
        <Box pt={4} pb={4}>
          <Grid container>
            <Grid item xs={6}>
              <StyledFormControl variant="outlined">
                <StyledInputLabel>회사 명</StyledInputLabel>
                {comCode === "DKG" ? (
                  <StyledSelect margin="dense" name="company" defaultValue={"ALL"} onChange={handleChange} style={{ width: "150px" }}>
                    <MenuItem value={"ALL"}>전체</MenuItem>
                    <MenuItem value={"DKS"}>동국제강</MenuItem>
                    <MenuItem value={"ITG"}>인터지스</MenuItem>
                    <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
                    <MenuItem value={"FEI"}>페럼인프라</MenuItem>
                  </StyledSelect>
                ) : comCode != "DKG" ? (
                  <StyledSelect margin="dense" name="company" defaultValue={comCode} style={{ width: "150px" }}>
                    <MenuItem value={comCode}>
                      {comCode === "DKS"
                        ? "동국제강"
                        : comCode === "ITG"
                        ? "인터지스"
                        : comCode === "UNC"
                        ? "동국시스템즈"
                        : comCode === "FEI"
                        ? "페럼인프라"
                        : ""}
                    </MenuItem>
                  </StyledSelect>
                ) : null}
              </StyledFormControl>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4}>
                <ShareGroupAuthSearchButtonContainer onInputTextData={onInputTextData} />
              </Grid>
              <Grid item xs={8}>
                <ShareGroupAuthLeftModalButtonContainer
                  comCode={comCode}
                  shareGroupGridData={shareGroupGridData}
                  leftGridgetData={leftGridgetData}
                  rightGridgetData={rightGridgetData}
                  onResetGridData={clickGridData}
                />
                </Grid>
            </Grid>
            <div className={styles.gridBox}>
              <ShareGroupAuthGridContainer comCode={comCode} onGridDataClick={clickGridData} ref={leftGridRef} />
            </div>
          </Grid>
          <Grid item className={styles.next}>
            <NavigateNext/>
          </Grid>
          <Grid item className={styles.shareGroup}>
            <ShareGroupAuthRightModalButtonContainer
              shareGroupGridData={shareGroupGridData}
              deptGridData={deptGridData}
              leftGridgetData={leftGridgetData}
              rightGridgetData={rightGridgetData}
              clickDeptGridData={clickDeptGridData}
            />
            <div className={styles.gridBox}>
              <div className={styles.gridBox02}>
                <ShareGroupAuthDeptGridContainer onGridDataClick={clickDeptGridData} ref={rightGridRef} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  },
);
export default ShareGroupAuthForm;
