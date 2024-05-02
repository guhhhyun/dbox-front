import styles from "./ManagerMain.module.css";

console.debug("ManagerMain.js");

export default function ManagerMain({ children }) {
  return <div className={styles.main}>{children}</div>;
}
