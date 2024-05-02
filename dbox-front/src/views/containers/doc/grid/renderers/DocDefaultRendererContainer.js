import DocDefaultRenderer from "views/templates/doc/grid/renderers/DocDefaultRenderer";

console.debug("DocDefaultRendererContainer.js");

export default function DocDefaultRendererContainer({ valueFormatted, value, node, onContextMenu }) {
  const text = valueFormatted ? valueFormatted : value;

  /**
   * 마우스 우클릭 메뉴
   */
  const openContextMenu = (event) => {
    onContextMenu(event, node);
  };

  return <DocDefaultRenderer text={text} onContextMenu={openContextMenu} />;
}
