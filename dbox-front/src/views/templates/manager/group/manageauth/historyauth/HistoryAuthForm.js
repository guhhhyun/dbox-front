import { Fragment, useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Paper, Divider, InputBase, Grid, Button, IconButton, makeStyles, createStyles } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./HistoryAuth.module.css";
import HistoryAuthGridContainer from "views/containers/manager/group/manageauth/historyauth/HistoryAuthGridContainer";
import AddUserGridContainer from "views/containers/manager/group/manageauth/historyauth/AddUserGridContainer";
import HistoryAuthModalButtonContainer from "views/containers/manager/group/manageauth/historyauth/HistoryAuthModalButtonContainer";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import AlertDialog from "views/commons/dialog/AlertDialog";
console.debug("HistoryAuthForm.js");

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

const HistoryAuthForm = forwardRef(
  (
    {
      comCode,
      companyName,
      getUserData,
      onSearchChange,
      onClick,
      modalOption,
      opened,
      openModal,
      onModalOkClick,
      onModalClose,
      content,
      openedDelete,
      onDeleteModalOkClick,
      openDeleteModal,
      closeDeleteModal,
      alertOpened,
      alertContent,
      closeAlertModal,
      onAlertDialogOkClick,
      setCheckedDeleteList,
      setAddUser,
    },
    ref,
  ) => {
    const leftGridRef = useRef(null);
    const rightGridRef = useRef(null);
    const classes = useStyles();
    const [checkedList, setCheckedList] = useState("");
    const [list, setList] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [dataChk, setDataChk] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
      setAddUser(userInfo);
    }, [userInfo]);

    setCheckedDeleteList(checkedList);

    useImperativeHandle(ref, () => ({
      leftGrid: leftGridRef.current,
      rightGrid: rightGridRef.current,
    }));

    return (
      <Fragment>
        <AlertDialog open={alertOpened} content={alertContent} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />
        <h3>
          <ListAltIcon />
          이력 조회 권한 관리
        </h3>
        <Grid container spacing={2}>
          <Grid item>{companyName}</Grid>
          {/* <CompanyButtonContainer /> */}
        </Grid>
        {/* <div className={styles.gridBox}>
        <HistoryAuthTableContainer />
      </div> */}
        <HistoryAuthModalButtonContainer list={list} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <HistoryAuthGridContainer setShow={setShow} setList={setList} getUserData={getUserData} setDataChk={setDataChk} ref={leftGridRef} />
          </Grid>
          <Grid item xs={6}>
            {show ? (
              <Fragment>
                <h4>■ 추가 사용자 정보</h4>
                <Grid container>
                  <Grid item xs={6}>
                    <Paper component="form" variant="outlined" className={`${classes.root} ${styles.inputGroup}`}>
                      <h5>사용자</h5>
                      <Divider className={classes.divider} orientation="vertical" />
                      <InputBase placeholder="사용자 검색" className={styles.input} margin="dense" onChange={onSearchChange} />
                      <IconButton type="button" aria-label="search" size="small" onClick={onClick}>
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ float: "right", display: "flex" }}>
                      <Button disabled={dataChk === true ? false : true} variant="contained" color="primary" onClick={openModal}>
                        추가
                      </Button>
                      <ConfirmDialog
                        open={opened}
                        title={modalOption.title}
                        okText={modalOption.okText}
                        cancelText={modalOption.cancelText}
                        onOkClick={onModalOkClick}
                        onClose={onModalClose}
                        maxWidth="sm"
                        fullWidth
                      >
                        <SearchTreeContainer setUserInfo={setUserInfo} userChk={"Y"} comChk={comCode} />
                      </ConfirmDialog>
                      <ConfirmDialog
                        open={openedDelete}
                        content={content}
                        onOkClick={onDeleteModalOkClick}
                        onClose={closeDeleteModal}
                        maxWidth="sm"
                        fullWidth
                      ></ConfirmDialog>
                      <Button disabled={dataChk === true ? false : true} variant="contained" color="primary" onClick={openDeleteModal}>
                        삭제
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <AddUserGridContainer ref={rightGridRef} setCheckedList={setCheckedList} />
              </Fragment>
            ) : null}
          </Grid>
        </Grid>
      </Fragment>
    );
  },
);
export default HistoryAuthForm;
