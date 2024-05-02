import { Typography } from "@material-ui/core";
import Tree from "rc-tree";
import TreeIcon from "views/commons/tree/TreeIcon";
import CommonUtil from "utils/common-util";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";

console.debug("ShareGroupAuthDialogTree.js");

export default function ShareGroupAuthDialogTree({ nodes, onSelect, selectedKeys, onCheck, checkedKeys, onExpand, expandedKeys, shareGroupGridData, comCode }) {
  // 트리 내용
  const treeData = CommonUtil.mapTreeAll(
    new Array(
      comCode != "DKG"
        ? nodes[0].data.response
        : shareGroupGridData.uComCode === "DKS"
        ? nodes[0].data.response.children[0]
        : shareGroupGridData.uComCode === "ITG"
        ? nodes[0].data.response.children[1]
        : shareGroupGridData.uComCode === "UNC"
        ? nodes[0].data.response.children[2]
        : shareGroupGridData.uComCode === "FEI"
        ? nodes[0].data.response.children[3]
        : "",
    ),
    {
      mapping: (item) => ({
        key: typeof item.dept !== "undefined" ? item.dept.orgId : item.userId,
        title: <Typography>{typeof item.dept !== "undefined" ? item.dept.orgNm : item.displayName}</Typography>,
        data: typeof item.dept !== "undefined" ? item.dept : item,
      }),
    },
  );

  return (
    <Tree
      treeData={treeData}
      icon={({ data, expanded }) => <TreeIcon type={data.data.nodeTypeCode} expanded={expanded} />}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      showLine
      defaultExpandAll
      checkable
      checkStrictly
    />
  );
}
