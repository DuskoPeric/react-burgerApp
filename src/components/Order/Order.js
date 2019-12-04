import React, { Component } from "react";
import classes from "./Order.css";

class Order extends Component {
  render() {
    const ingredientsArr = [];

    for (let item in this.props.ingredients) {
      ingredientsArr.push({ name: item, value: this.props.ingredients[item] });
    }
    const ingredientsOutput = ingredientsArr.map(item => {
      return (
        <span
          key={item.name}
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px"
          }}
        >
          {item.name} ({item.value})
        </span>
      );
    });
    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>
          Price: <strong>USD {this.props.price}</strong>
        </p>
      </div>
    );
  }
}

export default Order;
