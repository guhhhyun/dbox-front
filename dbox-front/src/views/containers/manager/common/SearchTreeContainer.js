import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import NodeApi from "apis/node-api";
import CodeApi from "apis/code-api";
import { useSelector } from "react-redux";
import { Async } from "react-async";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import SearchTree from "views/templates/manager/common/SearchTree";
import AlertDialog from "views/commons/dialog/AlertDialog";
import { Fragment } from "react";
import { LeakRemoveTwoTone } from "@material-ui/icons";

console.debug("SearchTreeContainer.js");

//export default function SearchTreeContainer(props) {
const SearchTreeContainer = forwardRef(({ userChk, comChk, setUserInfo, option }, ref) => {
  const user = useSelector((state) => state.session.user);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userCode, setUserCode] = useState("");
  const [lockUserName, setLockUserName] = useState("");
  const [lockUserCode, setLockUserCode] = useState("");
  const [alertOpened, setAlertOpened] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [mutliValue, setMutliValue] = useState("");

  let comCode = "";
  if (comChk) {
    comCode = comChk;
  } else {
    comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  }
  let comOrgId = "";
  let orgId = "";

  let chk = false;

  const alertContent = "부서말고 사용자 선택해 주세요";

  const value = {
    companyName: companyName,
    companyCode: companyCode,
    deptName: deptName,
    deptCode: deptCode,
    userName: userName,
    userCode: userCode,
  };

  const lockUser = {
    lockUserName: lockUserName,
    lockUserCode: lockUserCode,
  };

  const userInfo = {
    userCode: userCode,
    companyCode: companyCode,
  };

  let nodes = null;

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
    lockUser() {
      return lockUser;
    },
    getMultiValue() {
      return mutliValue;
    },
  }));

  useEffect(() => {
    if (option == "M") {
      setMultiple(true);
    }
  }, [option]);

  /**
   *
   * Alert 모달 열기
   */
  const openAlertModal = () => {
    setAlertOpened(true);
  };

  /**
   * Alert 모달 닫기
   */
  const closeAlertModal = () => {
    setAlertOpened(false);
  };
  /**
   * Alert 확인버튼
   */
  const onAlertDialogOkClick = () => {
    setAlertOpened(false);
  };

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, selectedNodes) => {
    comOrgId = selectedNodes.node.data.comOrgId;
    orgId = selectedNodes.node.data.orgId;
    selectedNodes.node.children.map((item) => {
      if (item.img === "GROUP") {
        chk = true;
      }
    });

    if (chk) {
      getChildrenList(selectedNodes.node.data.orgId);
    }

    /**
     * 다중 선택
     */

    if (option == "M") {
      setMutliValue(selectedNodes);
    } else {
      if (userChk === "Y" && comChk) {
        setUserInfo({ userCode: selectedNodes.node.data.userId, companyCode: selectedNodes.node.data.comOrgId });
        selectedNodes.node.img === "USER" ? setSelectedKeys(selectedKeys) : openAlertModal();
      } else if (userChk === "Y") {
        setLockUserName(selectedNodes.node.data.displayName);
        setLockUserCode(selectedNodes.node.data.userId);
        selectedNodes.node.img === "USER" ? setSelectedKeys(selectedKeys) : openAlertModal();
      } else {
        setCompanyCode(selectedNodes.node.data.comOrgId);
        if (selectedNodes.node.data.comOrgId !== selectedNodes.node.data.orgId) {
          setDeptName(selectedNodes.node.data.orgNm);
          setDeptCode(selectedNodes.node.data.orgId);
        }
        setUserName(selectedNodes.node.data.displayName);
        setUserCode(selectedNodes.node.data.userId);
        setSelectedKeys(selectedKeys);
      }
    }
    setSelectedKeys(selectedKeys);
    getData(selectedNodes.node.data.comOrgId);
  };

  const getChildrenList = async (params) => {
    try {
      const response = await NodeApi.getChildrenAllList({
        params: {
          deptId: params,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async (params) => {
    try {
      const response = await CodeApi.getCodeList({
        params: {
          uCodeType: "COM_CODE",
          uCodeVal1: params,
        },
      });
      setCompanyName(response.data.response[0].uCodeName1);
    } catch (e) {
      console.error(e);
    }
  };

  const findFromTree = (treeData, key) => {
    const found = treeData.find((item) => item.gwDept.orgId === key);
    if (!found) {
      for (let item of treeData) {
        if (item.children) return findFromTree(item.children, key);
      }
    } else {
      return found;
    }
  };

  return (
    <Fragment>
      <AlertDialog open={alertOpened} content={alertContent} onOkClick={onAlertDialogOkClick} onClose={closeAlertModal} />
      {/* <Button
        onClick={() => {
          console.log(findFromTree(nodes, checkedKeys[0]));
          alert(findFromTree(nodes, checkedKeys[0]).gwDept.orgNm);
        }}
      >
        부서
      </Button> */}
      <Async
        promiseFn={NodeApi.getNodeAllList}
        params={{
          deptId: comCode,
          userYn: true,
        }}
        watch={user}
      >
        <Async.Fulfilled>
          {(data) => {
            nodes = [data];
            return <SearchTree nodes={[data]} onSelect={selectTreeNode} multiple={multiple} selectedKeys={selectedKeys} />;
          }}
        </Async.Fulfilled>
        <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
        <Async.Loading>
          <CenterCircularProgress />
        </Async.Loading>
      </Async>
    </Fragment>
  );
});
export default SearchTreeContainer;
