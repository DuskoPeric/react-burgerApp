import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
        console.log(this.state.orders);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
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

export default Orders;
