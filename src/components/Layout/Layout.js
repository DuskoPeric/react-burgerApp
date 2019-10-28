import React, { Component } from "react";
import Aux from "../../hoc/Auxy";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrwaer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showMenu: false
  };
  sideMenuClose = () => {
    this.setState({ showMenu: false });
  };

  SideDrwaerToggleHandler = () => {
    this.setState(prewState => {
      return { showMenu: !prewState.showMenu };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.SideDrwaerToggleHandler} />
        <SideDrwaer closed={this.sideMenuClose} open={this.state.showMenu} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
