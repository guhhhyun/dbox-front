import React, {useEffect, useRef, useState} from "react";
import {Grid, Button, Typography} from "@material-ui/core";
import DeptTransferGrid from "views/templates/manager/group/transfer/dept/DeptTransferGrid";
import DeptTransferDetailGrid from "views/templates/manager/group/transfer/dept/DeptTransferDetailGrid";
import DeptTransferApi from "apis/depttransfer-api";
import DeptTransferSearchFormContainer from "./DeptTransferSearchFormContainer";
import AlertDialog from "views/commons/dialog/AlertDialog";
import styles from "views/templates/manager/group/transfer/dept/DeptTransfer.module.css";
import {Label} from "@material-ui/icons";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

export default function DeptTransferContainer() {

  const gridRef = useRef(null);
  const detailRef = useRef(null);

  const [row, setRow] = useState({ data: {} });
  const [opened, setOpened] = useState(false);

  const [checked, setChecked] = useState([]);

  const [alert, setAlert] = useState({ open: false });
  const [confirm, setConfirm] = useState({
    open: false,
    title: "이관 취소",
    okText: "확인",
    cancelText: "취소"
  });

  useEffect(() => {
    getDeptTransfers();
  }, []);

  useEffect(() => {
    setDeptTransfersRequested();
  }, [row]);

  useEffect(() => {
    const canRefresh = alert.action === "insertTransfer" && !alert.open;
    if(canRefresh) {
      getDeptTransfers();
    }
  }, [alert]);

  const setRowData = (ref, data) => {
    const current = ref.current;
    if (current) {
      current.api.setRowData(data);
    }
  }

  const getDeptTransfers = async () => {
    const response = await DeptTransferApi.getDeptTransfers();
    if(response.status === 200) {
      const data = response.data.response;
      setRowData(gridRef, data);
      gridRef.current.api.forEachNode(item => {
        if(item.data.r_object_id === row.data.r_object_id) {
          item.setSelected(true);
          return false;
        }
      })
    }
  };

  const setDeptTransfersRequested = async () => {
    const uDeptCode = row.data.u_dept_code;
    const response = await DeptTransferApi.getDeptTransfersRequested(uDeptCode);
    if(response.status === 200) {
      const data = response.data.response;
      setRowData(detailRef, data);
    }
  };

  const canOpenModalToTransfer = () => {
    const rowData = row.data;
    const isNotSelected = Object.keys(rowData).length < 1;
    if(isNotSelected) {
      setAlert({ open: true, content: "이관 부서를 선택해 주세요." });
      return;
    }
    const isNoDataToTransfer = rowData.content_count < 1
    if(isNoDataToTransfer) {
      setAlert({ open: true, content: `${rowData.u_send_dept_name} 부서는 이관 할 문서가 없습니다.` });
      return;
    }
    setOpened(true);
  }

  const canOpenModalToRestore = () => {
    console.log("canOpenModalToTransfer")
  }

  const onClickDeleteDeptTransfersRequested = () => {
    if (checked.length < 1) {
      setAlert({open: true, content: "이관 취소 할 부서를 선택해 주세요."});
      return;
    }
    setConfirm(Object.assign({}, confirm, {open: true, content: "이관을 취소합니다."}));
  }

  const deleteDeptTransfersRequested = async () => {
    const response = await DeptTransferApi.deleteDeptTransfersRequested(checked);
    if(response.status === 200) {

    }
    closeConfirm();
    await getDeptTransfers();
  }

  const closeAlert = () => {
    setAlert(Object.assign({}, alert, { open: false }));
  }

  const closeConfirm = () => {
    setConfirm(Object.assign({}, confirm, { open: false }));
  }

  return (
    <>
      <ConfirmDialog {...confirm} onOkClick={deleteDeptTransfersRequested} onClose={closeConfirm} />
      <AlertDialog {...alert} title="[알림]" onOkClick={closeAlert} />
      <DeptTransferSearchFormContainer row={row} opened={opened} setOpened={setOpened} setAlert={setAlert} />
      <Grid container direction="row" alignItems="center" spacing={5}>
        <Grid item xs={6}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Typography gutterBottom className={styles.h4}>
                <Label color="primary"/> 장기 미이관 List
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={canOpenModalToTransfer} style={{marginRight: "10px"}}>
                수신부서 설정
              </Button>
              <Button variant="contained" color="primary" onClick={canOpenModalToRestore}>
                복원
              </Button>
            </Grid>
          </Grid>
          <DeptTransferGrid ref={gridRef} setRow={setRow} />
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onClickDeleteDeptTransfersRequested}>
                이관 취소
              </Button>
            </Grid>
          </Grid>
          <DeptTransferDetailGrid
            ref={detailRef}
            setChecked={setChecked}
          />
        </Grid>
      </Grid>
    </>
  );
}