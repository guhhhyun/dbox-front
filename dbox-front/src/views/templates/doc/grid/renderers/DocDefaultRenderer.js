console.debug("DocDefaultRenderer.js");

export default function DocDefaultRenderer({ text, onClick, onContextMenu }) {
  return (
    <div style={{ width: "100%", textAlign: !text ? "left" : undefined }} onClick={onClick} onContextMenu={onContextMenu}>
      {text || "-"}
    </div>
  );
}
