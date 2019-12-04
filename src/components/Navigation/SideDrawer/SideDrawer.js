import React, { Component } from "react";
import classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Aux from "../../../hoc/Auxy";
import Backdrop from "../../UI/Backdrop/Backdrop";

class SideDrawer extends Component {
  render() {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (this.props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
      <Aux>
        <Backdrop show={this.props.open} clicked={this.props.closed} />
        <div className={attachedClasses.join(" ")} onClick={this.props.closed}>
          <div className={classes.Logo}>
            <Logo></Logo>
          </div>

          <nav>
            <NavigationItems />
          </nav>
        </div>
      </Aux>
    );
  }
}

export default SideDrawer;
