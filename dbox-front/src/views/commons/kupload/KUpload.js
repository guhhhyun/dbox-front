import { createElement } from "react";

console.debug("KUpload.js");

export default function KUpload({ children, component, onBeforeMouseEvent, onDropData, ...extra }) {
  /**
   * 마우스 이벤트 공통
   */
  const mouseEventListener = (event) => {
    onBeforeMouseEvent(event);
    if (event.dataTransfer.types.includes("Files")) {
      document.getElementById("kUploadDropzone").dispatchEvent(
        new DragEvent(event.type, {
          dataTransfer: event.dataTransfer,
        }),
      );
    }
  };

  return createElement(
    component || "div",
    {
      onDragEnter: mouseEventListener,
      onDragOver: (event) => {
        event.preventDefault();
        mouseEventListener(event);
      },
      onDragEnd: mouseEventListener,
      onDragLeave: mouseEventListener,
      onDrop: (event) => {
        event.preventDefault();
        mouseEventListener(event);
        if (!event.dataTransfer.types.includes("Files")) {
          onDropData(event);
        }
      },
      ...extra,
    },
    children,
  );
}
