import TreeIcon from "views/commons/tree/TreeIcon";
import { TREE_TYPE } from "constants/code-constants";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";
import Tree from "rc-tree";

console.debug("OrgTree.js");

export default function OrgTree({ treeData, status, onSelect, selectedKeys, onCheck, checkedKeys, onExpand, expandedKeys, onContextMenu, ...extra }) {
  return (
    <Tree
      treeData={treeData}
      icon={({ data, expanded }) => {
        const type = data.type === TREE_TYPE.DEPT.key ? "GROUP" : undefined;
        return <TreeIcon type={type} expanded={expanded} />;
      }}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      onRightClick={onContextMenu}
      showLine
      defaultExpandAll
      {...extra}
    />
  );
}
