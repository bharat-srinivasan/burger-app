import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  async componentDidMount() {
    try {
      const response = await axiosInstance.get("/ingredients.json");
      console.log(response.data);
      this.setState({
        ingredients: response.data
      });
      this.updatePurchasable(response.data);
    } catch (err) {
      this.setState({ error: true });
    }
  }

  updatePurchasable(updatedIngredients) {
    let ingredientsPrice = Object.values(updatedIngredients).reduce(
      (total, current) => {
        return total + current;
      }
    );
    this.setState({
      purchasable: ingredientsPrice > 0
    });
  }

  addIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;
    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });
    this.updatePurchasable(updatedIngredients);
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
    this.updatePurchasable(removedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  async purchaseContinueHandler() {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Bharat",
        contact: "182712872"
      }
    };
    try {
      const response = await axiosInstance.post("/orders.json", order);
    } finally {
      this.setState({
        purchasing: false,
        loading: false
      });
    }
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients could not be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            disabled={disableInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            allowPurchase={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={() => this.purchaseContinueHandler()}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          onClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
