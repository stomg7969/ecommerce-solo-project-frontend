import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
// import box from "../Assets/square_box.png";
import backImg from "../Assets/go_back.png";
import { ADD_TO_CART, ADD_ONE } from "../Types";

const ProductCard = props => {
  const [imgClicked, setImgClicked] = useState(false);
  const [userInput, setUserInput] = useState({
    quantity: 1,
    size: ""
  });
  const currentUser = useSelector(state => state.currentUser);

  const clickListener = () => setImgClicked(!imgClicked);

  const changeListener = e => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    });
  };

  const getUserId = () => {
    if (localStorage.getItem("user_token")) {
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("user_token");
      const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
      return decoded.user_id;
    } else {
      return null;
    }
  };

  const submitListener = e => {
    e.preventDefault();
    const { quantity, size } = userInput;
    if (quantity < 1 || size === "") {
      alert("check your input");
    } else {
      const pendingOrder = currentUser.orders.find(
        order => order.status === "pending"
      );
      if (pendingOrder) {
        console.log("pendingOrder :", pendingOrder);
        const userToken = localStorage.getItem("user_token");
        // look through each detail product, check if product id and size are the same, if, then update
        const foundDetail = pendingOrder.details.find(
          detail =>
            detail.product_id === props.product.id && detail.size === size
        );
        console.log("SAME THING", foundDetail);
        if (foundDetail) {
          const detailQuantity = foundDetail.quantity;
          const detailId = foundDetail.id;
          console.log("PATCHING", detailQuantity, quantity);
          // I decided not to refactor this requests for the purpose of remembering the format.
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
              props.dispatch({ type: ADD_TO_CART, payload: newOrder });
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
              product_id: props.product.id,
              quantity: quantity,
              size: size
            })
          })
            .then(r => r.json())
            .then(newOrder => {
              props.dispatch({ type: ADD_TO_CART, payload: newOrder });
              props.dispatch({ type: ADD_ONE });
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
            user_id: getUserId(),
            status: "pending"
          })
        })
          .then(r => r.json())
          .then(data => {
            // props.dispatch({ type: ADD_TO_CART, payload: data });
            // not using Redux for cart because it needs to be persisting.
            fetch(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                order_id: data.id,
                product_id: props.product.id,
                quantity: quantity,
                size: size
              })
            })
              .then(r => r.json())
              .then(newOrder => {
                props.dispatch({ type: ADD_TO_CART, payload: newOrder });
                props.dispatch({ type: ADD_ONE });
              });
          });
      }
    }
  };

  const requestLogin = e => {
    e.preventDefault();
    alert("must sign in first");
    props.history.push("/user/login");
  };

  const { name, price, category, color, gender, material, imgBack, imgFront } = props.product;
  const { quantity } = userInput;
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
              src={imgClicked ? imgBack : imgFront}
              alt="product images"
              className="product-image"
            />
          </div>
        </div>
        <div className="customer-input">
          <form
            onSubmit={
              localStorage.user_token
                ? submitListener
                : requestLogin
            }
          >
            <div>
              <label className="dropdown">
                <select name="size" onChange={changeListener}>
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
                onChange={changeListener}
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
          onClick={clickListener}
        >
          <input type="checkbox" />
          <span />
          <label htmlFor="flip-toggle-btn">FLIP</label>
        </div>
      </section>
    </Fragment>
  );
}

export default withRouter(connect()(ProductCard));
