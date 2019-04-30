import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import box from "../Assets/square_box.png";
import backImg from "../Assets/go_back.png";
// import { ADD_TO_CART } from "../Types";
// withRouter for going back to page
class ProductCard extends Component {
  state = {
    imgClicked: false,
    quantity: 0,
    size: ""
  };
  // componentDidMount() {}

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
        }).then(r => r.json());
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
            // this.props.dispatch({ type: ADD_TO_CART, order: data });
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
            }).then(r => r.json());
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
            <span id="cart-number">0</span>
          </Link>
          {/* each card has a link to product show page */}
          <div className="product details">
            <h2>{product.name}</h2>
            <h2>${product.price}</h2>
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
              <select name="size" onChange={this.changeListener}>
                <option value="">Select size:</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <input
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.changeListener}
              />
              <button>Add to Cart</button>
            </form>
          </div>
        </div>
        <div>
          <span onClick={this.clickListener}>Flip the image</span>
        </div>
      </Fragment>
    );
  }
}
// extra components for stretch
const mapStateToProps = state => {
  return {
    currentUser: state.activeUser
  };
};
export default withRouter(connect(mapStateToProps)(ProductCard));
