import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import magnifier from "../Assets/noun_magnifier.png";
// import box from "../Assets/square_box.png";
import { STORE_PRODUCTS } from "../Types";
// import NavBar from "./NavBar";
import UserInputContainer from "../Containers/UserInputContainer";
import ProductContainer from "../Containers/ProductContainer";
import LandingFrontImg from "./LandingFrontImg";

const LandingDisplayHooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [passingTags, setPassingTags] = useState({
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
  });
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (passingTags.price.lowHigh) sortProducts("lowHigh");
    if (passingTags.price.highLow) sortProducts("highLow");
  }, [passingTags.price]);

  // toggles User search/filter/sort component when clicked
  const clickListener = () => $("#userInputjQuery").slideToggle();
  // receive search term by users and save it to state
  const searchListener = e => setSearchTerm(e.target.value);
  // Search term, when submitted, sets the state in passingTags to pass down to child component.
  const searchSubmitListener = e => {
    e.preventDefault();
    setPassingTags({
      ...passingTags,
      search: { inputTerm: searchTerm }
    });
  };
  // At click, it will remove searchTerm from chosen tag list.
  const cancelSearchTag = () => {
    setPassingTags({
      ...passingTags,
      search: { inputTerm: "" }
    });
  };
  // Tags coming from Sort component, then call sortProduct function
  const sortClickListener = (pick, unpick) => {
    setPassingTags(
      prevState => ({
        ...passingTags,
        price: {
          [pick]: !prevState.price[pick],
          [unpick]: false
        }
      })
    );
    // In class component, I trigger sortProduct(pick) as a second argument of setState.
    // For this hooks, I can use useEffect to update price sorting.
    // sortProducts(pick);
  };
  // **************** UNIVERSAL Filter **************** (Accepts color, gender, material, and category)
  const allFilterClickListener = (e, filterProp) => {
    console.log("FILTER clicked", e.target.dataset.name);
    const name = e.target.dataset.name;
    setPassingTags({
      ...passingTags,
      [filterProp]: {
        ...passingTags[filterProp],
        [name]: !passingTags[filterProp][name]
      }
    });
  };
  // **************** PRICE Sort & Dispatch ****************
  // BELOW: FINAL SEARCH FILTER SORT FUNCTIONS
  const sortProducts = sortArgument => {
    if (sortArgument === "lowHigh" && passingTags.price.lowHigh) {
      const sortedProducts = products.sort((x, y) => x.price - y.price);
      dispatch({ type: STORE_PRODUCTS, payload: [...sortedProducts] });

    } else if (sortArgument === "highLow" && passingTags.price.highLow) {
      const sortedProducts = products.sort((x, y) => y.price - x.price);
      dispatch({ type: STORE_PRODUCTS, payload: [...sortedProducts] });
    }
  };
  // **************** Collect all keys and Filter ****************
  // This function collects ALL keys that have true as a value, then create a new obj to compare to filter.
  const filteredCollected = () => {
    const collectedTrueKeys = {
      color: [],
      gender: [],
      material: [],
      category: []
    };
    const { color, gender, material, category } = passingTags;
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
  const multiPropsFilter = (products, filters) => {
    const filterKeys = Object.keys(filters);
    return products.filter(product => {
      return filterKeys.every(key => {
        if (!filters[key].length) return true;

        if (Array.isArray(product[key])) {
          return product[key].some(keyEle => filters[key].includes(keyEle));
        }
        return filters[key].includes(product[key]);
      });
    });
  };
  // **************** SEARCH Filter & Dispatch ****************
  const searchProducts = () => {
    const filteredProducts = multiPropsFilter(products, filteredCollected());
    return filteredProducts.filter(product => {
      return product.name
        .toLowerCase()
        .includes(passingTags.search.inputTerm);
    });
  };

  return (
    <>
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
          onClick={clickListener}
        />
      </div>
      <div id="userInputjQuery">
        {/* purpose of this div is for CSS */}
        <UserInputContainer
          tags={passingTags}
          cancelSearchTag={cancelSearchTag}
          sortClickListener={sortClickListener}
          allFilterClickListener={allFilterClickListener}
          searchTerm={searchTerm}
          searchListener={searchListener}
          searchSubmitListener={searchSubmitListener}
        />
      </div>
      {products.length ? (
        <ProductContainer products={searchProducts()} />
      ) : null}
    </>
  );
};

export default LandingDisplayHooks;
