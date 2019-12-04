import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  redirect: false,
  orders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_END:
      return {
        ...state,
        loading: false
      };
    case actionTypes.ORDER_END:
      return {
        ...state,
        redirect: true
      };
    case actionTypes.REDIRECT_FALSE:
      return {
        ...state,
        redirect: false
      };
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      };
    default:
      return state;
  }
};

export default reducer;
