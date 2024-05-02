import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ManagerSidebarContainer from "views/containers/manager/layout/ManagerSidebarContainer";
import ManagerMain from "views/templates/manager/layout/ManagerMain";
import styles from "./ManagerLayout.module.css";

console.debug("ManagerLayout.js");

export default function ManagerLayout({ children }) {
  return (
    <div className={styles.root}>
      <CssBaseline />
      <ManagerSidebarContainer />
      {children}
    </div>
  );
}
