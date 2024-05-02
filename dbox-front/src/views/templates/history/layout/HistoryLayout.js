import CssBaseline from "@material-ui/core/CssBaseline";
import HistorySidebarContainer from "views/containers/history/layout/HistorySidebarContainer";
import HistoryMain from "views/templates/history/layout/HistoryMain";
import styles from "./HistoryLayout.module.css";

console.debug("HistoryLayout.js");

export default function HistoryLayout({ children }) {
  return (
    <div className={styles.root}>
      <CssBaseline />
      <HistorySidebarContainer />
      <HistoryMain>{children}</HistoryMain>
    </div>
  );
}
