import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import DocAuthRequestModal from "views/templates/doc/modals/auth/DocAuthRequestModal";
import DocApi from "apis/doc-api";
import { useEffect } from "react";
import AlertDialog from "views/commons/dialog/AlertDialog";

console.debug("DocAuthRequestModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});

const DocAuthRequestModalContainer = forwardRef(function (props, ref) {
  const defaultParam = {
    uReqDocId: "",
    uReqReason: "",
    uReqPermit: "3" // 조회 Fixed
  };

  const [alertModalOpend, setAlertModalOpend] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  const [params, setParams] = useState(defaultParam);

  const [opened, setOpened] = useState(false);
  
  const [docId, setDocId] = useState(null);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  useEffect(async () => {
    if (docId) {
      // debugger;
      // getDocAttr(docId);
      setParams({...params, "uReqDocId":docId});
    } else {
      setParams(defaultParam);
    }
  }, [docId]);

  const handleChange = ({ target }) => {
    let {type, name, value, checked } = target;
    let v = type === "checkbox" ? checked : value;
    setParams({ ...params, [name]: v });
  };

  const getDocAttr = async (docId) => {
    const response = await DocApi.getDocAttr({
      params: {
        // docId: "090004d280007076"
        docId: docId
      }
    });
    // setData(response);
    setParams({ docId:docId, versions: "1" });
  }

  /**
   * 모달 열기
   */
   const openModal = (docId) => {
    setOpened(true);
    setDocId(docId);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
    setDocId(null);
  };

  /**
   * 권한 신청
   */
  const requestAuth = () => {
    if (!params.uReqReason) {
      // debugger;
      setAlertTitle("권한 신청 사유를 입력하세요.");
      setAlertModalOpend(true);
      return;
    }

    Promise.all(
    [1].map(
      async (resolve) => {
        const response = DocApi.authRequest({
          params: params
        });
      }
    )
    ).then(() => {
      setDocId(null);
    });

    setOpened(false);
  };
  

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="권한 신청"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={requestAuth} className={classes.btnAction} >
            신청
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction} >
            취소
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      {/* defaultData : {JSON.stringify(defaultData)}<br /> */}
      {/* params : {JSON.stringify(params)}<br /> */}
      <DocAuthRequestModal onChange={handleChange}/>
      
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

    </DynamicButtonModalDialog>
  );
});

export default DocAuthRequestModalContainer;
