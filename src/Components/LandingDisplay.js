import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import magnifier from "../Assets/noun_magnifier.png";
import box from "../Assets/square_box.png";
import { STORE_PRODUCTS } from "../Types";
import NavBar from "./NavBar";
import UserInputContainer from "../Containers/UserInputContainer";
import ProductContainer from "../Containers/ProductContainer";
import LandingFrontImg from "./LandingFrontImg";

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
    this.setState(prevState => ({
      userInputContainerClicked: !prevState.userInputContainerClicked
    }));
  };
  // receive search term by users and save it to state
  searchListener = e => {
    this.setState({ searchTerm: e.target.value });
  };
  // Search term, when submitted, sets the state in passingTags to pass down to child component. Finally call searchProducts to filter.
  searchSubmitListener = e => {
    e.preventDefault();
    this.setState(
      {
        passingTags: {
          ...this.state.passingTags,
          search: { inputTerm: this.state.searchTerm }
        }
      },
      () => this.searchProducts()
    );
  };
  // At click, it will remove searchterm from chosen tag list. Then call searchProducts to filter
  cancelSearchTag = () => {
    this.setState(
      {
        passingTags: {
          ...this.state.passingTags,
          search: { inputTerm: "" }
        }
      },
      () => this.searchProducts()
    );
  };
  // Tags coming from Sort component, then call sortPRoduct function
  sortClickListener = (pick, unpick) => {
    this.setState(
      {
        passingTags: {
          ...this.state.passingTags,
          price: {
            [pick]: !this.state.passingTags.price[pick],
            [unpick]: false
          }
        }
      },
      () => this.sortProducts(pick)
    );
    // sortClickListener = e => {
    // ******** to pass down the event to setState, store it to a variable.
    //   const name = e.target.dataset.name;
    //   this.setState(prevState => ({
    //     passingTags: {
    //       ...this.state.passingTags,
    //       price: {
    //         ...this.state.passingTags.price,
    //         [name]: !prevState.passingTags.price[name]
    //       }
    //     }
    //   }));
    // };
  };
  // COMMENT: splited color, gender, material, and category because each key in this.state
  // ... must be able to filter different attributes in product model.
  // Reason of moving methods and state from UserInputContainer to this component is because when clicking magnifier,
  // ... the state is reset to default that can't happen.
  // Lastly, decided to use pure React instead of Redux for practice purpose.
  // **************** COLOR Filter ****************
  colorFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        color: {
          ...this.state.passingTags.color,
          [e.target.dataset.name]: !this.state.passingTags.color[
            e.target.dataset.name
          ]
        }
      }
    });
  };
  // **************** GENDER Filter ****************
  genderFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        gender: {
          ...this.state.passingTags.gender,
          [e.target.dataset.name]: !this.state.passingTags.gender[
            e.target.dataset.name
          ]
        }
      }
    });
  };
  // **************** MATERIAL Filter ****************
  materialFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        material: {
          ...this.state.passingTags.material,
          [e.target.dataset.name]: !this.state.passingTags.material[
            e.target.dataset.name
          ]
        }
      }
    });
  };
  // **************** CATEGORY Filter ****************
  categoryFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        category: {
          ...this.state.passingTags.category,
          [e.target.dataset.name]: !this.state.passingTags.category[
            e.target.dataset.name
          ]
        }
      }
    });
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
  // **************** SEARCH Filter & Dispatch ****************
  searchProducts = () => {
    // const filteredProducts = this.props.products.filter(product => {
    return this.props.products.filter(product => {
      return product.name
        .toLowerCase()
        .includes(this.state.passingTags.search.inputTerm);
    });

    // Loop through this.state.passingTags keys and values, if any of them are true,
    // then grab that key(not boolean) and filter products that include that key
    // then dispatch to store to product.
    // dispatching to product is okay because if I remove the tag products will come back.
    // I NEED four different filter functions.
  };
  // **************** Search & Filter ****************
  genderFilteringTestFunc = () => {
    const emptyArr = [];
    const genderState = this.state.passingTags.gender;
    for (let gender in genderState) {
      if (genderState[gender]) {
        emptyArr.push(gender);
      }
    }
    return this.props.products.filter(product => {
      return product.gender.includes();
    });
  };
  // good example =>
  // searchByTerm = () => {
  //   console.log("searchByTerm", this.state.searchTerm);
  //   let filteredProducts = this.state.products.filter(product =>
  //     product.category.includes(this.state.filterTerm)
  //   );
  //   return filteredProducts.filter(product =>
  //     product.name.toLowerCase().includes(this.state.searchTerm)
  //   );
  // };
  // ****************************************************************
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
          <LandingFrontImg />
          <div className="wrap">
            <img
              src="http://image.flaticon.com/icons/svg/3/3907.svg"
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
        {this.state.userInputContainerClicked ? (
          <UserInputContainer
            tags={this.state.passingTags}
            cancelSearchTag={this.cancelSearchTag}
            sortClickListener={this.sortClickListener}
            colorFilterClickListener={this.colorFilterClickListener}
            genderFilterClickListener={this.genderFilterClickListener}
            materialFilterClickListener={this.materialFilterClickListener}
            categoryFilterClickListener={this.categoryFilterClickListener}
            searchTerm={this.state.searchTerm}
            searchListener={this.searchListener}
            searchSubmitListener={this.searchSubmitListener}
          />
        ) : null}
        {this.props.products.length ? (
          <ProductContainer products={this.searchProducts()} />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemNum: state.numOfCartItems,
    products: state.products
  };
};

export default connect(mapStateToProps)(LandingDisplay);
