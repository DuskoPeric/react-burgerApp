import React, { Component } from "react";
import classes from "./Button.css";

class Button extends Component {
  render() {
    return (
      <button
        className={[classes.Button, classes[this.props.btnType]].join(" ")}
        onClick={this.props.clicked}
        disabled={this.props.disabled ? "disabled" : null}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
