import React, { Component } from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

class Toolbar extends Component {
  render() {
    return (
      <header className={classes.Toolbar}>
        <DrawerToggle clicked={this.props.drawerToggleClicked} />
        <div className={classes.Logo}>
          <Logo></Logo>
        </div>

        <nav className={classes.DesktopOnly}>
          <NavigationItems isAuth={this.props.isAuth} />
        </nav>
      </header>
    );
  }
}

export default Toolbar;
