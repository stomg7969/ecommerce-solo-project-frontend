import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import backImg from "../Assets/go_back.png";

class CartContainer extends Component {
  render() {
    return (
      <div id="cart">
        <img
          src={backImg}
          alt="go-back button"
          className="top-right go-back"
          onClick={() => this.props.history.push("/")}
        />
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <h2>Cart here</h2>
        <div>
          <p>show picked up items here</p>
          {/* this maybe another component */}
        </div>
        <div>
          <p>total amount, shipping info selection, and more</p>
          {/* this maybe another component */}
        </div>
      </div>
    );
  }
}

export default withRouter(CartContainer);
