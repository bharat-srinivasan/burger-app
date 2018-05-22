import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    };
  }

  addIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    console.log(updatedTotalPrice);
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });
  };

  removeIngredientHandler = type => {
    const removedIngredients = { ...this.state.ingredients };
    removedIngredients[type] = removedIngredients[type]
      ? removedIngredients[type] - 1
      : 0;
    const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: removedIngredients,
      totalPrice: updatedTotalPrice
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabled={disableInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
