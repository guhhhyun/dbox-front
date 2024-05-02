import { useState } from "react";
import DocApprovalRenderer from "views/templates/doc/grid/renderers/DocApprovalRenderer";

console.debug("DocApprovalRendererContainer.js");

export default function DocApprovalRendererContainer({ valueFormatted, value, node, onContextMenu }) {
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

  return <DocApprovalRenderer opened={opened} onDoubleClick={openModal} onModalClose={closeModal} onContextMenu={openContextMenu} />;
}
