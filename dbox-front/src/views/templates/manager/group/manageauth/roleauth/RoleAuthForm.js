import { Fragment, forwardRef, useImperativeHandle, useRef } from "react";
import { FormControl, InputLabel, Paper, Select, Divider, InputBase, MenuItem, Grid, Button, IconButton, makeStyles, createStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./RoleAuth.module.css";
import RoleAuthGroupGridContainer from "views/containers/manager/group/manageauth/roleauth/RoleAuthGroupGridContainer";
import RoleAuthGroupUserGridContainer from "views/containers/manager/group/manageauth/roleauth/RoleAuthGroupUserGridContainer";
import RoleAuthDialogTreeContainer from "views/containers/manager/group/manageauth/roleauth/RoleAuthDialogTreeContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("RoleAuthForm.js");

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: 1,
    },
    divider: {
      height: 20,
      margin: 14,
    },
  }),
);

const RoleAuthForm = forwardRef(
  (
    {
      handleChange,
      confirmOpened,
      onGridDataClick,
      onGridUserDataClick,
      onConfirmOpen,
      onConfirmClose,
      onConfirmOkClick,
      clickTreeNameId,
      onDeleteClick,
      openConfirmDelete,
      closeConfirmDelete,
      confirmDeleteOpened,
      closeAlertDialog,
      openAlertDialog,
      alertModalOpend,
      roleAuthUserGridData,
      roleAuthGridData,
      onIconClick,
      onSearchChange,
      selectComCode,
      clearOpened,
      closeClearModal,
    },
    ref,
  ) => {
    const leftGridRef = useRef(null);
    const rightGridRef = useRef(null);

    const classes = useStyles();
    const okText = "예";
    const cancelText = "아니오";

    const user = useSelector((state) => state.session.user);
    const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

    useImperativeHandle(ref, () => ({
      leftGrid: leftGridRef.current,
      rightGrid: rightGridRef.current,
    }));

    return (
      <Fragment>
        <FormControl variant="outlined">
          <InputLabel>회사 명</InputLabel>
          {comCode === "DKG" ? (
            <Select margin="dense" name="company" defaultValue={"DKG"} onChange={handleChange} style={{ width: "150px" }}>
              <MenuItem value={"DKG"}>전체</MenuItem>
              <MenuItem value={"DKS"}>동국제강</MenuItem>
              <MenuItem value={"ITG"}>인터지스</MenuItem>
              <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
              <MenuItem value={"FEI"}>페럼인프라</MenuItem>
            </Select>
          ) : comCode != "DKG" ? (
            <Select margin="dense" name="company" defaultValue={comCode} style={{ width: "150px" }}>
              <MenuItem value={comCode}>
                {comCode === "DKS" ? "동국제강" : comCode === "ITG" ? "인터지스" : comCode === "UNC" ? "동국시스템즈" : comCode === "FEI" ? "페럼인프라" : ""}
              </MenuItem>
            </Select>
          ) : null}
        </FormControl>

        <h3>
          <ListAltIcon />
          업무역할자 관리
        </h3>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={styles.gridBox}>
              <RoleAuthGroupGridContainer onGridDataClick={onGridDataClick} comCode={comCode} selectComCode={selectComCode} ref={leftGridRef} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.gridBox}>
              <h4>■ 사용자 정보</h4>
              <Grid container>
                <Grid item xs={6}>
                  <Paper component="form" variant="outlined" className={`${classes.root} ${styles.inputGroup}`}>
                    <h5>사용자</h5>
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase placeholder="사용자 검색" className={styles.input} margin="dense" onChange={onSearchChange} />
                    <IconButton type="button" aria-label="search" size="small" onClick={onIconClick}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ float: "right", display: "flex" }}>
                    <Button disabled={roleAuthGridData.length === 0 ? true : false} variant="contained" color="primary" onClick={onConfirmOpen}>
                      추가
                    </Button>
                    <ConfirmDialog
                      open={confirmOpened}
                      title="업무역할에 추가할 사용자 선택"
                      onOkClick={onConfirmOkClick}
                      onClose={onConfirmClose}
                      maxWidth="sm"
                      fullWidth
                    >
                      <AlertDialog
                        open={alertModalOpend}
                        title="[알림]"
                        content="사용자를 선택해주세요."
                        onOkClick={closeAlertDialog}
                        onClose={closeAlertDialog}
                      />
                      <RoleAuthDialogTreeContainer clickTreeNameId={clickTreeNameId} openAlertDialog={openAlertDialog} roleAuthGridData={roleAuthGridData} />
                    </ConfirmDialog>
                    <Button disabled={roleAuthUserGridData === undefined ? true : false} variant="contained" color="primary" onClick={openConfirmDelete}>
                      삭제
                    </Button>
                    <ConfirmDialog
                      open={confirmDeleteOpened}
                      okText={okText}
                      cancelText={cancelText}
                      title="사용자 삭제"
                      content="선택한 사용자를 그룹에서 삭제하시겠습니까?"
                      onOkClick={onDeleteClick}
                      onClose={closeConfirmDelete}
                      maxWidth="sm"
                      fullWidth
                    ></ConfirmDialog>
                    <ModalDialog
                      open={clearOpened}
                      content="변경사항이 반영되었습니다."
                      okText="닫기"
                      onOkClick={closeClearModal}
                      onClose={closeClearModal}
                      maxWidth="sm"
                      fullWidth
                    ></ModalDialog>
                  </div>
                </Grid>
              </Grid>

              <RoleAuthGroupUserGridContainer onGridUserDataClick={onGridUserDataClick} ref={rightGridRef} />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  },
);
export default RoleAuthForm;
