import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { SAVE_USER, STORE_PRODUCTS } from "./Types";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  activeUser: {},
  products: []
};

const reducer = (state = initialState, action) => {
  console.log(
    "%c index.js file",
    "color: aqua",
    "state",
    state,
    "action",
    action
  );
  switch (action.type) {
    case SAVE_USER:
      return { ...state, activeUser: action.user };
    case STORE_PRODUCTS:
      return { ...state, products: action.products };
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
