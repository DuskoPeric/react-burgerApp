import React, { Component } from "react";
import Aux from "../../hoc/Auxy";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders.js";
import Spinner from "../../components/UI/Spinner/Spinner";

const prices = {
  salad: 0.3,
  meat: 1.3,
  bacon: 0.8,
  cheese: 0.8
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    costs: 0,
    purchase: true,
    modal: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://burger-6aa89.firebaseio.com/ingredients.json")
      .then(response => {
        const posts = response.data;
        this.setState({ ingredients: posts });
        console.log(this.state.ingredients);
      });
  }
  addIngredient = type => {
    const newIngredient = this.state.ingredients[type] + 1;
    const upgratedIngredients = { ...this.state.ingredients };
    upgratedIngredients[type] = newIngredient;

    const newPrice = Math.round((this.state.costs + prices[type]) * 10) / 10;

    this.setState({ ingredients: upgratedIngredients, costs: newPrice });
    this.isForPurchase(upgratedIngredients);
  };

  removeIngredient = type => {
    if (this.state.ingredients[type] > 0) {
      const upgratedIngredients = { ...this.state.ingredients };
      upgratedIngredients[type] = this.state.ingredients[type] - 1;

      const newPrice = Math.round((this.state.costs - prices[type]) * 10) / 10;

      this.setState({ ingredients: upgratedIngredients, costs: newPrice });
      this.isForPurchase(upgratedIngredients);
    }
  };

  isForPurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(item => {
        return ingredients[item];
      })
      .reduce((sum, i) => {
        return sum + i;
      }, 0);

    sum > 0
      ? this.setState({ purchase: false })
      : this.setState({ purchase: true });
  };

  showModal = () => {
    this.setState({ modal: true });
  };
  hideModal = () => {
    this.setState({ modal: false });
  };

  continueModal = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.costs,
      customer: {
        name: "Dusko",
        addres: {
          street: "Cankareva",
          number: 13
        }
      },
      delivery: "fast"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.setState({ modal: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ modal: false });
        console.log(error);
      });
  };

  render() {
    const disabledList = { ...this.state.ingredients };
    for (let key in disabledList) {
      disabledList[key] = this.state.ingredients[key] <= 0;
    }
    console.log(disabledList);
    let orderSummary;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    } else {
      if (this.state.ingredients) {
        orderSummary = (
          <OrderSummary
            ingredients={this.state.ingredients}
            continue={this.continueModal}
            cancel={this.hideModal}
            total={this.state.costs}
          />
        );
      }
    }
    return (
      <Aux>
        <Modal show={this.state.modal} modalClosed={this.hideModal}>
          {orderSummary}
        </Modal>
        {this.state.ingredients ? (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BurgerControls
              addIngrenient={this.addIngredient}
              removeIngrenient={this.removeIngredient}
              disabledList={disabledList}
              price={this.state.costs}
              purchase={this.state.purchase}
              show={this.showModal}
            />
          </Aux>
        ) : (
          <p>No ingredients</p>
        )}
      </Aux>
    );
  }
}

export default BurgerBuilder;
