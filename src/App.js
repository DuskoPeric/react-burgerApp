import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as Actions from "./store/actions/";

class App extends Component {
  componentDidMount() {
    this.props.authCheckout();
  }
  render() {
    let routes = null;
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckout: () => dispatch(Actions.authCheckState())
  };
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
