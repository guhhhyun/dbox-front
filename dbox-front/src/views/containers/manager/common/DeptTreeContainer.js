import React, { useState, forwardRef, useImperativeHandle } from "react";
import NodeApi from "apis/node-api";
import CodeApi from "apis/code-api";
import UnusualApi from "apis/unusual-api";
import { useSelector } from "react-redux";
import { Async } from "react-async";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import SearchTree from "views/templates/manager/common/SearchTree";
import AlertDialog from "views/commons/dialog/AlertDialog";
import { Fragment } from "react";

console.debug("DeptTreeContainer.js");

const DeptTreeContainer = forwardRef(({ setDeptName, getData, comCode }, ref) => {
  const user = useSelector((state) => state.session.user);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [alertOpened, setAlertOpened] = useState(false);
  const [deptCode, setDeptCode] = useState("");
  const [updateDept, setUpdateDept] = useState("");
  const [childrenDept, setChildrenDept] = useState("");

  let nodes = null;

  useImperativeHandle(ref, () => ({
    getValue() {
      return deptCode;
    },
    getChildrenDept() {
      return childrenDept;
    },
    getUpdateDept() {
      return updateDept;
    },
  }));

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, selectedNodes) => {
    setChildrenDept("");

    if (selectedNodes.node.children.length > 0) {
      getChildrenList(selectedNodes.node.data.orgId);
    }
    setUpdateDept(selectedNodes.node.data);
    setDeptName(selectedNodes.node.data.orgNm);
    setDeptCode(selectedNodes.node.data.orgId);

    setSelectedKeys(selectedKeys);
    getData(selectedNodes.node.data.comOrgId, selectedNodes.node.data.upOrgId, selectedNodes.node.data.orgId);
  };

  const getChildrenList = async (params) => {
    try {
      const response = await NodeApi.getChildrenAllList({
        params: {
          deptId: params,
        },
      });
      if (response) {
        setChildrenDept(response.data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Async
        promiseFn={NodeApi.getNodeAllList}
        params={{
          deptId: comCode,
          userYn: false,
        }}
        watch={user}
      >
        <Async.Fulfilled>
          {(data) => {
            nodes = [data];
            return <SearchTree nodes={[data]} onSelect={selectTreeNode} selectedKeys={selectedKeys} />;
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
export default DeptTreeContainer;
