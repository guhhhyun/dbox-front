import ResearchRootContextMenu from "views/templates/doc/contextmenu/ResearchRootContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";

console.debug("ResearchRootContextMenuContainer.js");

export default function ResearchRootContextMenuContainer({ open, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();

  /**
   * 새 연구과제 생성
   */
  const clickNewResearch = () => {
    gridRef.current.enableNewResearch();
  };

  return <ResearchRootContextMenu open={open} posX={pos?.x} posY={pos?.y} onNewResearchClick={clickNewResearch} onClose={closeContextMenu} />;
}
