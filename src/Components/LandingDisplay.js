import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import landingPicture from "../Assets/moonya landing picture.jpg";
import magnifier from "../Assets/noun_magnifier.png";
import box from "../Assets/square_box.png";
import NavBar from "./NavBar";
import UserInputContainer from "../Containers/UserInputContainer";
import ProductContainer from "../Containers/ProductContainer";

class LandingDisplay extends Component {
  state = {
    userInputContainerClicked: false,
    searchTerm: ""
  };
  // toggles User search/filter/sort component when clicked
  clickListener = () => {
    this.setState(prevState => ({
      userInputContainerClicked: !prevState.userInputContainerClicked
    }));
  };

  searchListener = e => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <NavBar />

        <Link to="/cart">
          <img id="cart-image" src={box} alt="box noun project" />
          <span id="cart-number">
            {this.props.itemNum ? this.props.itemNum : 0}
          </span>
        </Link>
        <div id="landing-page">
          <h1>Moonya Ecommerce</h1>
          <img src={landingPicture} alt="moonya" />
          <p>will have a big picture (carousel)</p>
        </div>
        <img
          id="magnifier"
          src={magnifier}
          alt="magnifier noun project"
          onClick={this.clickListener}
        />
        {this.state.userInputContainerClicked ? (
          <UserInputContainer
            searchTerm={this.state.searchTerm}
            searchListener={this.searchListener}
          />
        ) : null}
        <ProductContainer products={this.props.products} />
      </Fragment>
    );
  }
}
// const LandingDisplay = () => {
//   return ();
// };

const mapStateToProps = state => {
  return {
    itemNum: state.numOfCartItems,
    products: state.products
  };
};

export default connect(mapStateToProps)(LandingDisplay);
