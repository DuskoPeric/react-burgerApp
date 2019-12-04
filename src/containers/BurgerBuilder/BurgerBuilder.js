import React, { Component } from "react";
import * as BurgerBuilderActions from "../../store/actions/";
import Aux from "../../hoc/Auxy";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchase: true,
    modal: false,
    loading: false
  };

  componentDidMount() {
    if (!this.props.ings) {
      this.props.initIngredients();
    }
    this.props.setToFalseRedirect();
  }

  isForPurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(item => {
        return ingredients[item];
      })
      .reduce((sum, i) => {
        return sum + i;
      }, 0);
    return sum > 0;
  };

  showModal = () => {
    if (this.props.isAuth) {
      this.setState({ modal: true });
    } else {
      this.props.history.push("/auth");
    }
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
          <Spinner />
        )}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingName => {
      return dispatch(BurgerBuilderActions.addIngredient(ingName));
    },
    onIngredientsRemoved: ingName =>
      dispatch(BurgerBuilderActions.removeIngredient(ingName)),
    initIngredients: () => dispatch(BurgerBuilderActions.initIngredients()),
    setToFalseRedirect: () => dispatch(BurgerBuilderActions.redirectFalse())
  };
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    prices: state.burgerBuilder.costs,
    justorder: state.burgerBuilder.justorder,
    isAuth: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
