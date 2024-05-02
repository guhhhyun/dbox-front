import React, { Fragment } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, makeStyles, IconButton, TextField } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.debug("LimitAuthTable.js");

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  textField: {
    width: 70,
  },
});

export default function LimitAuthTable({
  limitData,
  regValue,
  copyValue,
  moveValue,
  delValue,
  transValue,
  sizeValue,
  temRegValue,
  temSizeValue,
  temTermValue,
  handleRegChange,
  handleCopyChange,
  handleMoveChange,
  handleDelChange,
  handleTransChange,
  handleSizeChange,
  handleTemRegChange,
  handleTemSizeChange,
  handleTemTermChange,
  openColumnPcModal,
  openColumnModal,
  closeColumnModal,
  columnPcModal,
  columnModal,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">기능</TableCell>
              {limitData.map((x, index) =>
                x.uCodeVal1 != "SIZE" && x.uCodeVal1 === "REG" ? (
                  <TableCell key={index} align="center">
                    {x.uCodeName}
                    <IconButton type="button" aria-label="search" size="small" onClick={openColumnPcModal}>
                      <HelpOutlineIcon />
                    </IconButton>
                  </TableCell>
                ) : x.uCodeVal1 != "SIZE" && x.uCodeVal1 != "REG" && x.uCodeVal1 != "TEMREG" && x.uCodeVal1 != "TEMSIZE" && x.uCodeVal1 != "TEMTERM" ? (
                  <TableCell key={index} align="center">
                    {x.uCodeName}
                    <IconButton type="button" aria-label="search" size="small" onClick={openColumnModal}>
                      <HelpOutlineIcon />
                    </IconButton>
                  </TableCell>
                ) : x.uCodeVal1 === "TEMREG" ? (
                  <TableCell key={index} align="center">
                    {x.uCodeName}
                  </TableCell>
                ) : null,
              )}
              <ModalDialog open={columnPcModal} title="PC자료 등록" onOkClick={closeColumnModal} onClose={closeColumnModal} maxWidth="sm" fullWidth>
                <Typography gutterBottom>설정할 수 있는 최대 처리량 </Typography>
                <Typography gutterBottom> - 파일 수 : ~1,000 </Typography>
                <Typography gutterBottom> - 총 용량 : ~10GB </Typography>
              </ModalDialog>
              <ModalDialog open={columnModal} title="복사/이동/삭제/자료이관" onOkClick={closeColumnModal} onClose={closeColumnModal} maxWidth="sm" fullWidth>
                <Typography gutterBottom>설정할 수 있는 최대 처리량 : ~ 1,000</Typography>
                <Typography gutterBottom>※ 최대 처리량이 넘을 경우, 일 단위 Schedule에 의해 처리됩니다.</Typography>
              </ModalDialog>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">제한 값</TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={regValue}
                  onChange={handleRegChange}
                  error={regValue === "" || regValue > 1000 || regValue < 0 ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                개
              </TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={copyValue}
                  onChange={handleCopyChange}
                  error={copyValue === "" || copyValue > 1000 || copyValue < 0 ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                개
              </TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={moveValue}
                  onChange={handleMoveChange}
                  error={moveValue === "" || moveValue > 1000 || moveValue < 0 ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                개
              </TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={delValue}
                  onChange={handleDelChange}
                  error={delValue === "" || delValue > 1000 || delValue < 0 ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                개
              </TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={transValue}
                  onChange={handleTransChange}
                  error={transValue === "" || transValue > 1000 || transValue < 0 ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                개
              </TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={temRegValue}
                  onChange={handleTemRegChange}
                  error={temRegValue === "" || temRegValue > 200 || temRegValue < 0 ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                개
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">제한 용량</TableCell>

              <TableCell align="center">
                최대
                <TextField
                  value={sizeValue}
                  error={sizeValue === "" || sizeValue > 10 ? true : false}
                  onChange={handleSizeChange}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                GB
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={temSizeValue}
                  error={temSizeValue === "" || temSizeValue > 1000 || temSizeValue < 0 ? true : false}
                  onChange={handleTemSizeChange}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                MB
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">제한 용량</TableCell>

              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                최대
                <TextField
                  value={temTermValue}
                  error={temTermValue === "" || temTermValue > 14 || temTermValue < 0 ? true : false}
                  onChange={handleTemTermChange}
                  className={classes.textField}
                  variant="outlined"
                  margin="dense"
                ></TextField>
                일
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
