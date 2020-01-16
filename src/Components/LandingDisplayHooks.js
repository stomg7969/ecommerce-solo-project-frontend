import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import magnifier from "../Assets/noun_magnifier.png";
// import box from "../Assets/square_box.png";
import { STORE_PRODUCTS } from "../Types";
// import NavBar from "./NavBar";
import UserInputContainer from "../Containers/UserInputContainer";
import ProductContainer from "../Containers/ProductContainer";
import LandingFrontImg from "./LandingFrontImg";

// const { Provider, Consumer } = React.createContext(); <== 'Prop Drilling'

class LandingDisplay extends Component {
  // this component will have states of: [price(asc), price(dsc), color, gender, material-1, ..., material-5 , category]
  // when each tag is clicked, boolean to true, then appear on the new <div>.
  state = {
    userInputContainerClicked: false,
    searchTerm: "",
    passingTags: {
      search: {
        inputTerm: ""
      },
      price: {
        lowHigh: false,
        highLow: false
      },
      color: {
        white: false,
        black: false,
        brown: false,
        navy: false,
        blue: false,
        yellow: false,
        pink: false,
        purple: false,
        beige: false,
        red: false,
        green: false
      },
      gender: {
        girl: false,
        boy: false
      },
      material: {
        modal: false,
        cotton: false,
        spandex: false,
        tencel: false,
        rayon: false
      },
      category: {
        innerwear: false,
        dress: false,
        robe: false,
        pajamas: false,
        sweater: false,
        pants: false
      }
    }
  };
  // toggles User search/filter/sort component when clicked
  clickListener = () => {
    // this.setState(
    //   prevState => ({
    //     userInputContainerClicked: !prevState.userInputContainerClicked
    //   }),
    //   () =>
    //     this.state.userInputContainerClicked
    //       ? window.scroll(0, 590)
    //       : window.scroll(0, 0)
    // );
    $("#userInputjQuery").slideToggle();
  };
  // receive search term by users and save it to state
  searchListener = e => {
    this.setState({ searchTerm: e.target.value });
  };
  // Search term, when submitted, sets the state in passingTags to pass down to child component.
  // Reason is to begin searching for product only onSubmit, NOT onChange.
  searchSubmitListener = e => {
    e.preventDefault();
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        search: { inputTerm: this.state.searchTerm }
      }
    });
  };
  // At click, it will remove searchterm from chosen tag list.
  cancelSearchTag = () => {
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        search: { inputTerm: "" }
      }
    });
  };
  // Tags coming from Sort component, then call sortPRoduct function
  sortClickListener = (pick, unpick) => {
    this.setState(
      prevState => ({
        passingTags: {
          ...this.state.passingTags,
          price: {
            [pick]: !prevState.passingTags.price[pick],
            [unpick]: false
          }
        }
      }),
      () => this.sortProducts(pick)
    );
  };
  // Reason of moving methods and state from UserInputContainer to this component is because when clicking magnifier,
  // ... the state is reset to default that can't happen.
  // **************** UNIVERSAL Filter **************** (Accepts color, gender, material, and category)
  allFilterClickListener = (e, filterProp) => {
    console.log("FILTER clicked", e.target.dataset.name);
    const name = e.target.dataset.name;
    this.setState(prevState => ({
      passingTags: {
        ...prevState.passingTags,
        [filterProp]: {
          ...prevState.passingTags[filterProp],
          [name]: !prevState.passingTags[filterProp][name]
        }
      }
    }));
  };
  // BELOW: FINAL SEARCH FILTER SORT FUNCTIONS
  // **************** PRICE Sort & Dispatch ****************
  sortProducts = sortArgument => {
    if (sortArgument === "lowHigh" && this.state.passingTags.price.lowHigh) {
      const sortedProducts = this.props.products.sort(
        (x, y) => x.price - y.price
      );
      this.props.dispatch({
        type: STORE_PRODUCTS,
        payload: [...sortedProducts]
      });
    } else if (
      sortArgument === "highLow" &&
      this.state.passingTags.price.highLow
    ) {
      const sortedProducts = this.props.products.sort(
        (x, y) => y.price - x.price
      );
      this.props.dispatch({
        type: STORE_PRODUCTS,
        payload: [...sortedProducts]
      });
    }
  };
  // **************** Collect all keys and Filter ****************
  // This function collects ALL keys that have true as a value, then create a new obj to compare to filter.
  filteredCollected = () => {
    const collectedTrueKeys = {
      color: [],
      gender: [],
      material: [],
      category: []
    };
    const { color, gender, material, category } = this.state.passingTags;
    for (let colorKey in color) {
      if (color[colorKey]) collectedTrueKeys.color.push(colorKey);
    }
    for (let genderKey in gender) {
      if (gender[genderKey]) collectedTrueKeys.gender.push(genderKey);
    }
    for (let materialKey in material) {
      if (material[materialKey]) collectedTrueKeys.material.push(materialKey);
    }
    for (let categoryKey in category) {
      if (category[categoryKey]) collectedTrueKeys.category.push(categoryKey);
    }
    return collectedTrueKeys;
  };
  // Resource: https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
  multiPropsFilter = (products, filters) => {
    const filterKeys = Object.keys(filters);
    return products.filter(product => {
      return filterKeys.every(key => {
        if (!filters[key].length) return true;
        // In addition to the resource, I added below five lines because product[key] is an array for material attribute.
        if (Array.isArray(product[key])) {
          // for (let i = 0; i < product[key].length; i++) {
          //   return filters[key].includes(product[key][i].toLowerCase());
          // }
          return product[key].some(keyEle => filters[key].includes(keyEle));
        }
        return filters[key].includes(product[key]);
      });
    });
  };

  // **************** SEARCH Filter & Dispatch ****************
  searchProducts = () => {
    const filteredProducts = this.multiPropsFilter(
      this.props.products,
      this.filteredCollected()
    );
    return filteredProducts.filter(product => {
      return product.name
        .toLowerCase()
        .includes(this.state.passingTags.search.inputTerm);
    });
  };

  render() {
    return (
      <Fragment>
        {/* <NavBar /> */}
        {/* <div>
          <Link to="/cart">
            <img id="cart-image" src={box} alt="box noun project" />
            <span id="cart-number">
              {this.props.itemNum ? this.props.itemNum : 0}
            </span>
          </Link>
        </div> */}
        <div id="landing-page">
          <LandingFrontImg />
          <div className="wrap">
            <img
              src="http://image.flaticon.com/icons/svg/3/3907.svg"
              alt="user navigation animation"
              id="arrow"
              className="animated bounce"
            />
          </div>
        </div>

        <div className="magnifier">
          <img
            id="magnifier"
            src={magnifier}
            alt="magnifier noun project"
            onClick={this.clickListener}
          />
        </div>
        {/* this.state.userInputContainerClicked ? (
          <UserInputContainer
            tags={this.state.passingTags}
            cancelSearchTag={this.cancelSearchTag}
            sortClickListener={this.sortClickListener}
            allFilterClickListener={this.allFilterClickListener}
            searchTerm={this.state.searchTerm}
            searchListener={this.searchListener}
            searchSubmitListener={this.searchSubmitListener}
          />
        ) : null */}
        <div id="userInputjQuery">
          {/* purpose of this div is for CSS */}
          <UserInputContainer
            tags={this.state.passingTags}
            cancelSearchTag={this.cancelSearchTag}
            sortClickListener={this.sortClickListener}
            allFilterClickListener={this.allFilterClickListener}
            searchTerm={this.state.searchTerm}
            searchListener={this.searchListener}
            searchSubmitListener={this.searchSubmitListener}
          />
        </div>
        {this.props.products.length ? (
          <ProductContainer products={this.searchProducts()} />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    // itemNum: state.numOfCartItems,
    products: state.products
  };
};

export default connect(mapStateToProps)(LandingDisplay);
