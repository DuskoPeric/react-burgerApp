import React, { Component } from "react";

import classes from "./NavigationItem.css";

class NavigationItem extends Component {
  render() {
    return (
      <li className={classes.NavigationItem}>
        <a
          href={this.props.link}
          className={this.props.active ? classes.active : null}
        >
          {this.props.children}
        </a>
      </li>
    );
  }
}

export default NavigationItem;
