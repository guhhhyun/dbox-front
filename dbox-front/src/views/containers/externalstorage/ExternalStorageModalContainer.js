import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import ExternalStorageModal from "views/templates/externalstorage/ExternalStorageModal";
import DeptApi from "apis/dept-api";
import UseUsbApi from "apis/use-usb-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AlertDialog from "views/commons/dialog/AlertDialog";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";

const ExternalStorageModalContainer = forwardRef(function ({ }, ref) {
  
  const [alertModalOpend, setAlertModalOpend] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  const [confirmOpened, setConfirmOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState(0);
  const user = useSelector((state) => state.session.user);
  const defaultData = {
  };

  const defaultParam1 = {
    uAllowUsb: false,
    uAllowCd: false,
    uUseTime: "1",
    uReqReason: ""
  };
  
  const defaultParam2 = {
    uReqReason: "",
    uRejectReason: "",
    rObjectIds:[]
  };

  const [data, setData] = useState(defaultData);
  const [approveData, setApproveData] = useState([]);
  const [managerPerId, setManagerPerId] = useState("");
  
  const [reqstName, setReqstName] = useState("");
  const [apprvName, setApprvName] = useState("");

  const [params1, setParams1] = useState(defaultParam1);
  const [params2, setParams2] = useState(defaultParam2);

  useImperativeHandle(ref, () => ({
    openModal,
  }));
  
  useEffect(async () => {
      const response = await DeptApi.getDeptOne({
        params: {
          deptId: user.orgId
        }
      });
    setManagerPerId(response.data.response.managerPerId);
  }, [user]);
  
  useEffect(async () => {
    if ( managerPerId ) {
      retrieveUseUssb();
    }
  }, [managerPerId]);

  const retrieveUseUssb = async ()=> {
    const response = await UseUsbApi.getUseUsb({
      params: {userIds:[user.userId,managerPerId]}
    });
    setApproveData(response?.approveList);
    let reqs = response?.users.find((item)=>item.userId === user.userId);
    let aprs = response?.users.find((item)=>item.userId === managerPerId);
    setReqstName((reqs?.displayName||"") + " " + ( reqs?.pstnName||""));
    setApprvName((aprs?.displayName||"") + " " + ( aprs?.pstnName||""));
  }
  
  useEffect(async () => {
    if ( tab === 1 ) {
      retrieveUseUssb();
      // console.log("tab",tab);
    }
}, [tab]);

  /**
   * 외부저장매체 승인 요청
   */
   const requestUseUsb = async () => {
      if (!params1.uReqReason) {
        // debugger;
        setAlertTitle("승인요청 사유를 입력하세요.");
        setAlertModalOpend(true);
        return;
      }
    
    Promise.all(
      [1].map(
        async (resolve) => {
            const response =  UseUsbApi.reqUseUsb({
              params: params1
            });
        }
      )
    ).then(() => {
      // setDocId(null);
      setAlertTitle("외부저장매체 승인요청 처리 되었습니다.");
      setAlertModalOpend(true);
      setParams1(defaultParam1);
    });
  };

  /**
   * 외부저장매체 승인 
   */
   const approveUseUsb = async () => {
    // debugger;
      // if (!params2.uReqReason) {
      //   // debugger;
      //   setAlertTitle("승인요청 사유를 입력하세요.");
      //   setAlertModalOpend(true);
      //   return;
      // }
      if (params2.rObjectIds.length > 0 ) {
      UseUsbApi.approveAllUseUsb({
        params: params2
      }).then(() => {
      setAlertTitle("외부저장매체 승인 처리 되었습니다.");
      setAlertModalOpend(true);
      setParams2(defaultParam2);
      retrieveUseUssb();
    });
  } else {
    setAlertTitle("승인처리 항목을 선택해주세요.");
    setAlertModalOpend(true);
  }

  };

  /**
   * 외부저장매체 반려 
   */
   const rejectUseUsb = async () => {
    // debugger;
      if (!params2.uRejectReason) {
        // debugger;
        setAlertTitle("반려 사유를 입력하세요.");
        setAlertModalOpend(true);
        return;
      }
    if (params2.rObjectIds.length > 0 ) {
      UseUsbApi.rejectAllUseUsb({
        params: params2
      }).then((data) => {
        // if ( data.fail > 0 && data.success > 0 )
        setAlertTitle("외부저장매체 반려 처리 되었습니다.");
        setAlertModalOpend(true);
        setConfirmOpened(false);
        setParams2(defaultParam2);
        retrieveUseUssb();
      });
    } else {
      setAlertTitle("반려처리 항목을 선택해주세요.");
      setAlertModalOpend(true);
    }
  };

  /**
   * 모달 열기
   */
  const openModal = () => {
    setOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 탭 전환
   */
  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = ({ target }) => {
    let {type, name, value, checked } = target;
    let v = type === "checkbox" ? checked : value;
    console.log("handleChange", name, type, value, checked);
    setParams1({ ...params1, [name]: v });
  };

  const handleChange2 = ({ target }) => {
    let {type, name, value, checked } = target;
    let v = type === "checkbox" ? checked : value;
    console.log("handleChange", name, type, value, checked);
    setParams2({ ...params2, [name]: v });
  };

  const handleChangeForCheckbox = ({ target }) => {
    let {type, name, value, checked,index } = target;
    let v = type === "checkbox" ? checked : value;
    
    setApproveData(approveData.map((item,index2)=>{
      if ( index === index2 ) item.checked = checked;
      return item;
    }));

    
    // console.log("handleChange", name, type, value, checked);
    // setParams1({ ...params1, [name]: v });
  };
  
  useEffect(() => {
    let rObjectIds = [];
    approveData.forEach((item,index2)=>{
      if ( item.checked ) rObjectIds.push(item.rObjectId);
    });
    setParams2({...params2,rObjectIds})
}, [approveData]);

  const handleAllChecked = ({ target }) => {
    let {type, name, value, checked,index } = target;
    let v = type === "checkbox" ? checked : value;
    setApproveData(approveData.map((item,index2)=>{
      item.checked = checked;
      return item;
    }));
    // console.log("handleChange", name, type, value, checked);
    // setParams1({ ...params1, [name]: v });
  };

  /**
   * 모달 닫기
   */
   const closeConfirm = () => {
    setConfirmOpened(false);
  };

  return (
    <Fragment>
      {/* params1 : {JSON.stringify(params1)} */}
      <ExternalStorageModal 
       tab={tab}
       onTabChange={changeTab}
       onChange={handleChange}
       onChange2={handleChange2}
       onRequestUseUsb={requestUseUsb}
       onApproveUseUsb={approveUseUsb}
       onRejectUseUsb={()=>setConfirmOpened(true)}
       onChangeForCheckbox={handleChangeForCheckbox}
       onAllChecked={handleAllChecked}
       data1={params1}
       data2={params2}
       approveData={approveData}
       reqstName={reqstName}
       apprvName={apprvName}
       user={user}
       />
      <AlertDialog
        open={alertModalOpend}
        title="[알림]"
        content={alertTitle}
        onOkClick={() => {
          setAlertModalOpend(false);
        }}
        onClose={() => {
          setAlertModalOpend(false);
        }}
      />

      <ConfirmDialog open={confirmOpened} onOkClick={rejectUseUsb} onClose={closeConfirm}>
        <Typography variant="subtitle1">외부 저장매체 승인 요청을 반려 하시겠습니까?<br/>
        반려 사유를 작성해 주시기 바랍니다.</Typography>
        <TextField placeholder="반려 사유" name="uRejectReason" value={params2.uRejectReason} onChange={handleChange2} variant="outlined" fullWidth style={{ marginTop: '10px' }} />
      </ConfirmDialog>

    </Fragment>
  );
});

export default ExternalStorageModalContainer;
