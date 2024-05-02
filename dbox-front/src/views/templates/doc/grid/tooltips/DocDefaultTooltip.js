import React, { forwardRef, useImperativeHandle } from "react";
import styles from "./DocDefaultTooptip.module.css";

const DocDefaultTooltip = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getReactContainerClasses: () => [styles.tooltip],
  }));

  return (
    <div className={styles.tooltip}>
      <span>{props.value}</span>
    </div>
  );
});
export default DocDefaultTooltip;
