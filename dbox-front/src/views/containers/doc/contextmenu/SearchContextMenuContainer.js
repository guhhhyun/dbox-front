import { useRef } from "react";
import SearchContextMenu from "views/templates/doc/contextmenu/SearchContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";

console.debug("SearchContextMenuContainer.js");

export default function SearchContextMenuContainer({ open, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();

  const contextMenuRef = useRef(null);

  /**
   * 권한신청 열기
   */
  const clickAuthRequest = () => {
    contextMenuRef.current?.authRequest.openModal(data.data.key.split("_")[0]);
  };

  return (
    <SearchContextMenu
      ref={contextMenuRef}
      open={open}
      posX={pos?.x}
      posY={pos?.y}
      data={data}
      onAuthRequestClick={clickAuthRequest}
      onClose={closeContextMenu}
    />
  );
}
