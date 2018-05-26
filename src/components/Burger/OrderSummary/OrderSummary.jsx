import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  componentWillUpdate() {
    console.debug("OrderSummary: componentWillUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ing => {
      return (
        <li key={ing}>
          <span style={{ textTransform: "capitalize" }}>{ing}</span>:{
            this.props.ingredients[ing]
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
          <b>Total Price: {this.props.price.toFixed(2)}</b>
        </p>
        <p>Continue to checkout?</p>
        <Button type="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button type="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
