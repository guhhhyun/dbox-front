import { Divider } from "@material-ui/core";
import styles from "./ContextMenuDivider.module.css";

export default function ContextMenuDivider() {
  return <Divider variant="middle" className={styles.divider} />;
}
