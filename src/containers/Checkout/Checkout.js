import React, { Component } from "react";

import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  chCancelH = () => {
    this.props.history.goBack();
  };

  chContinueH = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSumary
          ingredients={this.props.ings}
          chCancel={this.chCancelH}
          chContinue={this.chContinueH}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
