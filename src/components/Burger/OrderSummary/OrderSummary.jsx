import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ing => {
    return (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span>:{
          props.ingredients[ing]
        }
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <b>Total Price: {props.price.toFixed(2)}</b>
      </p>
      <p>Continue to checkout?</p>
      <Button type="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
