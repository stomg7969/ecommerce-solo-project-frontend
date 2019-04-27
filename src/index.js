import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  activeUser: {}
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
    case "save_active_user":
      return { activeUser: action.user };
    // return { ...state, activeUser: action.user };
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
