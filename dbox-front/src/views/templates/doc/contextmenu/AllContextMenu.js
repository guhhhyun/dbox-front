import { Fragment } from "react";
import ColumnContextMenuContainer from "views/containers/doc/contextmenu/ColumnContextMenuContainer";
import DocContextMenuContainer from "views/containers/doc/contextmenu/DocContextMenuContainer";
import EmptyContextMenuContainer from "views/containers/doc/contextmenu/EmptyContextMenuContainer";
import FolderContextMenuContainer from "views/containers/doc/contextmenu/FolderContextMenuContainer";
import ProjectRootContextMenuContainer from "views/containers/doc/contextmenu/ProjectRootContextMenuContainer";
import SearchContextMenuContainer from "views/containers/doc/contextmenu/SearchContextMenuContainer";

export default function AllContextMenu({ gridRefs }) {
  return (
    <Fragment>
      <ColumnContextMenuContainer gridRefs={gridRefs} />
      <DocContextMenuContainer gridRefs={gridRefs} />
      <FolderContextMenuContainer gridRefs={gridRefs} />
      <EmptyContextMenuContainer gridRefs={gridRefs} />
      <SearchContextMenuContainer gridRefs={gridRefs} />
      <ProjectRootContextMenuContainer gridRefs={gridRefs} />
    </Fragment>
  );
}
