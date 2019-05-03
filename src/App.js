import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { STORE_PRODUCTS, SAVE_USER, RENDER_ITEM_AMOUNT } from "./Types";
import "./App.css";
import logo from "./Assets/moonya crown.png";
import LandingDisplay from "./Components/LandingDisplay";
import CartContainer from "./Containers/CartContainer";
import UserContainer from "./Containers/UserContainer";
import ProductShowContainer from "./Containers/ProductShowContainer";

class App extends Component {
  componentDidMount() {
    // token and authorization is unnecessary because users are able to see
    // all products even when not logged in.
    fetch(`${process.env.REACT_APP_HOST}/products`)
      .then(r => r.json())
      .then(products =>
        this.props.dispatch({ type: STORE_PRODUCTS, payload: products })
      );

    if (localStorage.getItem("user_token")) {
      const token = localStorage.getItem("user_token");
      // GET request to always store this user object to Redux store
      fetch(`${process.env.REACT_APP_HOST}/api/v1/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(data => {
          const pendingOrder = data.user.orders.filter(
            order => order.status === "pending"
          );
          if (pendingOrder.length) {
            this.props.dispatch({
              type: RENDER_ITEM_AMOUNT,
              payload: pendingOrder[0].details.length
            });
          }
          this.props.dispatch({ type: SAVE_USER, payload: data.user });
        });
    }
  }

  render() {
    return (
      <div id="app-outter-div">
        {/* Always present */}
        <div id="moonya-logo">
          <img src={logo} alt="moonya logo" />
        </div>
        <Switch>
          {/* Cart will always show whether user is logged in or not, but will have restriction if not logged in. */}
          <Route path="/cart" component={CartContainer} />
          {/* User Container, if not logged in, log in button is present,
            if logged in, log out and profile buttons are present.
            should only exist in NavBar */}
          <Route path="/user" component={UserContainer} />
          <Route
            path="/products/:id"
            render={routerProps => {
              if (this.props.products.length > 0) {
                const id = parseInt(routerProps.match.params.id);
                const product = this.props.products.find(
                  product => product.id === id
                );
                console.log(
                  "%c Before calling show page(APP.js)",
                  "color: white; background-color: black",
                  product
                );
                return <ProductShowContainer product={product} />;
              } else {
                return <h1>Loading</h1>;
              }
            }}
          />
          <Route path="/" component={LandingDisplay} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(App);
