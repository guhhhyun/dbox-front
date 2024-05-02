import React, { Fragment, useState, forwardRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, Checkbox } from "@material-ui/core";

console.debug("PresetTable.js");

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PresetTable = forwardRef(({ checkedRegInputs, setCheckedRegInputs, checkedInputs, setCheckedInputs, result, selectedID, data, onRowSelected }, ref) => {
  const classes = useStyles();

  const [sCount, setSCount] = useState();
  const [tCount, setTCount] = useState();
  const [gCount, setGCount] = useState();
  const [cCount, setCCount] = useState();

  useEffect(() => {
    getRegChecked();
    getChecked();
  }, [result]);

  const getRegChecked = () => {
    if (result) {
      let sCnt = 0;
      let tCnt = 0;
      let gCnt = 0;
      let cCnt = 0;
      result.map((item, index) => {
        switch (item.uSecLevel) {
          case "S":
            sCnt++;
            break;
          case "T":
            tCnt++;
            break;
          case "G":
            gCnt++;
            break;
          case "C":
            cCnt++;
            break;
        }
        if (item.uRegBaseFlag == 1) {
          setCheckedRegInputs([...checkedRegInputs, index]);
        }
      });
      setSCount(sCnt);
      setTCount(tCnt);
      setGCount(gCnt);
      setCCount(cCnt);
    }
  };

  const getChecked = () => {
    let list = new Array();
    if (result) {
      result.map((item, index) => {
        if (item.uSecBaseFlag == "1") {
          list = [...list, index];
        }
      });
      setCheckedInputs(list);
    }
  };

  const changeRegHandler = (uSecLevel, checked, id) => {
    if (checked) {
      let array = "";
      result.map((item, index) => {
        if (item.uSecLevel == uSecLevel) {
          checkedRegInputs.map((i) => {
            if (i == index) {
              array = checkedRegInputs.filter((item) => item !== index);
            }
          });
        }
      });
      setCheckedRegInputs([...array, id]);
    }
    // else {
    //   // 체크 해제
    //   setCheckedRegInputs(checkedRegInputs.filter((item) => item !== id));
    // }
  };

  const changeHandler = (uSecLevel, checked, id) => {
    if (checked) {
      let array = checkedInputs;
      result.map((item, index) => {
        if (item.uSecLevel == uSecLevel) {
          checkedInputs.map((i) => {
            if (i == index) {
              array = checkedInputs.filter((item) => item !== index);
            }
          });
        }
      });
      setCheckedInputs([...array, id]);
    }
    // else {
    //     // 체크 해제
    //     setCheckedInputs(checkedInputs.filter((item) => item !== id));
    // }
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">등급</TableCell>
              <TableCell align="center">등록시기본값</TableCell>
              <TableCell align="center">등급별기본값</TableCell>
              <TableCell align="center">사전 설정명</TableCell>
              <TableCell align="center">설명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              ? result.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      onRowSelected(index, item);
                    }}
                    selected={selectedID === index}
                  >
                    {item.uSecLevel === "S" && item.uConfigType === "D" ? (
                      <TableCell align="center" rowSpan={sCount}>
                        {item.levelName}
                      </TableCell>
                    ) : null}
                    {item.uSecLevel === "T" && item.uConfigType === "D" ? (
                      <TableCell align="center" rowSpan={tCount}>
                        {item.levelName}
                      </TableCell>
                    ) : null}
                    {item.uSecLevel === "G" && item.uConfigType === "D" ? (
                      <TableCell align="center" rowSpan={gCount}>
                        {item.levelName}
                      </TableCell>
                    ) : null}
                    {item.uSecLevel === "C" && item.uConfigType === "D" ? (
                      <TableCell align="center" rowSpan={cCount}>
                        {item.levelName}
                      </TableCell>
                    ) : null}
                    <TableCell align="center">
                      <Checkbox
                        name={index}
                        onChange={(e) => {
                          changeRegHandler(item.uSecLevel, e.currentTarget.checked, index);
                        }}
                        checked={checkedRegInputs.includes(index) ? true : false}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        name={index}
                        onChange={(e) => {
                          changeHandler(item.uSecLevel, e.currentTarget.checked, index);
                        }}
                        checked={checkedInputs.includes(index) ? true : false}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">{item.uConfigName}</TableCell>
                    <TableCell align="center">{item.uConfigType === "D" ? "기본값" : "사용자 설정"}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
});

export default PresetTable;
