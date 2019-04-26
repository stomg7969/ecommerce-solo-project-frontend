import React, { Component, Fragment } from "react";
import landingPicture from "../Assets/moonya landing picture.jpg";
import magnifier from "../Assets/noun_magnifier.png";
import UserInputContainer from "../Containers/UserInputContainer";
import ProductContainer from "../Containers/ProductContainer";

class LandingDisplay extends Component {
  state = {
    userContainerClicked: false,
    userInputContainerClicked: false
  };
  // toggles User search/filter/sort component when clicked
  clickListener = () => {
    this.setState(prevState => ({
      userInputContainerClicked: !prevState.userInputContainerClicked
    }));
  };
  render() {
    return (
      <Fragment>
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
        {this.state.userInputContainerClicked ? <UserInputContainer /> : null}
        <ProductContainer />
      </Fragment>
    );
  }
}
// const LandingDisplay = () => {
//   return ();
// };

export default LandingDisplay;
