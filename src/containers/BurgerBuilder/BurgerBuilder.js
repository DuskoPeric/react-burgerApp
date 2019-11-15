import React, { Component } from "react";
import * as actionTypes from "../../store/actions";
import Aux from "../../hoc/Auxy";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders.js";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchase: true,
    modal: false,
    loading: false
  };

  componentDidMount() {
    // axios
    //   .get("https://burger-6aa89.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     const posts = response.data;
    //     this.setState({ ingredients: posts });
    //   });
  }

  isForPurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(item => {
        return ingredients[item];
      })
      .reduce((sum, i) => {
        return sum + i;
      }, 0);
    console.log(sum);
    return sum > 0;
  };

  showModal = () => {
    this.setState({ modal: true });
  };
  hideModal = () => {
    this.setState({ modal: false });
  };

  continueModal = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledList = { ...this.props.ings };
    for (let key in disabledList) {
      disabledList[key] = this.props.ings[key] <= 0;
    }
    let orderSummary;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    } else {
      if (this.props.ings) {
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ings}
            continue={this.continueModal}
            cancel={this.hideModal}
            total={this.props.prices}
          />
        );
      }
    }
    return (
      <Aux>
        <Modal show={this.state.modal} modalClosed={this.hideModal}>
          {orderSummary}
        </Modal>
        {this.props.ings ? (
          <Aux>
            <Burger ingredients={this.props.ings} />
            <BurgerControls
              addIngrenient={this.props.onIngredientsAdded}
              removeIngrenient={this.props.onIngredientsRemoved}
              disabledList={disabledList}
              price={this.props.prices}
              purchase={!this.isForPurchase(this.props.ings)}
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

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingName => {
      return dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
      });
    },
    onIngredientsRemoved: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    prices: state.costs
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
