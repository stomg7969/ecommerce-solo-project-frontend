import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { SAVE_USER, STORE_PRODUCTS, ADD_TO_CART } from "./Types";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  activeUser: {},
  products: [],
  userOrders: []
};

const reducer = (state = initialState, action) => {
  console.log(
    "%c REDUCER TRIGGERED",
    "color: aqua; background-color: black",
    action
  );
  switch (action.type) {
    case SAVE_USER:
      return { ...state, activeUser: action.user };
    case STORE_PRODUCTS:
      return { ...state, products: action.products };
    case ADD_TO_CART:
      return { ...state, userOrders: action.order };
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
