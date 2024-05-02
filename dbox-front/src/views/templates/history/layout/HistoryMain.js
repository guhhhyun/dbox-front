import styles from "./HistoryMain.module.css";

console.debug("HistoryMain.js");

export default function HistoryMain({ children }) {
  return <div className={styles.main}>{children}</div>;
}
