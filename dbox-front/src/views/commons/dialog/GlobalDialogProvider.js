import { createContext, useContext, useState } from "react";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";

export const [ALERT_DIALOG, CONFIRM_DIALOG] = Array(2).keys();

const MODAL_COMPONENTS = {
  [ALERT_DIALOG]: AlertDialog,
  [CONFIRM_DIALOG]: ConfirmDialog,
};

const GlobalDialogContext = createContext({
  openDialog: () => {},
  closeDialog: () => {},
});

export const useGlobalDialog = () => useContext(GlobalDialogContext);

export function GlobalDialogProvider({ children }) {
  const [store, setStore] = useState();
  const { type, props } = store || {};

  /**
   * Dialog 열기
   *
   * @param {*} type Dialog 종류
   * @param {*} props 전달할 속성
   */
  const openDialog = (type, props) => {
    setStore({
      ...store,
      type,
      props,
    });
  };

  /**
   * Dialog 닫기
   */
  const closeDialog = () => {
    setStore({
      ...store,
      type: null,
      props: {},
    });
  };

  /**
   * 공통 옵션 그리기
   */
  const dialogOptions = {
    onOkClick: () => {
      if (typeof props.onOkClick === "function") props.onOkClick();
      closeDialog();
    },
    onClose: () => {
      if (typeof props.onClose === "function") props.onClose();
      closeDialog();
    },
    ...props,
  };

  return (
    <GlobalDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <AlertDialog open={type === ALERT_DIALOG} {...dialogOptions} />
      <ConfirmDialog open={type === CONFIRM_DIALOG} {...dialogOptions} />
    </GlobalDialogContext.Provider>
  );
}
