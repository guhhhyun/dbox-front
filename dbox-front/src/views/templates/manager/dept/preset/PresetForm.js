import { Fragment, useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tabs,
  Tab,
  Typography,
  Box,
  withStyles,
  Checkbox,
  TextField,
} from "@material-ui/core";
import { Grid, IconButton, Button, Select, MenuItem } from "@material-ui/core";
import PresetTableContainer from "views/containers/manager/dept/preset/PresetTableContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import SearchTreeContainer from "views/containers/manager/common/SearchTreeContainer";
import styles from "./Preset.module.css";
import background from "assets/imgs/tab_w200.svg";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Close } from "@material-ui/icons";

console.debug("PresetForm.js");

/**
 Styling - Tab Button
 */
const StyledTab = withStyles((theme) => ({
  root: {
    paddingTop: "20px",
    zIndex: "1",
    color: "#ffffff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    "&.Mui-selected > span": {
      opacity: 1,
      color: "#00254c",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

/**
 Styling - Selected Tab
 */
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    backgroundColor: "transparent",
    minHeight: "50px",
    paddingTop: "10px",
    "& > span": {
      maxWidth: "100%",
      width: "100%",
      background: `url(${background}) -12px -7px`,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Typography component="div">{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    width: 500,
  },
});

const PresetForm = forwardRef(
  (
    {
      showResults,
      onRegister,
      getDetailData,
      alertOpened,
      closeAlertModal,
      onAlertDialogOkClick,
      opened,
      onModalOkClick,
      onModalClose,
      modalOption,
      result,
      configType,
      configName,
      openFlag,
      setOpenFlag,
      liveRead,
      setLiveRead,
      liveDelete,
      setLiveDelete,
      closedRead,
      setClosedRead,
      handleClick,
      liveReadList,
      liveDeleteList,
      closedReadList,
      secLevel,
      setSecLevel,
      pcRegFlag,
      onChange,
      copyFlag,
      editSaveFlag,
      mailPermitFlag,
      preserveFlag,
      setPreserveFlag,
      onConfigName,
      onClose,
      onSave,
      onSaveDetail,
      preserveList,
      changeItem,
      content,
      preserveResult,
    },
    ref,
  ) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [option, setOption] = useState(false);

    /**
     * 체크박스
     */
    const changeHandler = (checked, value, id) => {
      if (checked) {
        switch (value) {
          case "S":
            setPreserveFlag(preserveResult.u_sec_s_year);
            break;
          case "T":
            setPreserveFlag(preserveResult.u_sec_t_year);
            break;
          case "C":
            setPreserveFlag(preserveResult.u_sec_c_year);
            break;
          case "G":
            setPreserveFlag(preserveResult.u_sec_g_year);
            break;
          default:
            break;
        }
        setSecLevel(value);
      } else {
        setSecLevel();
      }
    };

    const changeCheck = (checked, value, id) => {
      if (checked) {
        setOpenFlag(value);
      } else {
        setOpenFlag();
      }
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const access = () => {
      if (result) {
        result[0].userPresetRepeatings.map((item) => {
          if (item.uLiveReadAuthor) {
            liveReadList = [
              ...liveReadList,
              { id: item.uLiveReadAuthor, name: item.uLiveReadAuthorName, type: item.uLiveReadAuthor.substring(0, 2) === "g_" ? "GROUP" : "USER" },
            ];
            setLiveRead(liveReadList);
          }

          if (item.uLiveDeleteAuthor) {
            liveDeleteList = [
              ...liveDeleteList,
              { id: item.uLiveDeleteAuthor, name: item.uLiveDeleteAuthorName, type: item.uLiveDeleteAuthor.substring(0, 2) === "g_" ? "GROUP" : "USER" },
            ];
            setLiveDelete(liveDeleteList);
          }

          if (item.uClosedReadAuthor) {
            closedReadList = [
              ...closedReadList,
              { id: item.uClosedReadAuthor, name: item.uClosedReadAuthorName, type: item.uClosedReadAuthor.substring(0, 2) === "g_" ? "GROUP" : "USER" },
            ];
            setClosedRead(closedReadList);
          }
        });
      }
    };

    useEffect(() => {
      access();
      if (configType === "D") {
        setOption(true);
      } else {
        setOption(false);
      }
    }, [result, configType]);

    return (
      <Fragment>
        <AlertDialog open={alertOpened} content={content} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />
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
          <SearchTreeContainer option={"M"} ref={ref} />
        </ConfirmDialog>
        {/* <AlertDialog open={alertModal} content={saveTitle} onOkClick={closeModalSave} /> */}
        <div className={styles.tabContainer}>
          <StyledTabs value={value} onChange={handleChange} className={styles.tabButton}>
            <StyledTab label="사전 설정 (Preset)" />
          </StyledTabs>
          <div className={styles.tabContents}>
            <TabPanel value={value} index={0}>
              <Box className={styles.action}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <h3>
                      <ListAltIcon />
                      문서 등록/수정/공유
                    </h3>
                    <Button variant="contained" onClick={onRegister} color="primary">
                      추가
                    </Button>
                    <Button variant="contained" onClick={onSave} color="primary">
                      저장
                    </Button>
                    <PresetTableContainer getDetailData={getDetailData} ref={ref} />
                  </Grid>
                  {showResults ? (
                    <Grid item xs={6}>
                      {/* {showResults ? <PresetDetailContainer result={result} liveRead={liveRead} setLiveRead={setLiveRead} /> : null} */}
                      <h4>■ 사전 설정명 :</h4>
                      {configType === "C" ? (
                        <Fragment>
                          <TextField variant="outlined" size="small" value={configName} onChange={onConfigName} />
                          <Button variant="contained" onClick={onSaveDetail} color="primary">
                            저장
                          </Button>
                        </Fragment>
                      ) : (
                        configName
                      )}
                      <h4>■ PC 문서 등록</h4>- Live 권한 설정 :
                      <Checkbox
                        value={"0"}
                        onChange={(e) => {
                          changeCheck(e.currentTarget.checked, e.currentTarget.value);
                        }}
                        checked={openFlag === "0" ? true : false}
                        color="primary"
                        disabled={option}
                      />
                      비공개
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">사용자 접근권한</TableCell>
                              <TableCell align="center">접근자</TableCell>
                              <TableCell align="center">작업</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="center" component="th" scope="row">
                                조회/다운로드
                              </TableCell>
                              <TableCell align="center">
                                {liveRead
                                  ? liveRead.map((item) => (
                                      <span>
                                        {item.name}
                                        <IconButton
                                          onClick={(e) => {
                                            onClose("R", item.id);
                                          }}
                                          disabled={option}
                                        >
                                          <Close />
                                        </IconButton>
                                        <br />
                                      </span>
                                    ))
                                  : null}
                              </TableCell>
                              <TableCell align="center">
                                <a
                                  onClick={(e) => {
                                    handleClick("R", e);
                                  }}
                                >
                                  {configType === "C" ? "[수정]" : null}
                                </a>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center" component="th" scope="row">
                                조회/다운로드/편집/삭제
                              </TableCell>
                              <TableCell align="center">
                                {liveDelete
                                  ? liveDelete.map((item) => (
                                      <span>
                                        {item.name}
                                        <IconButton
                                          onClick={(e) => {
                                            onClose("D", item.id);
                                          }}
                                          disabled={option}
                                        >
                                          <Close />
                                        </IconButton>
                                        <br />
                                      </span>
                                    ))
                                  : null}
                              </TableCell>
                              <TableCell align="center">
                                <a
                                  onClick={(e) => {
                                    handleClick("D", e);
                                  }}
                                >
                                  {configType === "C" ? "[수정]" : null}
                                </a>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      - Closed 권한 설정 보존연한 :
                      <Select margin="dense" name="preservePeriod" value={preserveFlag} onChange={changeItem} style={{ width: "100px" }}>
                        {preserveList.map((item) => (
                          <MenuItem value={item.uCodeVal1}>{item.uCodeName1}</MenuItem>
                        ))}
                      </Select>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableBody>
                            <TableRow>
                              <TableCell align="center" component="th" scope="row" rowSpan="2">
                                보안 등급
                              </TableCell>
                              <TableCell align="center">제한</TableCell>
                              <TableCell align="center">팀내</TableCell>
                              <TableCell align="center">사내</TableCell>
                              <TableCell align="center">그룹사내</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">
                                <Checkbox
                                  value="S"
                                  onChange={(e) => {
                                    changeHandler(e.currentTarget.checked, e.currentTarget.value, "check");
                                  }}
                                  checked={secLevel === "S" ? true : false}
                                  color="primary"
                                  disabled={option}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox
                                  value="T"
                                  onChange={(e) => {
                                    changeHandler(e.currentTarget.checked, e.currentTarget.value, "check");
                                  }}
                                  checked={secLevel === "T" ? true : false}
                                  color="primary"
                                  disabled={option}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox
                                  value="C"
                                  onChange={(e) => {
                                    changeHandler(e.currentTarget.checked, e.currentTarget.value, "check");
                                  }}
                                  checked={secLevel === "C" ? true : false}
                                  color="primary"
                                  disabled={option}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Checkbox
                                  value="G"
                                  onChange={(e) => {
                                    changeHandler(e.currentTarget.checked, e.currentTarget.value, "check");
                                  }}
                                  checked={secLevel === "G" ? true : false}
                                  color="primary"
                                  disabled={option}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">사용자 접근권한</TableCell>
                              <TableCell align="center">접근자</TableCell>
                              <TableCell align="center">작업</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="center">조회/다운로드</TableCell>
                              <TableCell align="center">
                                {closedRead
                                  ? closedRead.map((item) => (
                                      <span>
                                        {item.name}
                                        <IconButton
                                          onClick={(e) => {
                                            onClose("C", item.id);
                                          }}
                                          disabled={option}
                                        >
                                          <Close />
                                        </IconButton>
                                        <br />
                                      </span>
                                    ))
                                  : null}
                              </TableCell>
                              <TableCell align="center">
                                <a
                                  onClick={(e) => {
                                    handleClick("C", e);
                                  }}
                                >
                                  {configType === "C" ? "[수정]" : null}
                                </a>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      ■ PC 문서 등록 (D'Box에 동일 파일 존재 시)
                      <RadioGroup
                        row
                        value={pcRegFlag}
                        onChange={(e) => {
                          onChange("P", e);
                        }}
                      >
                        <FormControlLabel value="C" label="복사본" control={<Radio color="primary" />} disabled={option} />
                        <FormControlLabel value="V" label="자동 버전업" control={<Radio color="primary" />} disabled={option} />
                        <FormControlLabel value="S" label="건너뛰기" control={<Radio color="primary" />} disabled={option} />
                      </RadioGroup>
                      <hr />■ D'Box 내 문서 복사 (동일 부서인 경우에만 적용)
                      <RadioGroup
                        row
                        value={copyFlag}
                        onChange={(e) => {
                          onChange("C", e);
                        }}
                      >
                        <FormControlLabel value="K" label="원본의 권한 유지" control={<Radio color="primary" />} disabled={option} />
                        <FormControlLabel value="P" label="등급별 기본 Preset으로 변경" control={<Radio color="primary" />} disabled={option} />
                      </RadioGroup>
                      <hr />■ 문서 수정 후 저장 :
                      <RadioGroup
                        row
                        value={editSaveFlag}
                        onChange={(e) => {
                          onChange("E", e);
                        }}
                      >
                        <FormControlLabel value="V" label="자동 버전업" control={<Radio color="primary" />} disabled={option} />
                        <FormControlLabel value="U" label="직전 수정자가 다를 경우에만 버전업" control={<Radio color="primary" />} disabled={option} />
                        <FormControlLabel value="O" label="덮어쓰기" control={<Radio color="primary" />} disabled={option} />
                      </RadioGroup>
                      <hr />■ 메일에 Link File로 첨부 시, 자동 권한 부여 :
                      <RadioGroup
                        row
                        value={mailPermitFlag}
                        onChange={(e) => {
                          onChange("M", e);
                        }}
                      >
                        <FormControlLabel value="Y" label="적용" control={<Radio color="primary" />} disabled={option} />
                        <FormControlLabel value="N" label="적용하지 않음" control={<Radio color="primary" />} disabled={option} />
                      </RadioGroup>
                      ※ 본 설정은 신규로 등록되는 문서에 대해서 적용되며, 각 문서 속성에서 수정이 가능합니다. ※ 제한 등급의 문서에 대해서는 적용되지 않습니다.
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
            </TabPanel>
          </div>
        </div>
      </Fragment>
    );
  },
);

export default PresetForm;
