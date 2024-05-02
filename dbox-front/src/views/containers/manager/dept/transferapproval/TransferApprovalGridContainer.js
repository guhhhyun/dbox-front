import React, {useEffect, useRef, useState} from "react";
import TransferApprovalGrid from "views/templates/manager/dept/transferapproval/TransferApprovalGrid";
import TransferApprovalApi from "apis/transferapproval-api"
import {Grid, Button, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from "@material-ui/core";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import filesize from "filesize";

export default function TransferApprovalGridContainer({dataToSearchFor}) {

  const gridRef = useRef(null);

  const [rObjectId, setRObjectId] = useState(null);

  const [checked, setChecked] = useState([]);
  const [confirm, setConfirm] = useState({open: false})

  useEffect(() => {
    getTransferApprovals(dataToSearchFor);
  }, [dataToSearchFor])

  useEffect(() => {
    if (rObjectId) {
      getReqData();
    }
  }, [rObjectId])

  const getTransferApprovals = async () => {
    const response = await TransferApprovalApi.getTransferApprovals(dataToSearchFor);
    const rowData = response.data.response;
    const current = gridRef.current;
    if (current) {
      current.api.setRowData(rowData);
    }
  };

  const getReqData = async () => {
    const response = await TransferApprovalApi.getReqData(rObjectId);
    const data = response.data.response;
    console.log('data', data);
    const source = {
      open: true,
      action: "",
      title: "이관 요청 자료",
      maxWidth: "sm",
      children: (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">파일명</TableCell>
                  <TableCell align="center">버전</TableCell>
                  <TableCell align="center">사이즈</TableCell>
                  <TableCell align="center">작성자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="left"
                      onClick={() => {
                        // TODO Handle exception or something.
                        window.WSFileOpen(item.r_object_id, item.r_version_label, item.object_name, "4");
                      }}
                      style={{cursor:"pointer"}}>
                      {item.object_name}
                    </TableCell>
                    <TableCell align="center">{item.r_version_label}</TableCell>
                    <TableCell align="center">{filesize(item.r_content_size)}</TableCell>
                    <TableCell align="center">{item.display_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ),
    }
    setConfirm(Object.assign({}, confirm, source));
  }

  const getConfirm = (action, title, content) => {
    return Object.assign({}, confirm, {open: true, action, title, content});
  }

  const onClickToApprove = () => {
    setConfirm(getConfirm("approval", "[승인]", "선택된 항목을 승인 합니다."));
  }

  const onClickToDisapprove = () => {
    setConfirm(getConfirm("disapproval", "[반려]", "선택된 항목을 반려 합니다."));
  }

  const onClickForAction = async () => {
    const response = await TransferApprovalApi.patchTransferApproval(confirm.action, checked);
    if(response.status === 200) {
      closeConfirm();
    }
  }

  const closeConfirm = () => {
    setConfirm(Object.assign({}, confirm, {open: false}));
  }

  return (
    <>
      <ConfirmDialog {...confirm} onOkClick={onClickForAction} onClose={closeConfirm}/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button disabled={checked.length < 1} onClick={onClickToApprove} variant="contained" color="primary" style={{marginRight: "5px"}}>
            승인
          </Button>
          <Button disabled={checked.length < 1} onClick={onClickToDisapprove} variant="contained" color="primary">
            반려
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TransferApprovalGrid ref={gridRef} setRObjectId={setRObjectId} setChecked={setChecked}/>
        </Grid>
      </Grid>
    </>
  );
}