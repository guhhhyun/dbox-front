import { Fragment } from "react";
import { Typography } from "@material-ui/core";
import Tree from "rc-tree";
import TreeIcon from "views/commons/tree/TreeIcon";

import CommonUtil from "utils/common-util";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";

console.debug("SearchTree.js");

export default function SearchTree({ nodes, ...extra }) {
  // 트리 내용
  const treeData = CommonUtil.mapTreeAll(new Array(nodes[0].data.response), {
    mapping: (item) => ({
      key: typeof item.dept !== "undefined" ? item.dept.orgId : item.userId,
      title: <Typography>{typeof item.dept !== "undefined" ? item.dept.orgNm : item.displayName}</Typography>,
      data: typeof item.dept !== "undefined" ? item.dept : item,
      img: typeof item.dept !== "undefined" ? "GROUP" : "USER",
    }),
  });

  return (
    <Tree treeData={treeData} icon={({ data, expanded }) => <TreeIcon type={data.img} expanded={expanded} />} showLine autoExpandParent={true} {...extra} />
  );
}
