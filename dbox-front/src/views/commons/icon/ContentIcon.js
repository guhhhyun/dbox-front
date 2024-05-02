import { ReactComponent as IconFolder } from "assets/imgs/icon-folder.svg";
import { ReactComponent as IconFile } from "assets/imgs/icon-doc.svg";
import { ReactComponent as IconTrash } from "assets/imgs/icon-trash.svg";
import { ReactComponent as IconExel } from "assets/imgs/icon-excel.svg";
import { ReactComponent as IconPpt } from "assets/imgs/icon-ppt.svg";
import { ReactComponent as IconWord } from "assets/imgs/icon-word.svg";
import { ReactComponent as IconPdf } from "assets/imgs/icon-pdf.svg";

import { ReactComponent as IconLockFolder } from "assets/imgs/icon-lockFolder.svg";
import { ReactComponent as IconLockFile } from "assets/imgs/icon-lockDoc.svg";
import { ReactComponent as IconLockExcel } from "assets/imgs/icon-lockExcel.svg";
import { ReactComponent as IconLockPpt } from "assets/imgs/icon-lockPpt.svg";
import { ReactComponent as IconLockWord } from "assets/imgs/icon-lockWord.svg";
import { ReactComponent as IconLockPdf } from "assets/imgs/icon-lockPdf.svg";

import { ReactComponent as IconIncomingFolder } from "assets/imgs/icon-incomingFolder.svg";
import { ReactComponent as IconIncomingFile } from "assets/imgs/icon-incomingDoc.svg";
import { ReactComponent as IconIncomingExcel } from "assets/imgs/icon-incomingExcel.svg";
import { ReactComponent as IconIncomingPpt } from "assets/imgs/icon-incomingPpt.svg";
import { ReactComponent as IconIncomingWord } from "assets/imgs/icon-incomingWord.svg";
import { ReactComponent as IconIncomingPdf } from "assets/imgs/icon-incomingPdf.svg";

import { ReactComponent as IconOutgoingFolder } from "assets/imgs/icon-outgoingFolder.svg";
import { ReactComponent as IconOutgoingFile } from "assets/imgs/icon-outgoingDoc.svg";
import { ReactComponent as IconOutgoingExcel } from "assets/imgs/icon-outgoingExcel.svg";
import { ReactComponent as IconOutgoingPpt } from "assets/imgs/icon-outgoingPpt.svg";
import { ReactComponent as IconOutgoingWord } from "assets/imgs/icon-outgoingWord.svg";
import { ReactComponent as IconOutgoingPdf } from "assets/imgs/icon-outgoingPdf.svg";

import { ICON_STATUS, ICON_TYPE } from "constants/code-constants";
import styles from "./ContentIcon.module.css";

console.debug("ContentIcon.js");

export default function ContentIcon({ type, status }) {
  const normalIcon =
    type === ICON_TYPE.DOCUMENT.key ? (
      <IconFile className={styles.icon} />
    ) : type === ICON_TYPE.FOLDER.key ? (
      <IconFolder className={styles.icon} />
    ) : type === ICON_TYPE.TRASH.key ? (
      <IconTrash className={styles.icon} />
    ) : type === ICON_TYPE.EXCEL.key ? (
      <IconExel className={styles.icon} />
    ) : type === ICON_TYPE.PPT.key ? (
      <IconPpt className={styles.icon} />
    ) : type === ICON_TYPE.WORD.key ? (
      <IconWord className={styles.icon} />
    ) : type === ICON_TYPE.PDF.key ? (
      <IconPdf className={styles.icon} />
    ) : null;

  const lockIcon =
    type === ICON_TYPE.DOCUMENT.key ? (
      <IconLockFile className={styles.icon} />
    ) : type === ICON_TYPE.FOLDER.key ? (
      <IconLockFolder className={styles.icon} />
    ) : type === ICON_TYPE.EXCEL.key ? (
      <IconLockExcel className={styles.icon} />
    ) : type === ICON_TYPE.PPT.key ? (
      <IconLockPpt className={styles.icon} />
    ) : type === ICON_TYPE.WORD.key ? (
      <IconLockWord className={styles.icon} />
    ) : type === ICON_TYPE.PDF.key ? (
      <IconLockPdf className={styles.icon} />
    ) : null;

  const incomingIcon =
    type === ICON_TYPE.DOCUMENT.key ? (
      <IconIncomingFile className={styles.icon} />
    ) : type === ICON_TYPE.FOLDER.key ? (
      <IconIncomingFolder className={styles.icon} />
    ) : type === ICON_TYPE.EXCEL.key ? (
      <IconIncomingExcel className={styles.icon} />
    ) : type === ICON_TYPE.PPT.key ? (
      <IconIncomingPpt className={styles.icon} />
    ) : type === ICON_TYPE.WORD.key ? (
      <IconIncomingWord className={styles.icon} />
    ) : type === ICON_TYPE.PDF.key ? (
      <IconIncomingPdf className={styles.icon} />
    ) : null;

  const outgoingIcon =
    type === ICON_TYPE.DOCUMENT.key ? (
      <IconOutgoingFile className={styles.icon} />
    ) : type === ICON_TYPE.FOLDER.key ? (
      <IconOutgoingFolder className={styles.icon} />
    ) : type === ICON_TYPE.EXCEL.key ? (
      <IconOutgoingExcel className={styles.icon} />
    ) : type === ICON_TYPE.PPT.key ? (
      <IconOutgoingPpt className={styles.icon} />
    ) : type === ICON_TYPE.WORD.key ? (
      <IconOutgoingWord className={styles.icon} />
    ) : type === ICON_TYPE.PDF.key ? (
      <IconOutgoingPdf className={styles.icon} />
    ) : null;

  return status === ICON_STATUS.LOCK.key
    ? lockIcon
    : status === ICON_STATUS.INCOMING.key
    ? incomingIcon
    : status === ICON_STATUS.OUTGOING.key
    ? outgoingIcon
    : normalIcon;
}
