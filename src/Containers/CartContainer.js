import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import backImg from "../Assets/go_back.png";
import { SAVE_USER } from "../Types";
import CartProduct from "../Components/CartProduct";

class CartContainer extends Component {
  state = {
    cart: {},
    paid: false,
    haveCartInfo: false,
    shipping: "regular"
  };

  componentDidUpdate() {
    console.log(
      "CDUUUUU",
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
        console.log("state of cart is updated from CDU")
      );
    }
  }
  componentDidMount() {
    console.log(
      "CDMMMMM",
      "currentUser",
      this.props.currentUser,
      "products",
      this.props.products,
      "userOrderDetail",
      this.props.userOrder,
      "Cart in State",
      this.state.cart
    );
    // fetch again to auto update the cart list.
    if (this.props.currentUser.orders && !this.state.haveCartInfo) {
      console.log("RUNNING THIS?");
      const token = localStorage.getItem("user_token");
      fetch(`${process.env.REACT_APP_HOST}/api/v1/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(data => {
          console.log("userrrrrrrrrrrrererr", data);
          this.props.dispatch({ type: SAVE_USER, payload: data.user });
        })
        .then(() => {
          const pendingCart = this.props.currentUser.orders.filter(
            order => order.status === "pending"
          );
          this.setState(
            { cart: pendingCart, haveCartInfo: true },
            console.log("state of cart is updated from CDM")
          );
        });
      // .then(data => {
      //   const pendingCart = data.user.orders.filter(
      //     order => order.status === "pending"
      //   );
      //   this.setState(
      //     { cart: pendingCart, haveCartInfo: true },
      //     console.log("state of cart is updated from CDM")
      //   );
      // });
    }
  }
  // changes the state of shipping method
  changeListener = e => {
    this.setState({ shipping: e.target.value });
  };
  // once submit, it will update 'this' order with new price, shipping, and status
  // after order, it will refresh the window to empty the cart.
  submitListener = e => {
    e.preventDefault();
    console.log("ORDERING PROCESS STARTING...", this.state.cart[0].id);
    fetch(`${process.env.REACT_APP_HOST}/orders/${this.state.cart[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        total_amount: this.props.totalAmount,
        shipping_method: this.state.shipping,
        status: "ordered"
      })
    })
      .then(r => {
        if (!r.ok) {
          console.log(r);
          this.props.history.push("/cart");
        } else {
          return r.json();
        }
      })
      // then call below component to update inventory for each product
      .then(orderObj => {
        orderObj.details.forEach(prodDetail => {
          console.log(
            "%c INVENTORY IS BEING UPDATED",
            "color: red; background-color: black",
            prodDetail
          );
          // in case customers are not logged in, I built a customer route to authorize user to only update inventory.
          fetch(
            `${process.env.REACT_APP_HOST}/updateinventory/${
              prodDetail.product.id
            }`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                inventory: prodDetail.product.inventory - prodDetail.quantity
              })
            }
          ).then(window.location.reload());
        });
      });
  };

  render() {
    let foundProduct;
    console.log(this.state.cart[0]);
    if (this.state.cart[0]) {
      const sortedCart = this.state.cart[0].details.sort(
        (x, y) => x.product_id - y.product_id
      );
      foundProduct = sortedCart.map(detail => {
        return (
          <CartProduct
            key={detail.id}
            detail={detail}
            products={this.props.products}
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
          <span>{this.props.userOrder.product.name} updated</span>
        ) : null}
        <h2>Cart</h2>
        <div>{foundProduct}</div>
        <div>
          <div>
            <form id="submit-order-form" onSubmit={this.submitListener}>
              <strong>Total: ${this.props.totalAmount}.00</strong>
              <br />
              <div>
                <span>Choose Shipping: </span>
                <label className="dropdown">
                  <select onChange={this.changeListener}>
                    <option name="regular" value="regular">
                      Regular
                    </option>
                    <option name="express" value="express">
                      Express
                    </option>
                    <option name="overNight" value="over night">
                      Over Night
                    </option>
                  </select>
                </label>
              </div>
              <div>
                <button>Pay to order</button>
              </div>
            </form>
          </div>
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
    userOrder: state.userOrder,
    totalAmount: state.totalAmount
  };
};

export default withRouter(connect(mapStateToProps)(CartContainer));
