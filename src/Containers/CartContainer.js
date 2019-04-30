import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import backImg from "../Assets/go_back.png";
import CartProduct from "../Components/CartProduct";

class CartContainer extends Component {
  state = {
    cart: {},
    shipping_method: "",
    paid: false,
    totalAmount: 0.0,
    haveCartInfo: false
  };

  componentDidMount() {
    console.log(
      "CDM",
      "currentUser",
      this.props.currentUser,
      "products",
      this.props.products,
      "userOrderDetail",
      this.props.userOrder,
      "Cart in State",
      this.state.cart
    );
    if (this.props.currentUser.orders && !this.state.haveCartInfo) {
      console.log("RUNNING THIS?");
      const pendingCart = this.props.currentUser.orders.filter(
        order => order.status === "pending"
      );
      this.setState(
        { cart: pendingCart, haveCartInfo: true },
        console.log("state of cart is updated")
      );
    }
  }
  componentDidUpdate() {
    console.log(
      "CDU",
      "currentUser",
      this.props.currentUser,
      "products",
      this.props.products,
      "userOrderDetail",
      this.props.userOrder,
      "Cart in State",
      this.state.cart
    );
    if (this.props.currentUser.orders && !this.state.haveCartInfo) {
      console.log("RUNNING THIS?");
      const pendingCart = this.props.currentUser.orders.filter(
        order => order.status === "pending"
      );
      this.setState(
        { cart: pendingCart, haveCartInfo: true },
        console.log("state of cart is updated")
      );
    }
  }

  // trying to display total amount to pay
  addToTotal = num => {
    this.setState(prevState => ({ totalAmount: prevState + num }));
  };

  render() {
    console.log("CartContainer: CART", this.state.cart[0]);

    let foundProduct;
    if (this.state.cart[0]) {
      foundProduct = this.state.cart[0].details.map(detail => {
        return (
          <CartProduct
            key={detail.id}
            detail={detail}
            products={this.props.products}
            amount={num => this.addToTotal(num)}
          />
        );
      });
    } else {
      return (
        <Fragment>
          <img
            src={backImg}
            alt="go-back button"
            className="top-right go-back"
            onClick={() => this.props.history.push("/")}
          />
          <h1>Add items to cart</h1>
        </Fragment>
      );
    }
    return (
      <div id="cart">
        <img
          src={backImg}
          alt="go-back button"
          className="top-right go-back"
          onClick={() => this.props.history.push("/")}
        />
        {this.props.userOrder.id ? (
          <span>{this.props.userOrder.product.name} added</span>
        ) : null}
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
    state.products,
    state.userOrders
  );
  return {
    currentUser: state.activeUser,
    products: state.products,
    userOrder: state.userOrder
  };
};

export default withRouter(connect(mapStateToProps)(CartContainer));
