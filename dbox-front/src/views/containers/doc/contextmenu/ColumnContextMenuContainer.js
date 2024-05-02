import ColumnContextMenu from "views/templates/doc/contextmenu/ColumnContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";

console.debug("DocContextMenuContainer.js");

export default function ColumnContextMenuContainer({ open, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();

  /**
   * 새 폴더 생성
   */
  const clickNewFolder = () => {};

  /**
   * 새로고침
   */
  const clickRefresh = () => {
    window.location.reload();
  };

  return (
    <ColumnContextMenu open={open} posX={pos?.x} posY={pos?.y} onNewFolderClick={clickNewFolder} onRefreshClick={clickRefresh} onClose={closeContextMenu} />
  );
}
