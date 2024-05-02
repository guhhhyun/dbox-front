import { useState } from "react";
import DocFeedbackRenderer from "views/templates/doc/grid/renderers/DocFeedbackRenderer";

console.debug("DocFeedbackRendererContainer.js");

export default function DocFeedbackRendererContainer({ valueFormatted, value, node, onContextMenu }) {
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

  return <DocFeedbackRenderer text={text} opened={opened} onDoubleClick={openModal} onModalClose={closeModal} onContextMenu={openContextMenu} />;
}
