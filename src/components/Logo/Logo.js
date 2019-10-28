import React, { Component } from "react";
import classes from "./Logo.css";
import logo from "../../assets/images/burger-logo.png";

class Logo extends Component {
  render() {
    return (
      <div className={classes.Logo}>
        <img src={logo} alt="Logo" />
      </div>
    );
  }
}

export default Logo;
