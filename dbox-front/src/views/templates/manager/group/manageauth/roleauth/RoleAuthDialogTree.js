import { Typography } from "@material-ui/core";
import Tree from "rc-tree";
import TreeIcon from "views/commons/tree/TreeIcon";
import CommonUtil from "utils/common-util";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";

console.debug("RoleAuthDialogTree.js");

export default function RoleAuthDialogTree({ nodes, onSelect, selectedKeys, comCode, roleAuthGridData }) {
  // 트리 내용
  const treeData = CommonUtil.mapTreeAll(
    new Array(
      comCode != "DKG"
        ? nodes[0].data.response
        : roleAuthGridData.uComCode === "DKS"
        ? nodes[0].data.response.children[0]
        : roleAuthGridData.uComCode === "ITG"
        ? nodes[0].data.response.children[1]
        : roleAuthGridData.uComCode === "UNC"
        ? nodes[0].data.response.children[2]
        : roleAuthGridData.uComCode === "FEI"
        ? nodes[0].data.response.children[3]
        : nodes[0].data.response,
    ),
    {
      mapping: (item) => ({
        key: typeof item.dept !== "undefined" ? item.dept.orgId : item.userId,
        title: <Typography>{typeof item.dept !== "undefined" ? item.dept.orgNm : item.displayName}</Typography>,
        data: typeof item.dept !== "undefined" ? item.dept : item,
        img: typeof item.dept !== "undefined" ? "GROUP" : "USER",
      }),
    },
  );

  return (
    <Tree
      treeData={treeData}
      icon={({ data, expanded }) => <TreeIcon type={data.img} expanded={expanded} />}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      showLine
      autoExpandParent={true}
    />
  );
}
