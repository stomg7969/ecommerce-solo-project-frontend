import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import backImg from "../Assets/go_back.png";

class CartContainer extends Component {
  componentDidMount() {
    fetch(`${process.env.REACT_APP_HOST}/order-details`)
      .then(r => r.json())
      .then(console.log);
  }

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

const mapStateToProps = state => {
  console.log(
    "%c mapStateToProps Cart",
    "color: brown; background-color: black",
    state.orders
  );
  return {
    orders: state.orders
  };
};

export default withRouter(connect(mapStateToProps)(CartContainer));
