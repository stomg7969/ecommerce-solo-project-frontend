import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import box from "./Assets/square_box.png";
import "./App.css";
// import NavBar from "./Components/NavBar";
import LandingDisplay from "./Components/LandingDisplay";
import CartContainer from "./Containers/CartContainer";
import UserContainer from "./Containers/UserContainer";
import ProductShowContainer from "./Containers/ProductShowContainer";

class App extends Component {
  render() {
    return (
      <div id="app-outter-div">
        {/* Always present */}

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
              const id = parseInt(routerProps.match.params.id);
              const product = this.props.products.find(
                product => product.id === id
              );
              console.log(
                "%c Before show page",
                "color: white; background-color: black",
                product
              );
              return <ProductShowContainer product={product} />;
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
