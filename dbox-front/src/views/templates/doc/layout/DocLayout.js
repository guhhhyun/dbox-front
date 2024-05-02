import CssBaseline from "@material-ui/core/CssBaseline";
import TopHeaderContainer from "views/containers/header/TopHeaderContainer";
import styles from "./DocLayout.module.css";

console.debug("DocLayout.js");

export default function DocLayout({ children }) {
  return (
    <div className={styles.root}>
      <TopHeaderContainer />
      <CssBaseline />
      {children}
    </div>
  );
}
