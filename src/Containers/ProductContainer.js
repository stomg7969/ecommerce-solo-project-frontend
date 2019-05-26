import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

const ProductContainer = props => {

  const [add, setAdd] = useState(6);
  // Render 6 more products.
  const moreProducts = () => setAdd(add + 6);
  // Purpose of this function is to detect page bottom and render additional products.
  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const scrollable = docHeight - windowHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable) {
      moreProducts();
    }
  };

  useEffect(() => {
    console.log("SCROLL EVENTLISTENER ADDED");
    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("SCROLL EVENTLISTENER REMOVED");
      window.removeEventListener("scroll", handleScroll);
    }
  });

  // componentDidMount() {
  //   console.log("SCROLL EVENTLISTENER ADDED");
  //   window.addEventListener("scroll", handleScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", handleScroll);
  // }

  const productList = props.products
    .slice(0, add)
    .map(product => {
      return <ProductCard key={product.id} product={product} />;
    });
  return <div id="product-list">{productList}</div>;

}

export default ProductContainer;
