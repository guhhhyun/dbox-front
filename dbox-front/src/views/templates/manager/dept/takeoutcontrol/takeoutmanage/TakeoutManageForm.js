import { Fragment, forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Button, Paper, makeStyles, Checkbox, TextField } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import TakeoutModalDialog from "./TakeoutModalDialog";

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

console.debug("TakeoutManageForm.js");

const TakeoutManageForm = forwardRef(
  (
    {
      result,
      type,
      onRegister,
      openedConfirm,
      opened,
      alertOpened,
      content,
      onAlertDialogOkClick,
      onOkConfirm,
      onCloseConfirm,
      onModalOkClick,
      closeConfirmModal,
      deleteOption,
      setDeleteOption,
      autoApprYn,
      setAutoApprYn,
      freePassYn,
      setFreePassYn,
      autoName,
      freeName,
      deleteDays,
      onDeleteDays,
      onAutoName,
      onFreeName,
      onUpdate,
      openedModal,
      updateTakeoutModal,
      deleteTakeoutModal,
      closeTakeoutModal,
      autoConfirmOpened,
      setAutoConfirmOpened,
      isAutoAgreed,
      isValidAuto1,
      setIsValidAuto1,
      isValidAuto2,
      setIsValidAuto2,
      onAutoConfirm,
      onAutoCloseConfirm,
    },
    ref,
  ) => {
    const classes = useStyles();
    const user = useSelector((state) => state.session.user);
    const today = new Date();
    const todayStr = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + ". ";

    const modalOption = {
      title: "항목 추가",
      okText: "추가",
      cancelText: "취소",
    };

    const modalTakeoutOption = {
      title: "항목 수정",
      updateText: "수정",
      deleteText: "삭제",
      cancelText: "취소",
    };

    const autoOption = {
      title: "자동승인 동의서",
      okText: "동의",
      cancelText: "미동의",
      placeholder01: "동일한 법적 책임이 따르며",
      placeholder02: "책임은 승인권자에게",
    };

    const checkHandler = ({ target }) => {
      if (target.checked) {
        setDeleteOption(target.value);
      }
    };
    /**
     * 체크박스
     */
    const changeHandler = ({ target }, param) => {
      if (target.checked) {
        if (param === "A") {
          if (!isAutoAgreed) {
            setAutoConfirmOpened(true);
          } else {
            setAutoApprYn("Y");
          }
        } else {
          setFreePassYn("Y");
        }
      } else {
        param === "A" ? setAutoApprYn("N") : setFreePassYn("N");
      }
    };

    const handleChange = ({ target }) => {
      let { name, value } = target;
      let v = value;
      if (name === "autoPass1") {
        if (autoOption.placeholder01 === v) {
          setIsValidAuto1(true);
        } else {
          setIsValidAuto1(false);
        }
      } else if (name === "autoPass2") {
        if (autoOption.placeholder02 === v) {
          setIsValidAuto2(true);
        } else {
          setIsValidAuto2(false);
        }
      } else {
      }
    };

    return (
      <Fragment>
        <AlertDialog open={alertOpened} content={content} onOkClick={onAlertDialogOkClick} />
        <ConfirmDialog open={openedConfirm} okText={"네"} cancelText={"아니요"} onOkClick={onOkConfirm} onClose={onCloseConfirm} maxWidth="sm" fullWidth>
          저장하시겠습니까?
        </ConfirmDialog>
        <ConfirmDialog
          open={autoConfirmOpened}
          title={autoOption.title}
          okText={autoOption.okText}
          cancelText={autoOption.cancelText}
          onOkClick={onAutoConfirm}
          onClose={onAutoCloseConfirm}
          maxWidth="sm"
          fullWidth
        >
          자동승인도 사전승인과 [
          <TextField
            placeholder={autoOption.placeholder01}
            name="autoPass1"
            onChange={handleChange}
            variant="outlined"
            style={{ display: "inline", width: 70, marginTop: "10px" }}
            inputProps={{ style: { color: isValidAuto1 ? "" : "red" } }}
          />
          ]에게 있으며 프리패스,
          <br />
          반출로 인한 [
          <TextField
            placeholder={autoOption.placeholder02}
            name="autoPass2"
            onChange={handleChange}
            variant="outlined"
            style={{ display: "inline", width: 100, marginTop: "10px" }}
            inputProps={{ style: { color: isValidAuto2 ? "" : "red" } }}
          />
          ]에게 있습니다. <br />
          <div className={classes.agreeAlign}>
            {todayStr} 동의자: {user.orgNm}팀 {user.displayName} {user.titleName}
          </div>
        </ConfirmDialog>
        <ConfirmDialog
          open={opened}
          title={(type === "A" ? "『자동승인』 " : "『프리패스』 ") + modalOption.title}
          okText={modalOption.okText}
          cancelText={modalOption.cancelText}
          onOkClick={onModalOkClick}
          onClose={closeConfirmModal}
          maxWidth="sm"
          fullWidth
        >
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "500px", marginTop: "8px" }}
            autoFocus
            onChange={type === "A" ? onAutoName : onFreeName}
          />
        </ConfirmDialog>
        <TakeoutModalDialog
          open={openedModal}
          title={(type === "A" ? "『자동승인』 " : "『프리패스』 ") + modalTakeoutOption.title}
          updateText={modalTakeoutOption.updateText}
          deleteText={modalTakeoutOption.deleteText}
          cancelText={modalTakeoutOption.cancelText}
          onUpdate={updateTakeoutModal}
          onDelete={deleteTakeoutModal}
          onClose={closeTakeoutModal}
          maxWidth="sm"
          fullWidth
        >
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "500px", marginTop: "8px" }}
            value={type === "A" ? autoName : freeName}
            autoFocus
            onChange={type === "A" ? onAutoName : onFreeName}
          />
        </TakeoutModalDialog>
        <h3>
          <ListAltIcon />
          복호화 반출 승인 설정
        </h3>
        <Grid container>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={(e) => {
                onRegister("C");
              }}
              color="primary"
            >
              저장
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h4>■ 사용유무</h4>
          </Grid>
          <Grid item xs={4}>
            <Checkbox checked={true} color="primary" disabled={true} />
            사전승인
            <Checkbox
              value="Y"
              onChange={(e) => {
                changeHandler(e, "A");
              }}
              checked={autoApprYn === "Y" ? true : false}
              color="primary"
            />
            자동승인
            <Checkbox
              value="Y"
              onChange={(e) => {
                changeHandler(e, "F");
              }}
              checked={freePassYn === "Y" ? true : false}
              color="primary"
            />
            프리패스
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h4>■ 반출함 자료삭제 기간</h4>
          </Grid>
          <Grid item xs={4}>
            <Checkbox value="M" onChange={(e) => checkHandler(e)} checked={deleteOption === "M" ? true : false} color="primary" />
            메일발송 후 삭제
            <Checkbox value="D" onChange={(e) => checkHandler(e)} checked={deleteOption === "D" ? true : false} color="primary" />
            {deleteOption === "D" ? (
              <TextField variant="outlined" value={deleteDays} margin="normal" style={{ width: "30px", marginTop: "8px" }} onChange={onDeleteDays} />
            ) : (
              result.uDeleteDays
            )}{" "}
            일 후
            <Checkbox value="U" onChange={(e) => checkHandler(e)} checked={deleteOption === "U" ? true : false} color="primary" />
            삭제안함
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={8} style={{ textAlign: "right", marginTop: "10px", marginBottom: "10px" }}>
            <Button
              variant="contained"
              onClick={(e) => {
                onRegister("A");
              }}
              color="primary"
            >
              추가
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h4>■ 자동승인 목록</h4>
          </Grid>
          <Grid item xs={4}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">사유</TableCell>
                    <TableCell align="center">등록자</TableCell>
                    <TableCell align="center">등록일</TableCell>
                    <TableCell align="center">편집</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result
                    ? result.takeoutConfigRepeatings.map((item, index) =>
                        item.uAutoName !== null ? (
                          <TableRow>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{item.uAutoName}</TableCell>
                            <TableCell align="center">{item.uAutoRegisterName}</TableCell>
                            <TableCell align="center">{item.uAutoRegistDate}</TableCell>
                            <TableCell align="center">
                              <p
                                onClick={(e) => {
                                  onUpdate("A", index, item.uAutoName);
                                }}
                              >
                                [편집]
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : null,
                      )
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8} style={{ textAlign: "right", marginTop: "10px", marginBottom: "10px" }}>
            <Button
              variant="contained"
              onClick={(e) => {
                onRegister("F");
              }}
              color="primary"
            >
              추가
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h4>■ 프리패스 목록</h4>
          </Grid>
          <Grid item xs={4}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">사유</TableCell>
                    <TableCell align="center">등록자</TableCell>
                    <TableCell align="center">등록일</TableCell>
                    <TableCell align="center">편집</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result
                    ? result?.takeoutConfigRepeatings.map((item, index) =>
                        item.uFreeName !== null ? (
                          <TableRow>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{item.uFreeName}</TableCell>
                            <TableCell align="center">{item.uFreeRegisterName}</TableCell>
                            <TableCell align="center">{item.uFreeRegistDate}</TableCell>
                            <TableCell align="center">
                              <p
                                onClick={(e) => {
                                  onUpdate("F", index, item.uFreeName);
                                }}
                              >
                                [편집]
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : null,
                      )
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Fragment>
    );
  },
);

export default TakeoutManageForm;
