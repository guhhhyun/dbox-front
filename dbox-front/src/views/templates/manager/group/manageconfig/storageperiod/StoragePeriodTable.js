import { Fragment } from "react";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import ModalDialog from "views/commons/dialog/ModalDialog";
import StoragePeriodListModalContainer from "views/containers/manager/group/manageconfig/storageperiod/StoragePeriodListModalContainer";

console.log("StoragePeriodTable.js");

const theme = createTheme({
  palette: {
    primary: {
      main: "#3e7ff1",
      contrastText: "#fff",
    },
    secondary: {
      main: "#797979",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100px",
  },
  mgr10: {
    marginRight: theme.spacing(1),
  },
}));

export default function StoragePeriodTable({
  recycleValue,
  delEachValue,
  onRecycleSelectChange,
  onDelEachSelectChange,
  updateOpened,
  updateDelOpened,
  clearOpened,
  updateScheduleOpened,
  updateScheduleDelOpened,
  onChangeButtonClick,
  closeUpdateModal,
  closeClearModal,
  onRecycleOkButtonClick,
  recycleSchedule,
  deleteSchedule,
  onRecycleScheduleChange,
  onDeleteScheduleChange,
  closeUpdateDelModal,
  onDelEachOkButtonClick,
  onDelChangeButtonClick,
  onChangeScheduleButtonClick,
  onDelChangeScheduleButtonClick,
  closeUpdateScheduleModal,
  closeUpdateScheduleDelModal,
  onRecycleScheduleOkButtonClick,
  onDelEachScheduleOkButtonClick,
  onListButtonClick,
  closeListModal,
  listOpened,
  paramNumValue,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">구분</TableCell>
              <TableCell align="center" colSpan="2" size="small" padding="none">
                보관 기간
              </TableCell>
              <TableCell align="center" colSpan="2" size="small" padding="none">
                삭제 스케줄
              </TableCell>
              <TableCell align="center">대기List</TableCell>
              <TableCell align="center">폐기 History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">휴지통</TableCell>
              <TableCell align="right">
                <FormControl variant="outlined" className={classes.input}>
                  <Select value={recycleValue != "" ? recycleValue : ""} onChange={onRecycleSelectChange}>
                    <MenuItem value="7">7일</MenuItem>
                    <MenuItem value="14">14일</MenuItem>
                    <MenuItem value="30">30일</MenuItem>
                    <MenuItem value="0">즉시폐기</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="contained" size="small" disableElevation onClick={onChangeButtonClick}>
                    변경
                  </Button>
                  <ConfirmDialog
                    open={updateOpened}
                    title="휴지통 보간 기간"
                    content="선택한 값으로 적용하시겠습니까?"
                    okText="예"
                    cancelText="아니요"
                    onOkClick={onRecycleOkButtonClick}
                    onClose={closeUpdateModal}
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
                </ThemeProvider>
              </TableCell>
              <TableCell align="right">
                <FormControl variant="outlined" className={classes.input}>
                  <Select value={recycleSchedule != "" ? recycleSchedule : ""} onChange={onRecycleScheduleChange}>
                    <MenuItem value="23">매일 23:00</MenuItem>
                    <MenuItem value="00">매일 00:00</MenuItem>
                    <MenuItem value="01">매일 01:00</MenuItem>
                    <MenuItem value="02">매일 02:00</MenuItem>
                    <MenuItem value="03">매일 03:00</MenuItem>
                    <MenuItem value="04">매일 04:00</MenuItem>
                    <MenuItem value="05">매일 05:00</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="contained" size="small" disableElevation onClick={onChangeScheduleButtonClick}>
                    변경
                  </Button>
                  <ConfirmDialog
                    open={updateScheduleOpened}
                    title="휴지통 삭제 스케줄"
                    content="선택한 시간으로 적용하시겠습니까?"
                    okText="예"
                    cancelText="아니요"
                    onOkClick={onRecycleScheduleOkButtonClick}
                    onClose={closeUpdateScheduleModal}
                    maxWidth="sm"
                    fullWidth
                  ></ConfirmDialog>
                </ThemeProvider>
              </TableCell>
              <TableCell align="center">
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={() => {
                      onListButtonClick(1);
                    }}
                  >
                    List
                  </Button>
                  <ModalDialog open={listOpened} okText="닫기" onOkClick={closeListModal} onClose={closeListModal} maxWidth="sm" fullWidth>
                    <StoragePeriodListModalContainer paramNumValue={paramNumValue} />
                  </ModalDialog>
                </ThemeProvider>
              </TableCell>
              <TableCell align="center">
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={() => {
                      onListButtonClick(2);
                    }}
                  >
                    List
                  </Button>
                </ThemeProvider>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">개별폐기</TableCell>
              <TableCell align="right">
                <FormControl variant="outlined" className={classes.input}>
                  <Select value={delEachValue != "" ? delEachValue : ""} onChange={onDelEachSelectChange}>
                    <MenuItem value="7">7일</MenuItem>
                    <MenuItem value="14">14일</MenuItem>
                    <MenuItem value="30">30일</MenuItem>
                    <MenuItem value="0">즉시폐기</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="contained" size="small" disableElevation onClick={onDelChangeButtonClick}>
                    변경
                  </Button>
                  <ConfirmDialog
                    open={updateDelOpened}
                    title="개별폐기 보관 기간"
                    content="선택한 값으로 적용하시겠습니까?"
                    okText="예"
                    cancelText="아니요"
                    onOkClick={onDelEachOkButtonClick}
                    onClose={closeUpdateDelModal}
                    maxWidth="sm"
                    fullWidth
                  ></ConfirmDialog>
                </ThemeProvider>
              </TableCell>
              <TableCell align="right">
                <FormControl variant="outlined" className={classes.input}>
                  <Select value={deleteSchedule != "" ? deleteSchedule : ""} onChange={onDeleteScheduleChange}>
                    <MenuItem value="23">매일 23:00</MenuItem>
                    <MenuItem value="00">매일 00:00</MenuItem>
                    <MenuItem value="01">매일 01:00</MenuItem>
                    <MenuItem value="02">매일 02:00</MenuItem>
                    <MenuItem value="03">매일 03:00</MenuItem>
                    <MenuItem value="04">매일 04:00</MenuItem>
                    <MenuItem value="05">매일 05:00</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="contained" size="small" disableElevation onClick={onDelChangeScheduleButtonClick}>
                    변경
                  </Button>
                  <ConfirmDialog
                    open={updateScheduleDelOpened}
                    title="개별폐기 삭제 스케줄"
                    content="선택한 시간으로 적용하시겠습니까?"
                    okText="예"
                    cancelText="아니요"
                    onOkClick={onDelEachScheduleOkButtonClick}
                    onClose={closeUpdateScheduleDelModal}
                    maxWidth="sm"
                    fullWidth
                  ></ConfirmDialog>
                </ThemeProvider>
              </TableCell>
              <TableCell align="center">
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={() => {
                      onListButtonClick(3);
                    }}
                  >
                    List
                  </Button>
                </ThemeProvider>
              </TableCell>
              <TableCell align="center">
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={() => {
                      onListButtonClick(4);
                    }}
                  >
                    List
                  </Button>
                </ThemeProvider>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">보존연한 만기폐기</TableCell>
              <TableCell align="right">매년 12/31 일괄 폐기</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                <FormControl variant="outlined">
                  <MenuItem value="0">12월 31일 23:00</MenuItem>
                </FormControl>
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="contained" size="small" disabled={true}>
                    변경
                  </Button>
                </ThemeProvider>
              </TableCell>
              <TableCell align="center">
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={() => {
                      onListButtonClick(5);
                    }}
                  >
                    List
                  </Button>
                </ThemeProvider>
              </TableCell>
              <TableCell align="center">
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={() => {
                      onListButtonClick(6);
                    }}
                  >
                    List
                  </Button>
                </ThemeProvider>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
