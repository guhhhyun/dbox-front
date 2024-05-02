import { Fragment, forwardRef } from "react";
import { Typography, TextField, Button, Grid, IconButton, Paper, InputBase } from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import DateFnsUtils from "@date-io/date-fns";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./ManualLock.module.css";

console.debug("RequestLock.js");

//export default function RequestLock({

const RequestLock = forwardRef(
  (
    {
      alertOpened,
      closeAlertModal,
      onAlertDialogOkClick,
      errorMsg,
      lockUserName,
      requestReason,
      lockDate,
      modalOption,
      opened,
      onModalOkClick,
      onModalClose,
      onRequestReasonChanged,
      onLockDateChanged,
      onLockSubmit,
      content,
      openModal,
      openLockModal,
      closeLockModal,
      openedLock,
    },
    ref,
  ) => {
    return (
      <Fragment>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom style={{marginBottom:'20px'}}>
          ※ 요청에 의한 잠금 처리
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onLockSubmit();
          }}
        >
          <AlertDialog open={alertOpened} content={errorMsg} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />

          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                사용자
              </Typography>
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
                <SearchTreeContainer ref={ref} userChk={"Y"} />
              </ConfirmDialog>
              {/* <CompanyTreeModal setCode={setCode} modalOption={modalOption} opened={opened} onModalOkClick={onModalOkClick} onModalClose={onModalClose} /> */}
              <Paper component="form" variant="outlined" onClick={openModal} className={styles.inputGroup}>
                <InputBase value={lockUserName} margin="dense" disabled className={styles.input} />
                <IconButton type="submit" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                요청사유
              </Typography>
              <TextField variant="outlined" margin="normal" fullWidth name="requestReason" value={requestReason} onChange={onRequestReasonChanged} inputProps={{
                      style: {
                        padding: '9px',
                      }
                    }} style={{ marginTop: '8px' }}/>
                    
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                잠금일
              </Typography>
              <TextField
                id="date"
                type="date"
                defaultValue="MM/dd/yyyy"
                margin="dense"
                variant="outlined"
                utils={DateFnsUtils}
                name="lockDate"
                value={lockDate}
                onChange={onLockDateChanged}
                style={{ marginTop: '8px' }}
                    inputProps={{
                      style: {
                        padding: '9px',
                      }
                    }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={openLockModal} color="primary" className={styles.searchBtn}>
                잠금
              </Button>
              <ConfirmDialog open={openedLock} content={content} onOkClick={onLockSubmit} onClose={closeLockModal} maxWidth="sm" fullWidth></ConfirmDialog>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  },
);

export default RequestLock;
