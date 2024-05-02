import { useState } from "react";
import ConfirmModalDialog from "views/templates/manager/common/ConfirmModalDialog";

export default function DialogContainer(props) {
  const [opened, setOpened] = useState(false);

  const onModalOkClick = () => {
    props.onModalSave();
    setOpened(false);
  };

  const openModal = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
  };

  return <ConfirmModalDialog option={props.option} opened={opened} onButtonClick={openModal} onModalOkClick={onModalOkClick} onModalClose={closeModal} />;
}
