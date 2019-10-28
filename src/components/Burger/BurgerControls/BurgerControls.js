import React, { Component } from "react";
import classes from "./BurgerControls.css";
import BurgerControl from "./BurgerControl/BurgerControl";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" }
];

class BurgerControls extends Component {
  render() {
    return (
      <div className={classes.BurgerControls}>
        {this.props.price > 0 ? (
          <p>
            Price: <strong>{this.props.price}</strong>
          </p>
        ) : (
          <p>
            <strong>Chose ingredients</strong>
          </p>
        )}
        {controls.map(item => (
          <BurgerControl
            key={item.type}
            label={item.label}
            added={() => this.props.addIngrenient(item.type)}
            removed={() => this.props.removeIngrenient(item.type)}
            disabledItem={this.props.disabledList[item.type]}
          />
        ))}
        <button
          className={classes.OrderButton}
          disabled={this.props.purchase}
          onClick={this.props.show}
        >
          ORDER NOW
        </button>
      </div>
    );
  }
}

export default BurgerControls;
