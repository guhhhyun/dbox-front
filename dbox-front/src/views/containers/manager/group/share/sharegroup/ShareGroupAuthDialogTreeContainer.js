import React, { useState } from "react";
import NodeApi from "apis/node-api";
import { useSelector } from "react-redux";
import { Async } from "react-async";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import ShareGroupAuthDialogTree from "views/templates/manager/group/share/sharegroup/ShareGroupAuthDialogTree";
import { Fragment } from "react";

console.debug("ShareGroupAuthDialogTreeContainer.js");

export default function ShareGroupAuthDialogTreeContainer({ clickTreeOrgId, shareGroupGridData }) {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [nullArray, setNullArray] = useState([]);

  let nodes = null;

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, selectedNodes) => {
    // selectedNodes.node.data.orgType === "T" ? setSelectedKeys(selectedKeys) : setSelectedKeys(null);
    // selectedNodes.node.data.orgType === "T" ? clickTreeOrgId(selectedKeys) : clickTreeOrgId(null);
  };

  /**
   * 트리 노드 체크박스 토글
   */
  const toggleTreeNodeCheckbox = (checkedKeys, selectedNodes) => {
    selectedNodes.node.data.orgType === "T" ? setCheckedKeys(checkedKeys) : setNullArray(checkedKeys);
    selectedNodes.node.data.orgType === "T" ? clickTreeOrgId(checkedKeys.checked) : setNullArray(checkedKeys);
  };

  /**
   * 트리 노드 확장 토글
   */
  const toggleTreeNodeExpanded = (expandedKeys, info) => {
    setExpandedKeys(expandedKeys);
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
          nodeId: "6592",
          nodeTypeCodes: ["GROUP", "FOLDER", "TRASH", "DIRECTORY"],
          field: "name",
          rootNodeId: user?.group?.entCode,
          rootEntCode: user?.group?.entCode,
          userYn: false,
        }}
        watch={user}
      >
        <Async.Fulfilled>
          {(data) => {
            nodes = [data];
            return (
              <ShareGroupAuthDialogTree
                nodes={[data]}
                onSelect={selectTreeNode}
                selectedKeys={selectedKeys}
                onCheck={toggleTreeNodeCheckbox}
                checkedKeys={checkedKeys}
                onExpand={toggleTreeNodeExpanded}
                expandedKeys={expandedKeys}
                shareGroupGridData={shareGroupGridData}
                comCode={comCode}
              />
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
