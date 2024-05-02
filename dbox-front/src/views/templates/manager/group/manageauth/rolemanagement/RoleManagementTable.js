import React, { Fragment } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, Radio } from "@material-ui/core";
console.debug("RoleManagementTable.js");

/**
 * Table 설정
 */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function RoleManagementTable({
  roleTableData,
  tableValue,
  companyHandleChange,
  deptHandleChange,
  auditHandleChange,
  companyCheckValue,
  deptCheckValue,
  auditCheckValue,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      {tableValue === "G" ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">업무역할</TableCell>
                <TableCell align="center">설정값</TableCell>
                <TableCell align="center">접근범위</TableCell>
                <TableCell align="center">부서한</TableCell>
                <TableCell align="center">제한</TableCell>
                <TableCell align="center">팀내</TableCell>
                <TableCell align="center">사내</TableCell>
                <TableCell align="center">그룹사내</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roleTableData.map((role, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{role.uAuthDesc}</TableCell>
                  <TableCell align="center">
                    <Radio
                      onChange={role.uAuthScope === "C" ? companyHandleChange : role.uAuthScope === "D" ? deptHandleChange : deptHandleChange}
                      value={role.uAuthScope + role.uSelected}
                      checked={
                        role.uOptionVal != " " && role.uAuthScope === "C"
                          ? companyCheckValue === role.uAuthScope + role.uSelected
                          : role.uOptionVal != " " && role.uAuthScope === "D"
                          ? deptCheckValue === role.uAuthScope + role.uSelected
                          : true
                      }
                      disabled={role.uOptionVal === " " ? true : false}
                    ></Radio>
                  </TableCell>
                  <TableCell align="center">
                    {role.uAuthScope === "G" ? "그룹" : role.uAuthScope === "C" ? "전사" : role.uAuthScope === "D" ? "조직" : ""}
                  </TableCell>
                  <TableCell align="center">{role.uAuthL}</TableCell>
                  <TableCell align="center">{role.uAuthS}</TableCell>
                  <TableCell align="center">{role.uAuthT}</TableCell>
                  <TableCell align="center">{role.uAuthC}</TableCell>
                  <TableCell align="center">{role.uAuthG}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : tableValue === "P" ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">업무역할</TableCell>
                <TableCell align="center">설정값</TableCell>
                <TableCell align="center">접근범위</TableCell>
                <TableCell align="center">부서한</TableCell>
                <TableCell align="center">제한</TableCell>
                <TableCell align="center">팀내</TableCell>
                <TableCell align="center">사내</TableCell>
                <TableCell align="center">그룹사내</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roleTableData.map((role, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{role.uAuthDesc}</TableCell>
                  <TableCell align="center">
                    <Radio
                      onChange={
                        role.uAuthScope === "C"
                          ? companyHandleChange
                          : role.uAuthScope === "D"
                          ? deptHandleChange
                          : role.uAuthScope === "G"
                          ? auditHandleChange
                          : auditHandleChange
                      }
                      value={role.uAuthScope + role.uSelected}
                      checked={
                        role.uOptionVal != " " && role.uAuthScope === "C"
                          ? companyCheckValue === role.uAuthScope + role.uSelected
                          : role.uOptionVal != " " && role.uAuthScope === "D"
                          ? deptCheckValue === role.uAuthScope + role.uSelected
                          : role.uOptionVal != " " && role.uAuthScope === "G"
                          ? auditCheckValue === role.uAuthScope + role.uSelected
                          : true
                      }
                      disabled={role.uOptionVal === " " ? true : false}
                    ></Radio>{" "}
                  </TableCell>
                  <TableCell align="center">
                    {role.uAuthScope === "G" ? "그룹" : role.uAuthScope === "C" ? "전사" : role.uAuthScope === "D" ? "조직" : ""}
                  </TableCell>
                  <TableCell align="center">{role.uAuthL}</TableCell>
                  <TableCell align="center">{role.uAuthS}</TableCell>
                  <TableCell align="center">{role.uAuthT}</TableCell>
                  <TableCell align="center">{role.uAuthC}</TableCell>
                  <TableCell align="center">{role.uAuthG}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </Fragment>
  );
}
