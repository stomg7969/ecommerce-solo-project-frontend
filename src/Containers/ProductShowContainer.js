import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import box from "../Assets/square_box.png";
import backImg from "../Assets/go_back.png";
import { ADD_TO_CART } from "../Types";
// withRouter for going back to page
class ProductCard extends Component {
  state = {
    imgClicked: false,
    quantity: 0,
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

  submitListener = e => {
    e.preventDefault();
    const { quantity, size } = this.state;
    if (quantity < 1 || size === "") {
      alert("check your input");
    } else {
      console.log("GOING INTO USER CART", this.state);
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
        .then(newOrder => {
          alert("added to cart");
          this.props.dispatch({ type: ADD_TO_CART, order: newOrder });
          this.setState({
            quantity: 0,
            size: ""
          });
        });
    }
  };

  render() {
    const { product } = this.props;
    return (
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
          <strong>Color: </strong>
          <p>{product.color}</p>
          <br />
          <strong>Gender: </strong>
          <p>{product.gender}</p>
          <br />
          <strong>Material: </strong>
          <p>{product.material.join(", ")}</p>
          <br />
        </div>
        <div id="showpage-img">
          <div>
            <img
              src={this.state.imgClicked ? product.imgBack : product.imgFront}
              atl="product image"
              className="product-image"
            />
          </div>
          <div>
            <span onClick={this.clickListener}>Flip the image</span>
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
    );
  }
}
// extra components for stretch
export default withRouter(connect()(ProductCard));
