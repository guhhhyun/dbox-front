import ProjectRootContextMenu from "views/templates/doc/contextmenu/ProjectRootContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";

console.debug("ProjectRootContextMenuContainer.js");

export default function ProjectRootContextMenuContainer({ open, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();

  /**
   * 새 프로젝트 생성
   */
  const clickNewProject = () => {
    gridRef.current.enableNewProject();
  };

  return <ProjectRootContextMenu open={open} posX={pos?.x} posY={pos?.y} onNewProjectClick={clickNewProject} onClose={closeContextMenu} />;
}
