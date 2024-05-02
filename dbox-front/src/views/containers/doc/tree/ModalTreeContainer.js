import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import ModalTree from "views/templates/doc/tree/ModalTree";
import DeptApi from "apis/dept-api";
import CommonUtil from "utils/common-util";
import { ORG_TREE_TYPE, TREE_TYPE } from "constants/code-constants";

console.debug("ModalTreeContainer.js");

export default function ModalTreeContainer({ targets, onTargetSelect, withUser, selectOnlyUser, multiple }) {
  const user = useSelector((state) => state.session.user);
  const { enqueueSnackbar } = useSnackbar();

  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(targets || []);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  // 최초 접속 시 부서 정보 불러오기
  useEffect(() => {
    (async () => {
      try {
        const response = await DeptApi.getDeptList({
          params: {
            deptId: user.comOrgId,
            userYn: withUser || false,
          },
        });

        const deptTreeData = CommonUtil.mapTree([response.data.response], {
          mapping: (item) => ({
            key: item.dept.orgId,
            title: item.dept.orgNm,
            type: ORG_TREE_TYPE.DEPT,
            data: item.dept,
            checkable: false,
            disabled: selectOnlyUser,
          }),
          setChildren: (item, mappedChildren) => {
            const users = item.deptUsers || [];
            const mappedUsers = users.map((item2) => ({
              key: `${item.dept.orgId}_${item2.userId}`,
              title: item2.displayName,
              type: ORG_TREE_TYPE.USER,
              data: item2,
              checkable: false,
            }));
            return mappedUsers.concat(mappedChildren);
          },
        });
        
        // 이미 설정된 대상 또는 사용자 부서코드 기준으로 경로 확장
        const findTargets = targets instanceof Array && targets.length > 0 ? targets : [user.orgId];
        const deptPaths = CommonUtil.getExpandedKeysFromTargets(findTargets, deptTreeData);
        setExpandedKeys([...deptPaths]);

        setTreeData(deptTreeData);
      } catch (error) {
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      }
    })();
  }, []);

  /**
   * 트리 노드 선택
   */
  const selectTreeNode = (selectedKeys, { selectedNodes }) => {
    onTargetSelect(selectedNodes);
    setSelectedKeys(selectedKeys);
  };

  /**
   * 트리 노드 체크박스 토글
   */
  const toggleTreeNodeCheckbox = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys);
  };

  /**
   * 트리 노드 확장 토글
   */
  const toggleTreeNodeExpanded = (expandedKeys, info) => {
    setExpandedKeys(expandedKeys);
  };

  return (
    <ModalTree
      treeData={treeData}
      onSelect={selectTreeNode}
      selectedKeys={selectedKeys}
      onCheck={toggleTreeNodeCheckbox}
      checkedKeys={checkedKeys}
      onExpand={toggleTreeNodeExpanded}
      expandedKeys={expandedKeys}
      multiple={multiple}
    />
  );
}
