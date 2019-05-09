import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import {
  SAVE_USER,
  STORE_PRODUCTS,
  ADD_TO_CART,
  RENDER_ITEM_AMOUNT,
  ADD_ONE,
  TOTAL_AMOUNT,
  ADMIN_TOTAL_SALES,
  ADMIN_ORDER_QUANTITY
} from "./Types";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  activeUser: {},
  products: [],
  userOrder: {},
  numOfCartItems: 0,
  totalAmount: 0,
  adminTotalSales: 0.0,
  adminOrderQuantity: 0
};

const reducer = (state = initialState, action) => {
  console.log(
    "%c REDUCER TRIGGERED",
    "color: aqua; background-color: black",
    action
  );
  switch (action.type) {
    case SAVE_USER:
      // debugger;
      // const newUser = Object.assign({}, action.payload);
      // const length = newUser.orders.length;
      // newUser.orders = [
      //   ...newUser.orders.splice(0, length - 1),
      //   Object.assign({}, newUser.orders[length - 1], { details: [] })
      // ];
      //
      // newUser.orders.details = []

      return { ...state, activeUser: action.payload };
    // return Object.assign({}, state, {
    //   activeUser: newUser
    // });
    case STORE_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_TO_CART:
      return { ...state, userOrder: action.payload };
    case RENDER_ITEM_AMOUNT:
      return { ...state, numOfCartItems: action.payload };
    case ADD_ONE:
      return { ...state, numOfCartItems: state.numOfCartItems + 1 };
    case TOTAL_AMOUNT:
      return { ...state, totalAmount: state.totalAmount + action.payload };
    case ADMIN_TOTAL_SALES:
      return {
        ...state,
        adminTotalSales: state.adminTotalSales + action.payload
      };
    case ADMIN_ORDER_QUANTITY:
      return {
        ...state,
        adminOrderQuantity: state.adminOrderQuantity + action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
