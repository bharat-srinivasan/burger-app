import React from "react";
import styles from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={styles.BuildControls}>
      <strong>Current Price: {props.price.toFixed(2)}</strong>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => {
              props.ingredientAdded(ctrl.type);
            }}
            removed={() => {
              props.ingredientRemoved(ctrl.type);
            }}
            disabled={!props.disabled[ctrl.type]}
          />
        );
      })}
      <button className={styles.OrderButton} disabled={!props.allowPurchase}>
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
