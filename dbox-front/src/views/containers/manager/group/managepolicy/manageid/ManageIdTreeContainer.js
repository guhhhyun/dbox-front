import React, { useState } from "react";
import NodeApi from "apis/node-api";
import { useSelector } from "react-redux";
import { Async } from "react-async";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";

import { Fragment } from "react";
import ManageIdTree from "views/templates/manager/group/managepolicy/manageid/ManageIdTree";

console.debug("ManageIdTreeContainer.js");

export default function ManageIdTreeContainer({ onClickTreeCompanyData, onClickTreeDeptData, onClickTreeUserData }) {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const [selectedKeys, setSelectedKeys] = useState([]);

  let nodes = null;

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, selectedNodes) => {
    selectedNodes.node.img === "USER" || selectedNodes.node.data.orgType === "T" || selectedNodes.node.data.orgType === "C"
      ? setSelectedKeys(selectedKeys)
      : setSelectedKeys(null);
    selectedNodes.node.img === "USER" ? onClickTreeUserData(selectedNodes.node.data) : onClickTreeUserData("");
    selectedNodes.node.data.orgType === "T" ? onClickTreeDeptData(selectedNodes.node.data) : onClickTreeDeptData("");
    selectedNodes.node.data.orgType === "C" ? onClickTreeCompanyData(selectedNodes.node.data) : onClickTreeCompanyData("");
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
      <Async
        promiseFn={NodeApi.getNodeAllList}
        params={{
          deptId: comCode,
          nodeId: "6592",
          nodeTypeCodes: ["GROUP", "FOLDER", "TRASH", "DIRECTORY"],
          field: "name",
          rootNodeId: user?.group?.entCode,
          rootEntCode: user?.group?.entCode,
          userYn: true,
        }}
        watch={user}
      >
        <Async.Fulfilled>
          {(data) => {
            nodes = [data];
            return <ManageIdTree nodes={[data]} onSelect={selectTreeNode} selectedKeys={selectedKeys} />;
          }}
        </Async.Fulfilled>
        <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
        <Async.Loading>
          <CenterCircularProgress />
        </Async.Loading>
      </Async>
    </Fragment>
  );
}
