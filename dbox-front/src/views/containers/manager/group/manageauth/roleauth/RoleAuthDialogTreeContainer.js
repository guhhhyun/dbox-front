import React, { useState } from "react";
import NodeApi from "apis/node-api";
import { useSelector } from "react-redux";
import { Async } from "react-async";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import RoleAuthDialogTree from "views/templates/manager/group/manageauth/roleauth/RoleAuthDialogTree";

import { Fragment } from "react";

console.debug("RoleAuthDialogTreeContainer.js");

export default function RoleAuthDialogTreeContainer({ clickTreeNameId, roleAuthGridData }) {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const [selectedKeys, setSelectedKeys] = useState([]);

  let nodes = null;

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, selectedNodes) => {
    selectedNodes.node.img === "USER" ? setSelectedKeys(selectedKeys) : setSelectedKeys(null);
    selectedNodes.node.img === "USER" ? clickTreeNameId(selectedKeys) : clickTreeNameId(null);
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
            return (
              <RoleAuthDialogTree nodes={[data]} onSelect={selectTreeNode} selectedKeys={selectedKeys} comCode={comCode} roleAuthGridData={roleAuthGridData} />
            );
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
