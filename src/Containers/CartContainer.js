import React, { Component } from "react";
// import { Link } from "react-router-dom";

class CartContainer extends Component {
  render() {
    return (
      <div id="cart">
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <h2>Cart here</h2>
        <div>
          <p>show picked up items here</p>
          {/* this maybe another component */}
        </div>
        <div>
          <p>total amount, shipping info slection, and more</p>
          {/* this maybe another component */}
        </div>
      </div>
    );
  }
}

export default CartContainer;
