import React, { Component } from "react";
import Aux from "../../hoc/Auxy";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const prices = {
  salad: 0.3,
  meat: 1.3,
  bacon: 0.8,
  cheese: 0.8
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    costs: 0,
    purchase: true,
    modal: false
  };

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
    alert("Yep");
  };

  render() {
    const disabledList = { ...this.state.ingredients };
    for (let key in disabledList) {
      disabledList[key] = this.state.ingredients[key] <= 0;
    }
    console.log(disabledList);
    return (
      <Aux>
        <Modal show={this.state.modal} modalClosed={this.hideModal}>
          <OrderSummary
            ingredients={this.state.ingredients}
            continue={this.continueModal}
            cancel={this.hideModal}
            total={this.state.costs}
          />
        </Modal>
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
    );
  }
}

export default BurgerBuilder;
