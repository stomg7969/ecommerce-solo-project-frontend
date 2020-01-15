import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import backImg from "../Assets/go_back.png";
// import CartProduct from "../Components/CartProduct";
import CartProduct from "../Components/CartProductHooks";

const CartContainerDisplayHooks = props => {
  const products = useSelector(state => state.products);
  const userOrder = useSelector(state => state.userOrder);
  const totalAmount = useSelector(state => state.totalAmount);

  let foundProduct;

  console.log(props.cart[0]);

  if (props.cart[0]) {
    const sortedCart = props.cart[0].details.sort(
      (x, y) => x.product_id - y.product_id
    );
    foundProduct = sortedCart.map(detail => {
      return (
        <CartProduct
          key={detail.id}
          detail={detail}
          products={products}
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
          onClick={() => props.history.push("/")}
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
        onClick={() => {
          props.history.push("/");
          window.location.reload();
        }}
      />
      {userOrder.id ? (
        <span>{userOrder.product.name} updated</span>
      ) : null}
      <h2>Cart</h2>
      <div>{foundProduct}</div>
      <div>
        <div>
          <form id="submit-order-form" onSubmit={props.submitListener}>
            <strong>Total: ${totalAmount}.00</strong>
            <br />
            <div>
              <span>Choose Shipping: </span>
              <label className="dropdown">
                <select onChange={props.changeListener}>
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
};

export default withRouter(CartContainerDisplayHooks);
