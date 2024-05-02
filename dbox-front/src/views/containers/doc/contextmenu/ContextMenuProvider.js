import { createContext, useContext, useState } from "react";
import ColumnContextMenuContainer from "views/containers/doc/contextmenu/ColumnContextMenuContainer";
import DocContextMenuContainer from "views/containers/doc/contextmenu/DocContextMenuContainer";
import EmptyContextMenuContainer from "views/containers/doc/contextmenu/EmptyContextMenuContainer";
import FolderContextMenuContainer from "views/containers/doc/contextmenu/FolderContextMenuContainer";
import ProjectRootContextMenuContainer from "views/containers/doc/contextmenu/ProjectRootContextMenuContainer";
import ResearchRootContextMenuContainer from "views/containers/doc/contextmenu/ResearchRootContextMenuContainer";
import ProjectContextMenuContainer from "views/containers/doc/contextmenu/ProjectContextMenuContainer";
import ResearchContextMenuContainer from "views/containers/doc/contextmenu/ResearchContextMenuContainer";
import SearchContextMenuContainer from "views/containers/doc/contextmenu/SearchContextMenuContainer";
import MultiFDContextMenuContainer from "./MultiFDContextMenuContainer";

export const [COLUMN, DOC, FOLDER, MULTI_FD, EMPTY, PROJECT_ROOT, RESEARCH_ROOT, PROJECT, RESEARCH, SEARCH] = Array(10).keys();

const MODAL_COMPONENTS = {
  [COLUMN]: ColumnContextMenuContainer,
  [DOC]: DocContextMenuContainer,
  [FOLDER]: FolderContextMenuContainer,
  [MULTI_FD]: MultiFDContextMenuContainer,
  [EMPTY]: EmptyContextMenuContainer,
  [PROJECT_ROOT]: ProjectRootContextMenuContainer,
  [RESEARCH_ROOT]: ResearchRootContextMenuContainer,
  [PROJECT]: ProjectContextMenuContainer,
  [RESEARCH]: ResearchContextMenuContainer,
  [SEARCH]: SearchContextMenuContainer,
};

const ContextMenuContext = createContext({
  openContextMenu: () => {},
  closeContextMenu: () => {},
});

export const useContextMenu = () => useContext(ContextMenuContext);

export function ContextMenuProvider({ pageKey, gridRef, children }) {
  const [store, setStore] = useState();
  const { type, pos, data, props } = store || {};

  /**
   * ContextMenu 열기
   *
   * @param {*} type ContextMenu 종류
   * @param {*} pageKey 페이지 키
   * @param {*} pos 마우스 위치
   * @param {*} data 데이터
   * @param {*} props 전달할 속성
   */
  const openContextMenu = (type, pos, data, props) => {
    setStore({
      ...store,
      type,
      pos,
      data,
      props,
    });
  };

  /**
   * ContextMenu 닫기
   */
  const closeContextMenu = () => {
    setStore({
      ...store,
      type: null,
      pos: null,
      data: null,
      props: {},
    });
  };

  /**
   * 모달 그리기
   */
  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[type];

    return ModalComponent && <ModalComponent gridRef={gridRef} pageKey={pageKey} pos={pos} data={data} open {...props} />;
  };

  return (
    <ContextMenuContext.Provider value={{ openContextMenu, closeContextMenu }}>
      <ColumnContextMenuContainer open={type === COLUMN} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <DocContextMenuContainer open={type === DOC} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <FolderContextMenuContainer open={type === FOLDER} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <MultiFDContextMenuContainer open={type === MULTI_FD} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <EmptyContextMenuContainer open={type === EMPTY} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <ProjectRootContextMenuContainer open={type === PROJECT_ROOT} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <ResearchRootContextMenuContainer open={type === RESEARCH_ROOT} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <ProjectContextMenuContainer open={type === PROJECT} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <ResearchContextMenuContainer open={type === RESEARCH} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      <SearchContextMenuContainer open={type === SEARCH} pageKey={pageKey} pos={pos} data={data} gridRef={gridRef} {...props} />
      {children}
    </ContextMenuContext.Provider>
  );
}
