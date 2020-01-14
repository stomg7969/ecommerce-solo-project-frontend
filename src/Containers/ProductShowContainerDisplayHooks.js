import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import backImg from "../Assets/go_back.png";

const ProductShowContainerDisplayHooks = props => {
  const { name, price, category, color, gender, material, imgBack, imgFront } = props.product;
  const { quantity } = props.userInput;
  return (
    <Fragment>
      <div id="product-showpage">
        <img
          src={backImg}
          alt="go-back button"
          className="top-right go-back"
          onClick={() => props.history.push("/")}
        />
        {/* <div>
            <Link to="/cart">
              <img id="cart-image" src={box} alt="box noun project" />
              <span id="cart-number">
                {props.itemNum ? props.itemNum : 0}
              </span>
            </Link>
          </div> */}
        {/* each card has a link to product show page */}
        <div className="product details">
          <h2>{name}</h2>
          <h2>${price}0</h2>
          <strong>Category: </strong>
          <p>{category}</p>
          <strong>Color: </strong>
          <p>{color}</p>
          <strong>Gender: </strong>
          <p>{gender}</p>
          <strong>Material: </strong>
          <p>{material.join(", ")}</p>
        </div>
        <div id="showpage-img">
          <div>
            <img
              src={props.imgClicked ? imgBack : imgFront}
              alt="product images"
              className="product-image"
            />
          </div>
        </div>
        <div className="customer-input">
          <form
            onSubmit={
              localStorage.user_token
                ? props.submitListener
                : props.requestLogin
            }
          >
            <div>
              <label className="dropdown">
                <select name="size" onChange={props.changeListener}>
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
                value={quantity}
                onChange={props.changeListener}
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
          onClick={props.clickListener}
        >
          <input type="checkbox" />
          <span />
          <label htmlFor="flip-toggle-btn">FLIP</label>
        </div>
      </section>
    </Fragment>
  );
}

export default withRouter(ProductShowContainerDisplayHooks);