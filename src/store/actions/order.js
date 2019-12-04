import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import * as actions from "./index";

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerEnd = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_END
  };
};

export const orderEnd = () => {
  return {
    type: actionTypes.ORDER_END
  };
};

export const redirectFalse = () => {
  return {
    type: actionTypes.REDIRECT_FALSE
  };
};

export const purchaseBurgerOrder = (orderData, token) => {
  return dispatch => {
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerEnd());
        dispatch(orderEnd());
        dispatch(actions.initIngredients());
      })
      .catch(error => {
        console.log(error);
        dispatch(purchaseBurgerEnd());
      });
  };
};

export const setOrders = orders => {
  return {
    type: actionTypes.SET_ORDERS,
    orders: orders
  };
};

export const getOrders = (token, userId) => {
  return dispatch => {
    const query =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get("orders.json" + query).then(response => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      //this.setState({ loading: false, orders: fetchedOrders });

      dispatch(setOrders(fetchedOrders));
    });
  };
};
