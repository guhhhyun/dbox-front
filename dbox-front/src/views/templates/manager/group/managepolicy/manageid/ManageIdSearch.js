import React, { Fragment, forwardRef } from "react";
import { Typography, Grid, IconButton, Paper, InputBase, TextField, Button } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./ManageIdSearch.module.css";
import ManageIdTreeContainer from "views/containers/manager/group/managepolicy/manageid/ManageIdTreeContainer";

console.debug("ManageIdSearch.js");

export default function ManageIdSearch({
  confirmOpened,
  onOkClickTreeModal,
  onConfirmOpen,
  onConfirmClose,
  onClickTreeDeptData,
  onClickTreeUserData,
  onClickTreeCompanyData,
  onSearchClick,
  treeDeptData,
  treeUserData,
  treeCompanyData,
  alertModalOpend,
  closeAlertDialog,
  comCode,
}) {
  return (
    <Fragment>
      <Grid container className={styles.searchBox} spacing={2}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom style={{ marginBottom: "14px" }}>
            회사
          </Typography>

          <Paper component="form" variant="outlined" className={styles.inputGroup}>
            <InputBase
              value={
                comCode === "DKG"
                  ? treeCompanyData != ""
                    ? treeCompanyData.orgNm
                    : treeUserData === "" && treeDeptData === ""
                    ? ""
                    : treeUserData != ""
                    ? treeUserData.comOrgId === "DKS"
                      ? "동국제강"
                      : treeUserData.comOrgId === "ITG"
                      ? "인터지스"
                      : treeUserData.comOrgId === "UNC"
                      ? "동국시스템즈"
                      : treeUserData.comOrgId === "FEI"
                      ? "페럼인프라"
                      : ""
                    : treeDeptData != ""
                    ? treeDeptData.comOrgId === "DKS"
                      ? "동국제강"
                      : treeDeptData.comOrgId === "ITG"
                      ? "인터지스"
                      : treeDeptData.comOrgId === "UNC"
                      ? "동국시스템즈"
                      : treeDeptData.comOrgId === "FEI"
                      ? "페럼인프라"
                      : ""
                    : ""
                  : comCode === "DKS"
                  ? "동국제강"
                  : comCode === "ITG"
                  ? "인터지스"
                  : comCode === "UNC"
                  ? "동국시스템즈"
                  : comCode === "FEI"
                  ? "페럼인프라"
                  : ""
              }
              className={styles.input}
              margin="dense"
              disabled
            />
          </Paper>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom>
            부서
          </Typography>
          <Paper component="form" variant="outlined" className={styles.inputGroup}>
            <InputBase
              placeholder="전체"
              value={
                treeUserData === "" && treeDeptData === ""
                  ? "전체"
                  : treeUserData === ""
                  ? treeDeptData.orgNm
                  : treeDeptData === ""
                  ? treeUserData.orgNm
                  : "전체"
              }
              className={styles.input}
              margin="dense"
              disabled
            />
          </Paper>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom>
            사용자
          </Typography>
          <Paper component="form" variant="outlined" className={styles.inputGroup}>
            <InputBase
              placeholder="전체"
              value={treeUserData === "" && treeDeptData === "" ? "전체" : treeDeptData === "" ? treeUserData.displayName : "전체"}
              className={styles.input}
              margin="dense"
              disabled
            />
            <IconButton type="button" aria-label="search" size="small" onClick={onConfirmOpen}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <div className={styles.searchBtn}>
          <Button variant="contained" color="primary" onClick={onSearchClick}>
            검색
          </Button>
          <ConfirmDialog
            open={confirmOpened}
            title="검색할 부서 또는 사용자 선택"
            onOkClick={onOkClickTreeModal}
            onClose={onConfirmClose}
            maxWidth="sm"
            fullWidth
          >
            <AlertDialog
              open={alertModalOpend}
              title="[알림]"
              content="부서 또는 사용자를 선택해주세요."
              onOkClick={closeAlertDialog}
              onClose={closeAlertDialog}
            />
            <ManageIdTreeContainer
              onClickTreeDeptData={onClickTreeDeptData}
              onClickTreeUserData={onClickTreeUserData}
              onClickTreeCompanyData={onClickTreeCompanyData}
            />
          </ConfirmDialog>
        </div>
      </Grid>
    </Fragment>
  );
}
