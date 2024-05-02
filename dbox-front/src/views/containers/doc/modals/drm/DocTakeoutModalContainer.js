import { forwardRef, Fragment, useImperativeHandle, useState, useEffect } from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import DocTakeoutModal from "views/templates/doc/modals/drm/DocTakeoutModal";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import { getDocAttr, updateTakeoutRequestFree } from "stores/doc";
import { useDispatch, useSelector } from "react-redux";
import DocApi from "apis/doc-api";
import TakeoutApi from "apis/takeout-api";
import AlertDialog from "views/commons/dialog/AlertDialog";
import { useDebouncedEffect } from "hooks/useDebouncedEffect";
import { useRef } from "react";
import UploadModalButton from './../../../../templates/upload/UploadModalButton';
import { AGREEMENT_STR, EXPORT_TYP_1, EXPORT_TYP_2 } from 'constants/code-constants';
const useStyles = makeStyles({
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px"
  },
  agreeAlign: {
    float: "right"
  }
});

const DocTakeoutModalContainer = forwardRef(function (props, ref) {
  const dispatch = useDispatch();

  const [alertModalOpend, setAlertModalOpend] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  const [opened, setOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [freePassConfirmOpened, setFreePassConfirmOpened] = useState(false);

  const user = useSelector((state) => state.session.user);
  const defaultData = {
    uExportFlag: "P",
    uExportTyp1: "0",
    uExportTyp2: "0",
    uReqReason: ""
  };
  
  const defaultParam = {
    uExportFlag: "P",
    uExportTyp: "0",
    uReqReason: ""
  };
  const [doc, setDoc] = useState({});
  const [data, setData] = useState(defaultData);
  const [params, setParams] = useState(defaultParam);
  const [exportReasons, setExportReasons] = useState({}); 
  const [isValidFreePass1, setIsValidFreePass1] = useState(false);
  const [isValidFreePass2, setIsValidFreePass2] = useState(false);
  const [isFreePathAgreed, setIsFreePathAgreed] = useState(false);

  const docTakeModalRef = useRef(null);
  const freePass1Ref = useRef(null);
  const freePass2Ref = useRef(null);
  const inputEl = useRef(null);
  const today = new Date();
  const todayStr = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate() + '. ';

  const reasonInputChange = ({target}) => { 
    setParams({ ...params, "uExportFlag": "P", "uReqReason": target.value });
  }
  const handleChange = ({ target }) => {  
    let {type, name, value, checked } = target;
    let v = type === "checkbox" ? checked : value;
    console.log("handleChange", name, type, value, checked);
    if (name === "freePass1") {
      if (AGREEMENT_STR === v ) {
        setIsValidFreePass1(true);
      } else {
        setIsValidFreePass1(false);
      }
    } else if (name === "freePass2") {
      if (AGREEMENT_STR === v ) {
        setIsValidFreePass2(true);
      } else {
        setIsValidFreePass2(false);
      }
    } else {
      
    }

    setData({ ...data, [name]: v });

    // debugger;
    if ( name === "uExportTyp1" || name === "uExportTyp2" || name === "uExportFlag" ) {
      if ( name.startsWith("uExportTyp") ) name = "uExportTyp";
      if ( docTakeModalRef.current ) {
        if ( name === "uExportFlag" ) {
          // debugger
          if ( v === "A" ) { 
            setParams({ ...params,  
              [name]: v, 
              "uReqReason": exportReasons.autoNames[docTakeModalRef.current.exportFlag1.childNodes[1].value]
            });
          } else if ( v === "F" ) {
            setParams({ ...params,  
              [name]: v, 
              "uReqReason": exportReasons.freeNames[docTakeModalRef.current.exportFlag2.childNodes[1].value]
            });
          } else if ( v === "P" ) {
            setParams({ ...params, [name]: v, "uReqReason": "", "uExportTyp": ""});
          }
        } else if ( name === "uExportTyp" ) {
          if ( params.uExportFlag === "F" ) 
            setParams({ ...params,  [name]: v, "uReqReason": exportReasons.autoNames[v] });
          if ( params.uExportFlag === "A" ) 
            setParams({ ...params,  [name]: v, "uReqReason": exportReasons.freeNames[v] });
        }
      }
    } else {
      setParams({ ...params, [name]: v });
    }
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  /**
   * 모달 열기
   */
  const openModal = async (docId) => {
    setParams(defaultParam);
    setData(defaultData);
    setFreePassConfirmOpened(false);
    setIsValidFreePass1(false);
    setIsValidFreePass2(false);
    setExportReasons(
      {
        uAutoApprYn: 'Y',
        uFreePassYn: 'Y',
        uDeleteOption: 'U',
        uDeleteDays: '0',
        autoNames: new Array('Loading..'),
        freeNames: new Array('Loading..'),
      }
    );
    setOpened(true);
    if (docId) {
      // debugger;
      const response = await DocApi.getDocAttr({
        params: {
          // docId: "090004d280007076"
          docId: docId
        }
      });
      setDoc(response);
    } 
    
    const takeOutRsnRst = await TakeoutApi.getTakeoutReasons({
      params: {orgId : user.orgId}
    });  

    if (takeOutRsnRst.data.response.uFreePassYn == 'Y') {
      if (takeOutRsnRst.data.response.freeNames) {
        takeOutRsnRst.data.response.freeNames.unshift('해당없음');
      } else {
        takeOutRsnRst.data.response.freeNames = new Array('해당없음');
      }
    } else {
      takeOutRsnRst.data.response.freeNames = new Array('프리패스 불가');
    } 
    if (takeOutRsnRst.data.response.uAutoApprYn == 'Y') {
      if (takeOutRsnRst.data.response.autoNames) {
        takeOutRsnRst.data.response.autoNames.unshift('해당없음');
      } else {
        takeOutRsnRst.data.response.autoNames = new Array('해당없음');
      }
    } else {
      takeOutRsnRst.data.response.autoNames = new Array('자동승인 불가');
    }

    setExportReasons(takeOutRsnRst.data.response);

    //동의서 정보 조회
    const agreementRst = await TakeoutApi.getAgreement({});
    // debugger
    for (let obj of agreementRst.data.response) {
      if (obj.uAgreeType === "U" && obj.uAgreeYn === 'Y') {
        setIsFreePathAgreed(true);
        break;
      }
    }
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 복호화 반출 요청
   */
  const requestAgreement = async () => {
    const agreementRst = await TakeoutApi.registAgreement(
    {
      params: {
        uUserId:user.userId,
        uAgreeType:'U',
        uComCode:user.comOrgId,
        uDeptCode:user.orgId,
        uAgreeName:'외부반출승인동의서',
        uAgreeYn:'Y',
        uReason:'개정사유',
      }
    });
    requestTakeout();
  }
  /**
   * 복호화 반출 요청
   */
  const requestTakeout = async () => {
    // debugger;
    
    if (params.uReqReason.trim() === "") {
      // debugger;
      setAlertTitle("사유를 입력하세요.");
      setAlertModalOpend(true);
      return;
    } else {
      setAlertModalOpend(false);
    }
    if (!isFreePathAgreed) {
      if ( params.uExportFlag === "F" && (!isValidFreePass1 || !isValidFreePass2 ) ) {
        setFreePassConfirmOpened(true);
        return false;
      }
    }

    setOpened(false);
    setConfirmOpened(false);
    setFreePassConfirmOpened(false);
    const response = await DocApi.updateTakeoutRequest({
      params: {
        uApprType: params.uExportFlag,
        uReqDocId: doc.rObjectId, 
        uReqReason: params.uReqReason
      }
    });
    alert("반출 신청이 완료되었습니다.");
  };

  /**
   * 모달 열기
   */
  const openConfirm = () => {
    debugger
    
    if (params.uExportFlag === "F" && exportReasons.uFreePassYn  == 'N') {
      alert('해당 부서는 프리패스 선택이 제한됩니다.');
      return;
    }
    if (params.uExportFlag === "A" && exportReasons.uAutoApprYn   == 'N') {
      alert('해당 부서는 자동선택 선택이 제한됩니다.');
      return;
    }
    if ( params.uExportFlag === "P" || ( params.uExportFlag !== "P" && params.uExportTyp === "0" ) ) {
      setParams(defaultParam);
      setConfirmOpened(true);
    } else {
      if ( params.uExportFlag === "F" && (!isFreePathAgreed) ) {
        setFreePassConfirmOpened(true);
        // } else if ( params.uExportFlag === "A" ) {
      } else {
        requestTakeout();
      }
    }
  };

  /**
   * 모달 닫기
   */
  const closeConfirm = () => {
    setConfirmOpened(false);
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={openConfirm} className={classes.btnAction}>
            확인
          </Button>
          <Button color="secondary" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
        </Fragment>
      }
      title="복호화 반출 요청"
      maxWidth="xs"
      fullWidth
    >
      {/* defaultData : {JSON.stringify(defaultData)}<br /> */}
      {/* params : {JSON.stringify(params)}<br /> */}
      {/* data : {JSON.stringify(data)}<br /> */}
      <DocTakeoutModal
        uExportFlag={data.uExportFlag}
        uExportTyp1={data.uExportTyp1}
        uExportTyp2={data.uExportTyp2}
        ref={docTakeModalRef}
        exportReasons={exportReasons}
        // exportFlag2Ref={exportFlag2Ref}
        onChange={handleChange}
      />
      <ConfirmDialog open={confirmOpened} onOkClick={requestTakeout} onClose={closeConfirm}>
        <Typography variant="subtitle1">"{doc.objectName}"파일 1건을 "복호화 승인요청"을 하시겠습니까?</Typography>
        <TextField placeholder="요청 사유" name="uReqReason" value={params.uReqReason} onChange={reasonInputChange} variant="outlined" fullWidth style={{ marginTop: '10px' }} />
      </ConfirmDialog>

      <DynamicButtonModalDialog
        open={freePassConfirmOpened}
        onClose={() => {
          setFreePassConfirmOpened(false);
        }}
        buttons={
          <Fragment>
            <Button color="primary" onClick={()=>{
              if ( isValidFreePass1 && isValidFreePass2 ) {
                requestAgreement();
                // requestTakeout();
              } else {
                setAlertTitle("보안 확인 문자를 정확히 입력하세요.");
                setAlertModalOpend(true);
              }
            }} className={classes.btnAction}>
              동의
            </Button>
            <Button color="secondary" onClick={() => {
              setFreePassConfirmOpened(false);
            }}
              className={classes.btnAction}>
              미동의
            </Button>
          </Fragment>
        }
        title="프리패스 동의서"
        maxWidth="xs"
        fullWidth
      >
        부서장이 사전 등록한 프리패스 목록에 부합하는 <br />
        목적으로만 외부 반출이 가능합니다. 목적과 다른
        반출로 인한 [
        <TextField ref={freePass1Ref} placeholder={AGREEMENT_STR} name="freePass1" 
        value={data.freePass1} onChange={handleChange} 
         variant="outlined" style={{ display: 'inline', width: 70, marginTop: '10px'}}
         inputProps={{ style: { color: isValidFreePass1?'':'red'}}}
        />
        ]에게 있으며  프리패스,<br />
        반출로 인한 [
        <TextField ref={freePass2Ref} placeholder={AGREEMENT_STR} name="freePass2" 
        value={data.freePass2} onChange={handleChange} 
        variant="outlined" style={{ display: 'inline', width: 100, marginTop: '10px' }} 
        inputProps={{ style: { color: isValidFreePass2?'':'red'}}}
        />
        ]에게 있습니다. <br />
        <div className={classes.agreeAlign}>{todayStr} 동의자: {user.orgNm}팀 {user.displayName} {user.titleName}</div>
      </DynamicButtonModalDialog>

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

      {/* <AlertDialog open={confirmOpened} content={"문서 속성을 변경하시겠습니까?"} onOkClick={continueSavingDocProperty} onClose={cancelSavingDocProperty} /> */}

    </DynamicButtonModalDialog>
  );
});

export default DocTakeoutModalContainer;
