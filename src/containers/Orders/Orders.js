import React, { Component } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as OrderActions from "../../store/actions/";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    this.props.getOrders(this.props.token, this.props.userId);
  }
  render() {
    return (
      <div>
        {this.props.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: (token, id) => {
      return dispatch(OrderActions.getOrders(token, id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
