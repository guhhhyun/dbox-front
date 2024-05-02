import ContentIcon from "views/commons/icon/ContentIcon";

console.debug("DocNameRenderer.js");

export default function DocNameRenderer({ text, type, status, onClick, onDoubleClick, onContextMenu, onDragStart }) {
  return (
    <div onClick={onClick} onDoubleClick={onDoubleClick} onContextMenu={onContextMenu} onDragStart={onDragStart} draggable>
      <ContentIcon type={type} status={status} />
      {text}
    </div>
  );
}
