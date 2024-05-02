import React, {useRef, useState} from "react";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import DeptTransferSearchTreeContainer from "views/containers/manager/group/transfer/dept/DeptTransferSearchTreeContainer";
import {Grid, Typography} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeptTransferDialogTree from "./DeptTransferDialogTree";
import DeptTransferApi from "apis/depttransfer-api";
import fileSize from "filesize";

function ConfirmContent(item) {
  return (
    <>
      <Typography align="center">
        <strong>{item.deptNameToSend}</strong> 의 [부서함을] <strong>{item.deptNameToReceive}</strong> 으로 이관합니다.
      </Typography>
      <Typography align="center">
        폴더 {item.folderCount} 건, 문서 {item.contentCount} 건, 용량 {item.contentSize}
      </Typography>
    </>
  )
}

export default function DeptTransferSearchForm(
  {
      row
    , opened
    , setOpened
    , setAlert
  }) {

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [confirm, setConfirm] = useState({
    open: false,
    title: "장기 미이관자료 이관",
    okText: "확인",
    cancelText: "취소"
  });

  const childRef = useRef(null);

  const modalOption = {
    title: "장기 미이관 문서 수선 설정",
    okText: "확인",
    cancelText: "취소",
  };

  const alert = (content, action, callback) => {
    setAlert({open: true, content, action, callback})
    return false;
  }

  const onModalClose = () => setOpened(false);

  const getRObjectIds = () => {
    const isDept = (item) => item.length > 3;
    const deptCode = (item) => item.split("_")[0];
    return checkedKeys.filter(isDept).map(deptCode);
  }

  const onModalOkClick = async () => {
    const selectedDept = childRef.current.getValue();
    const deptCode = selectedDept.orgId;
    const rObjectIds = getRObjectIds();
    if (!deptCode) {
      return alert("수신부서를 선택해 주세요.");
    }
    if (deptCode.length === 3) {
      return alert("회사는 수신부서로 선택 될 수 없습니다.");
    }
    if (checkedKeys.length < 1) {
      return alert("이관 할 폴더를 선택해 주세요.");
    }
    if (rObjectIds.length < 1) {
      return alert("이관 할 폴더를 확인해 주세요.");
    }
    confirmDataToTransfer(rObjectIds)
  };

  const sourceToConfirmData = (data) => {
    const selectedDept = childRef.current.getValue();
    return {
      open: true,
      children: ConfirmContent({
        deptNameToSend: row.data.u_send_dept_name,
        deptNameToReceive: selectedDept.orgNm,
        folderCount: checkedKeys.length,
        contentCount: data.r_content_count,
        contentSize: fileSize(data.r_content_size)
      })
    };
  }

  const setConfirmDataToTransfer = (response) => {
    if(response.status === 200) {
      const data = response.data.response;
      const source = sourceToConfirmData(data);
      setConfirm(Object.assign({}, confirm, source));
    }
  }

  const confirmDataToTransfer = (rObjectIds) => {
    DeptTransferApi.selectAggregateDataToTransfer(rObjectIds).then(setConfirmDataToTransfer);
  }

  const insertDeptTransfer = async () => {
    const rowData = row.data;
    const selectedDept = childRef.current.getValue();
    const rObjectIds = getRObjectIds();
    const params = {
      rObjectId: rowData.r_object_id,
      uSendDeptCode: rowData.u_dept_code,
      uRecvDeptCode: selectedDept.orgId,
      uSendCabinetCode: rowData.u_cabinet_code,
      uRecvCabinetCode: selectedDept.uCabinetCode,
      // uSendFolId: rowData.u_send_fol_id,
      // uRecvFolId: rowData.u_recv_fol_id,
      uSendFolIds: rObjectIds,
      uTransReqId: rObjectIds
    }
    const response = await DeptTransferApi.insertTransfer(params);
    if(response) {
      // TODO is Ok
    }
    closeConfirm(onModalClose);
    alert("추가되었습니다.", "insertTransfer");
  }
  
  const closeConfirm = (callback) => {
    setConfirm(Object.assign({}, confirm, { open: false }));
    if(typeof callback === "function") {
      callback();
    }
  }

  // temporary
  const style = {
    grid: { height: "500px", overflowY: "auto" },
    icon: { fontSize: 100, color: "#19457a" }
  }

  return (
    <>
      <ConfirmDialog {...confirm} onOkClick={insertDeptTransfer} onClose={closeConfirm} />
      <ConfirmDialog
        open={opened}
        title={modalOption.title}
        okText={modalOption.okText}
        cancelText={modalOption.cancelText}
        onOkClick={onModalOkClick}
        onClose={onModalClose}
        maxWidth="md"
        fullWidth>
        <Grid container>
          <Grid item xs={5} style={style.grid}>
            <Typography variant="subtitle2" gutterBottom>송신부서 - {row.data.u_send_dept_name}</Typography>
            <DeptTransferDialogTree row={row} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
          </Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={2}>
            <NavigateNextIcon style={style.icon}/>
          </Grid>
          <Grid item xs={5} style={style.grid}>
            <Typography variant="subtitle2" gutterBottom>수신부서</Typography>
            <DeptTransferSearchTreeContainer ref={childRef} setAlert={setAlert} />
          </Grid>
        </Grid>
      </ConfirmDialog>
    </>
  );
};

