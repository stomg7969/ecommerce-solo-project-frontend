import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import backImg from "../Assets/go_back.png";
import CartProduct from "../Components/CartProduct";

class CartContainer extends Component {
  state = {
    cart: {},
    shipping_method: "",
    paid: false,
    totalAmount: 0.0
  };

  componentDidMount() {
    const pendingCart = this.props.userOrders.find(
      order => order.status === "pending"
    );
    if (pendingCart) {
      this.setState({ cart: pendingCart });
    }
  }
  // trying to display total amount to pay
  addToTotal = num => {
    this.setState(prevState => ({ totalAmount: prevState + num }));
  };

  render() {
    console.log("CartContainer: CART", this.state.cart);
    let foundProduct;
    if (this.state.cart.details) {
      foundProduct = this.state.cart.details.map(detail => {
        return (
          <CartProduct
            key={detail.id}
            detail={detail}
            products={this.props.products}
            amount={num => this.addToTotal(num)}
          />
        );
      });
    }
    return (
      <div id="cart">
        <img
          src={backImg}
          alt="go-back button"
          className="top-right go-back"
          onClick={() => this.props.history.push("/")}
        />
        <h2>Cart here</h2>
        <div>{foundProduct}</div>
        <div>
          {/* this maybe another component */}
          <p>total amount will be coming from this child componenet</p>
          <strong>Total: ${this.state.totalAmount}</strong>
          <br />
          <strong>Choose Shipping Method: {this.state.cart.ship}</strong>
          <br />
          <strong>status for just admin ???: {this.state.cart.status}</strong>
          <br />
          {/* order time is only for Admin */}
          {/* <p>{this.state.cart.ordered}</p> */}
        </div>
        <div>
          <button onClick={null}>Pay to order</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "%c mapStateToProps Cart",
    "color: brown; background-color: black",
    state.activeUser,
    state.userOrders,
    state.products
  );
  return {
    currentUser: state.activeUser,
    userOrders: state.userOrders,
    products: state.products
  };
};

export default withRouter(connect(mapStateToProps)(CartContainer));
