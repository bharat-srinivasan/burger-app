import React from "react";
import styles from "./BuildControl.css";

const buildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.label}>{props.label}</div>
      <button
        className={styles.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        -
      </button>
      <button className={styles.More} onClick={props.added}>
        +
      </button>
    </div>
  );
};

export default buildControl;
