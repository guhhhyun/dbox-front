import { Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React from "react";
import { Fragment } from "react";

console.debug("CompanyTemplateCreateDialog.js");

export default function CompanyTemplateCreateDialog({ modalParamNum, handleFileChange, handleTemplateNameChange }) {
  if (modalParamNum === "1")
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="3">
                  표준 템플릿 등록(가로)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 구분
                </TableCell>
                <TableCell align="center" colSpan="2">
                  PowerPoint
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 이름
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <TextField variant="outlined" onChange={handleTemplateNameChange}></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  파일
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <Input type="file" accept=".pptx" onChange={handleFileChange}></Input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  else if (modalParamNum === "2") {
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="3">
                  표준 템플릿 등록(세로)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 구분
                </TableCell>
                <TableCell align="center" colSpan="2">
                  PowerPoint
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 이름
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <TextField variant="outlined" onChange={handleTemplateNameChange}></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  파일
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <Input type="file" onChange={handleFileChange}></Input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  } else if (modalParamNum === "3") {
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="3">
                  표준 템플릿 등록
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 구분
                </TableCell>
                <TableCell align="center" colSpan="2">
                  Excel
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 이름
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <TextField variant="outlined" onChange={handleTemplateNameChange}></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  파일
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <Input type="file" onChange={handleFileChange}></Input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  } else if (modalParamNum === "4") {
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="3">
                  표준 템플릿 등록
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 구분
                </TableCell>
                <TableCell align="center" colSpan="2">
                  Word
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  템플릿 이름
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <TextField variant="outlined" onChange={handleTemplateNameChange}></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan="1">
                  파일
                </TableCell>
                <TableCell align="center" colSpan="2">
                  <Input type="file" onChange={handleFileChange}></Input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}
