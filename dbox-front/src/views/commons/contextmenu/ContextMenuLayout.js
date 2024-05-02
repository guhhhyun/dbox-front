import { useRef, useState } from "react";
import ContextMenu from "./ContextMenu";

console.debug("ContextMenuLayout.js");

export default function ContextMenuLayout({ children, menus, ...extra }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const contextMenuRef = useRef(null);

  /**
   * 컨텍스트 메뉴 열기
   */
  const openContextMenu = (event) => {
    event.preventDefault();
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
    contextMenuRef.current.closeMenu();
    setOpen(true);
  };

  /**
   * 컨텍스트 메뉴 닫기
   */
  const closeContextMenu = () => {
    setOpen(false);
  };

  return (
    <div onContextMenu={openContextMenu} {...extra}>
      {children}
      <ContextMenu ref={contextMenuRef} menus={menus} open={open} posX={pos?.x} posY={pos?.y} onClose={closeContextMenu} />
    </div>
  );
}
