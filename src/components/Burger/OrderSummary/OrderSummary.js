import React, { Component } from "react";
import Aux from "../../../hoc/Auxy";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(item => {
      return (
        <li key={item}>
          <span style={{ textTransform: "capitalize" }}>{item}</span> :{" "}
          {this.props.ingredients[item]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Total Price : {this.props.total}</p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
