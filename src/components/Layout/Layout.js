import React, { Component } from "react";
import Aux from "../../hoc/Auxy";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrwaer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
        <Toolbar
          drawerToggleClicked={this.SideDrwaerToggleHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrwaer closed={this.sideMenuClose} open={this.state.showMenu} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
