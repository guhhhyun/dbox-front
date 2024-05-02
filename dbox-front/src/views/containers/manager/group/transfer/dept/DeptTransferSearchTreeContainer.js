import React, { useState, forwardRef, useImperativeHandle } from "react";
import NodeApi from "apis/node-api";
import { useSelector } from "react-redux";
import { Async } from "react-async";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import SearchTree from "views/templates/manager/common/SearchTree";

const DeptTransferSearchFormContainer = forwardRef((
  {
      row
    , setAlert
  }, ref) => {

  const [dept, setDept] = useState({});
  const [selectedKeys, setSelectedKeys] = useState("");

  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  let nodes = null;

  useImperativeHandle(ref, () => ({
    getValue() {
      return {
        ...dept
      };
    }
  }));

  const selectTreeNode = (selectedKeys, selectedNodes) => {
    console.log('selectedNodes', selectedNodes)
    setDept(selectedNodes.node.data)
    setSelectedKeys(selectedKeys);
  };

  return (
    <Async
      promiseFn={NodeApi.getNodeAllList}
      params={{
        deptId: comCode,
        userYn: false
      }}
      watch={user}
    >
      <Async.Fulfilled>
        {(data) => {
          nodes = [data];
          return (
            <SearchTree
              nodes={[data]}
              onSelect={selectTreeNode}
              selectedKeys={selectedKeys} />
          );
        }}
      </Async.Fulfilled>
      <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
});
export default DeptTransferSearchFormContainer;
