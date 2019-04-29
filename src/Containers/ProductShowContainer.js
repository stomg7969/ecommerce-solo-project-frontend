import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import box from "../Assets/square_box.png";
import backImg from "../Assets/go_back.png";
// withRouter for going back to page
class ProductCard extends Component {
  state = {
    imgClicked: false
  };

  clickListener = () => {
    this.setState(prevState => ({
      imgClicked: !prevState.imgClicked
    }));
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
          <img
            src={this.state.imgClicked ? product.imgBack : product.imgFront}
            atl="product image"
            className="product-image"
          />
          <span onClick={this.clickListener}>Flip the image</span>
        </div>
        <div className="custom-select">
          <select>
            <option value="0">Select size:</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="3">Large</option>
          </select>
        </div>
      </div>
    );
  }
}
// extra components for stretch
export default withRouter(ProductCard);
