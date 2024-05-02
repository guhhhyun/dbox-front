import { Typography, Paper, Box } from "@material-ui/core";
import Tree from "rc-tree";
import TreeIcon from "views/commons/tree/TreeIcon";
import CommonUtil from "utils/common-util";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";
import { ORG_TREE_TYPE, TREE_TYPE } from "constants/code-constants";

console.debug("ModalTree.js");

export default function ModalTree({ treeData, onSelect, selectedKeys, onCheck, checkedKeys, onExpand, expandedKeys, ...extra }) {
  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Tree
          treeData={treeData}
          icon={({ data, expanded }) => {
            const type = data.type === ORG_TREE_TYPE.DEPT ? "GROUP" : "USER";
            return <TreeIcon type={type} expanded={expanded} />;
          }}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          showLine
          defaultExpandAll
          {...extra}
        />
      </Box>
    </Paper>
  );
}
