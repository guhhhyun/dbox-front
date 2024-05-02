import { useState } from "react";
import DocVersionRenderer from "views/templates/doc/grid/renderers/DocVersionRenderer";

console.debug("DocVersionRendererContainer.js");

export default function DocVersionRendererContainer({ valueFormatted, value, node, onContextMenu }) {
  const text = valueFormatted ? valueFormatted : value;

  const [opened, setOpened] = useState(false);

  /**
   * 모달 열기
   */
  const openModal = () => {
    setOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 마우스 우클릭 메뉴
   */
  const openContextMenu = (event) => {
    onContextMenu(event, node);
  };

  return (
    <DocVersionRenderer
      text={text}
      opened={opened}
      onDoubleClick={openModal}
      onModalOkClick={closeModal}
      onModalClose={closeModal}
      onContextMenu={openContextMenu}
    />
  );
}
