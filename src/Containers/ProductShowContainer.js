import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import box from "../Assets/square_box.png";
import backImg from "../Assets/go_back.png";
import { ADD_TO_CART, ADD_ONE } from "../Types";

class ProductCard extends Component {
  state = {
    imgClicked: false,
    quantity: 1,
    size: ""
  };

  clickListener = () => {
    this.setState(prevState => ({
      imgClicked: !prevState.imgClicked
    }));
  };

  changeListener = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // Customers can still order without loggin in. This function is called from this.submitListener => body
  // right now, 'null' does not work.
  getUserId = () => {
    if (localStorage.getItem("user_token")) {
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("user_token");
      const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
      return decoded.user_id;
    } else {
      return null;
    }
  };
  // right now, only logged in users can use the site.
  // stretch goal is non-logged in users can also shop.
  // When click add to cart button, unless the user has pending order, system will create a pending order and add order details into that order.
  submitListener = e => {
    e.preventDefault();
    const { quantity, size } = this.state;
    if (quantity < 1 || size === "") {
      alert("check your input");
    } else {
      const pendingOrder = this.props.currentUser.orders.find(
        order => order.status === "pending"
      );
      if (pendingOrder) {
        console.log("pendingOrder :", pendingOrder);
        const userToken = localStorage.getItem("user_token");
        // look through each detail product, check if product id and size are the same, if, then update
        const foundDetail = pendingOrder.details.find(
          detail =>
            detail.product_id === this.props.product.id && detail.size === size
        );
        console.log("SAME THING", foundDetail);
        if (foundDetail) {
          const detailQuantity = foundDetail.quantity;
          const detailId = foundDetail.id;
          console.log("PATCHING", detailQuantity, quantity);
          fetch(
            `${process.env.REACT_APP_HOST}/api/v1/add_to_cart/${detailId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`
              },
              body: JSON.stringify({
                quantity: parseInt(detailQuantity) + parseInt(quantity)
              })
            }
          )
            .then(r => r.json())
            .then(newOrder => {
              this.props.dispatch({ type: ADD_TO_CART, payload: newOrder });
            });
        } else {
          console.log("POSTING");
          fetch(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              order_id: pendingOrder.id,
              product_id: this.props.product.id,
              quantity: quantity,
              size: size
            })
          })
            .then(r => r.json())
            .then(newOrder => {
              this.props.dispatch({ type: ADD_TO_CART, payload: newOrder });
              this.props.dispatch({ type: ADD_ONE });
            });
        }
      } else {
        console.log("no pendingOrder");
        fetch(`${process.env.REACT_APP_HOST}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            user_id: this.getUserId(),
            status: "pending"
          })
        })
          .then(r => r.json())
          .then(data => {
            // this.props.dispatch({ type: ADD_TO_CART, payload: data });
            // not using Redux for cart because it needs to be persisting.
            fetch(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                order_id: data.id,
                product_id: this.props.product.id,
                quantity: quantity,
                size: size
              })
            })
              .then(r => r.json())
              .then(newOrder => {
                this.props.dispatch({ type: ADD_TO_CART, payload: newOrder });
                this.props.dispatch({ type: ADD_ONE });
              });
          });
      }
    }
  };

  render() {
    const { product } = this.props;
    return (
      <Fragment>
        <div id="product-showpage">
          <img
            src={backImg}
            alt="go-back button"
            className="top-right go-back"
            onClick={() => this.props.history.push("/")}
          />
          <Link to="/cart">
            <img id="cart-image" src={box} alt="box noun project" />
            <span id="cart-number">
              {this.props.itemNum ? this.props.itemNum : 0}
            </span>
          </Link>
          {/* each card has a link to product show page */}
          <div className="product details">
            <h2>{product.name}</h2>
            <h2>${product.price}0</h2>
            <strong>Category: </strong>
            <p>{product.category}</p>
            <strong>Color: </strong>
            <p>{product.color}</p>
            <strong>Gender: </strong>
            <p>{product.gender}</p>
            <strong>Material: </strong>
            <p>{product.material.join(", ")}</p>
          </div>
          <div id="showpage-img">
            <div>
              <img
                src={this.state.imgClicked ? product.imgBack : product.imgFront}
                alt="product images"
                className="product-image"
              />
            </div>
          </div>
          <div className="customer-input">
            <form onSubmit={this.submitListener}>
              <div>
                <label className="dropdown">
                  <select name="size" onChange={this.changeListener}>
                    <option value="">Select size:</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>
              </div>
              <br />
              <div>
                <label>Enter quantity: </label>
                <input
                  className="input"
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.changeListener}
                />
              </div>
              <br />
              <button>Add to Cart</button>
            </form>
          </div>
        </div>
        <section>
          <div
            className="toggle-btn"
            id="flip-toggle-btn"
            onClick={this.clickListener}
          >
            <input type="checkbox" />
            <span />
            <label htmlFor="flip-toggle-btn">FLIP</label>
          </div>
        </section>
      </Fragment>
    );
  }
}
// extra components for stretch
const mapStateToProps = state => {
  return {
    currentUser: state.activeUser,
    itemNum: state.numOfCartItems
  };
};
export default withRouter(connect(mapStateToProps)(ProductCard));
