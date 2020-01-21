import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TOTAL_AMOUNT } from "../Types";
import axios from "axios";

class CartProduct extends Component {
  state = {
    eachProduct: {}
  };
  // Using redux, updates total amount in the cart. Calculates quantity too.
  componentDidMount() {
    const eachProduct = this.props.products.find(
      product => product.id === this.props.detail.product_id
    );
    this.setState({ eachProduct }, () => {
      this.props.dispatch({
        type: TOTAL_AMOUNT,
        payload:
          parseFloat(eachProduct.price) * parseInt(this.props.detail.quantity)
      });
    });
  }
  // this dispatch does not auto render cart list numbers.
  // updates product quantity change in cart also changes order of list when updated
  updateFetch = (num, token) => {
    axios(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart/${this.props.detail.id}`, {
      method: 'patch',
      headers: { Authorization: `Bearer ${ token }` },
      data: { quantity: this.props.detail.quantity + num }
    })
      .then(() => { window.location.reload() })
      .catch(error => {
        alert(error);
        this.props.history.push('/cart')
      });
  };
  // Function to remove items from the cart
  deleteFetch = token => {
    fetch(
      `${process.env.REACT_APP_HOST}/order_details/${this.props.detail.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(r => {
      if (!r.ok) {
        console.log(r);
        this.props.history.push("/cart");
      } else {
        window.location.reload();
      }
    });
  };
  // depending on which button it clicked, and number of quantity, it leads to different function
  clickListener = e => {
    const token = localStorage.getItem("user_token");
    if (e.target.value === "+") {
      console.log("%c ADDING PRODUCT", "color: white");
      this.updateFetch(1, token);
    } else if (e.target.value === "-") {
      if (this.props.detail.quantity === 1) {
        console.log("%c DELETING PRODUCT", "color: white");
        this.deleteFetch(token);
      } else {
        console.log("%c REMOVING PRODUCT", "color: white");
        this.updateFetch(-1, token);
      }
    }
  };

  render() {
    const { quantity, size } = this.props.detail;
    const { name, category, imgBack, price } = this.state.eachProduct;
    return (
      <div>
        <div id="cart-items-list">
          <div className="cart items button">
            <button value="-" onClick={this.clickListener}>
              −
            </button>
            <strong id="quantity"> {quantity} </strong>
            <button value="+" onClick={this.clickListener}>
              ✚
            </button>
          </div>
          <div className="cart items detail">
            <strong>{name}</strong>
            <br />
            <span>-{category}-</span>
            <br />
            <span>{size}</span>
            <br />
          </div>
          <div>
            <img src={imgBack} alt="for cart" className="cart image" />
          </div>
          <div className="cart items price">
            <strong>${price}0</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(CartProduct));
