import React, { Component } from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {
  render() {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Burger Builder
        </NavigationItem>
        {this.props.isAuth ? (
          <NavigationItem link="/orders">Orders</NavigationItem>
        ) : null}
        {this.props.isAuth ? (
          <NavigationItem link="/logout">Logout</NavigationItem>
        ) : (
          <NavigationItem link="/auth">Auth</NavigationItem>
        )}
      </ul>
    );
  }
}

export default NavigationItems;
