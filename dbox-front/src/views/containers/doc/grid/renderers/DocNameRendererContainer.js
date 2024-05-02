import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DocNameRenderer from "views/templates/doc/grid/renderers/DocNameRenderer";
import CommonUtil from "utils/common-util";
import { CATEGORY_FOLDER, CLIPBOARD_TYPE, DATA_TYPE, FOL_STATUS, ICON_STATUS, ICON_TYPE, TREE_TYPE } from "constants/code-constants";

console.debug("DocNameRendererContainer.js");

export default function DocNameRendererContainer({ data, valueFormatted, value, api, colDef: { field }, rowIndex, onContextMenu, node, pageKey, ...extra }) {
  const text = valueFormatted ? valueFormatted : value;

  const user = useSelector((state) => state.session.user);
  const sidebarTab = useSelector((state) => state.doc.tab[pageKey]);

  const [iconType, setIconType] = useState(ICON_TYPE.DOCUMENT.key);
  const [iconStatus, setIconStatus] = useState(ICON_STATUS.NORMAL.key);

  useEffect(() => {
    if (node.rowPinned) api.startEditingCell({ colKey: field, rowIndex, rowPinned: node.rowPinned });
  }, []);

  useEffect(() => {
    if (data?.key && sidebarTab) {
      //  아이콘 타입 설정
      // 부서일 경우
      if (data?.type === TREE_TYPE.DEPT.key) {
        setIconType(ICON_TYPE.FOLDER.key);
      }
      // 카테고리일 경우
      else if (data?.type === TREE_TYPE.CATEGORY.key) {
        if (data.data.key === CATEGORY_FOLDER.TRASH.key) setIconType(ICON_TYPE.TRASH.key);
        else setIconType(ICON_TYPE.FOLDER.key);
      }
      // 데이터일 경우
      else if (data?.type === TREE_TYPE.DATA.key) {
        //TODO dooyeon.yoo
        if (!data.data) data.data = data;
        if (data.data.dataType === DATA_TYPE.DOCUMENT.key) {
          if (ICON_TYPE.EXCEL.exts.includes(data.data.uFileExt)) setIconType(ICON_TYPE.EXCEL.key);
          if (ICON_TYPE.PPT.exts.includes(data.data.uFileExt)) setIconType(ICON_TYPE.PPT.key);
          if (ICON_TYPE.WORD.exts.includes(data.data.uFileExt)) setIconType(ICON_TYPE.WORD.key);
        } else {
          setIconType(ICON_TYPE.FOLDER.key);
        }
      } else {
        if (data.data.dataType === DATA_TYPE.FOLDER.key) setIconType(ICON_TYPE.FOLDER.key);
        else setIconType(ICON_TYPE.DOCUMENT.key);
      }

      // 아이콘 상태 설정
      const parsedNodeId = CommonUtil.parseNodeId(data.key, sidebarTab);
      const categoryKey = parsedNodeId.categoryKey;

      // 잠금 상태의 폴더일 경우
      if (data.data.dataType === DATA_TYPE.FOLDER.key && data.data.uFolStatus === FOL_STATUS.LOCK.key) {
        setIconStatus(ICON_STATUS.LOCK.key);
      }
      // 공유/협업 하위일 경우
      else if (categoryKey === CATEGORY_FOLDER.SHARE.key) {
        if (data.data.ownDeptDetail.orgId === user.orgId) setIconStatus(ICON_STATUS.OUTGOING.key);
        else setIconStatus(ICON_STATUS.INCOMING.key);
      }
    }
  }, [data, sidebarTab]);

  /**
   * 마우스 우클릭 메뉴
   */
  const openContextMenu = (event) => {
    onContextMenu(event, node);
  };

  // 클릭 셀 정보
  let clickedCell = null;

  /**
   * 셀 편집하기
   */
  const startEdit = CommonUtil.buildDoubleClickChecker(() => {
    // 1000ms 내 두번 클릭 시 셀 편집
    if (clickedCell && clickedCell.colKey === field && clickedCell.rowIndex === rowIndex) {
      api.startEditingCell(clickedCell);
      clickedCell = null;
    } else {
      // 직전 클릭된 셀 정보 저장
      clickedCell = {
        colKey: field,
        rowIndex,
      };

      // 1000ms 뒤 클릭된 셀 정보 제거
      setTimeout(() => {
        clickedCell = null;
      }, 1000);
    }
  });

  const startDrag = (event) => {
    // 이동/복사 데이터 만들기
    const selectedList = api.getSelectedRows();
    
    const sources = {
      sourceFolders: selectedList.filter((item) => DATA_TYPE.FOLDER.key === item.data.dataType).map((item) => item.data.rObjectId),
      sourceFiles: selectedList.filter((item) => DATA_TYPE.DOCUMENT.key === item.data.dataType).map((item) => item.data.rObjectId),
      sourcePjts: selectedList.filter((item) => DATA_TYPE.PROJECT.key === item.data.dataType).map((item) => item.data.rObjectId),
      sourceRscs: selectedList.filter((item) => DATA_TYPE.RESEARCH.key === item.data.dataType).map((item) => item.data.rObjectId),
    };

    const form = {
      ...sources,
      uptPthGbn: CLIPBOARD_TYPE.MOVE,
    };
    const json = JSON.stringify(form);
    event.dataTransfer.setData("text/plain", json);
  };

  return <DocNameRenderer text={text} type={iconType} status={iconStatus} onClick={startEdit} onContextMenu={openContextMenu} onDragStart={startDrag} />;
}
