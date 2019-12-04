import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  costs: 0
};

const prices = {
  salad: 1,
  meat: 5,
  bacon: 3,
  cheese: 2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        costs: state.costs + prices[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        costs: state.costs - prices[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        costs: 0
      };
    default:
      return state;
  }
};

export default reducer;
