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
  TOTAL_AMOUNT
} from "./Types";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  activeUser: {},
  products: [],
  userOrder: {},
  numOfCartItems: 0,
  totalAmount: 0
};

const reducer = (state = initialState, action) => {
  console.log(
    "%c REDUCER TRIGGERED",
    "color: aqua; background-color: black",
    action
  );
  switch (action.type) {
    case SAVE_USER:
      return { ...state, activeUser: action.payload };
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
