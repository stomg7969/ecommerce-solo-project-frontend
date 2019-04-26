import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import box from "./Assets/square_box.png";
import "./App.css";
import NavBar from "./Components/NavBar";
import LandingDisplay from "./Components/LandingDisplay";
import CartContainer from "./Containers/CartContainer";
import UserContainer from "./Containers/UserContainer";

class App extends Component {
  render() {
    return (
      <div id="app-outter-div">
        {/* Always present */}
        <NavBar />

        <Link to="/cart">
          <img id="cart-image" src={box} alt="box noun project" />
          <span id="cart-number">0</span>
        </Link>
        <Switch>
          {/* Cart will always show whether user is logged in or not, but will have restriction if not logged in. */}
          <Route path="/cart" component={CartContainer} />
          {/* User Container, if not logged in, log in button is present,
            if logged in, log out and profile buttons are present.
            should only exist in NavBar */}
          <Route path="/user" component={UserContainer} />
          <Route path="/" component={LandingDisplay} />
        </Switch>
      </div>
    );
  }
}

export default App;
