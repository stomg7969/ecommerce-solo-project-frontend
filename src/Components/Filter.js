import React from "react";

class Filter extends React.Component {
  render() {
    return (
      <div id="filter">
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <h3>Filter section here</h3>
        <p>*each word should be in each divs*</p>
        <div>
          <strong>Filter:</strong>
          {/* mouseover event listener with onclick */}
          {/* clicking, will pass up to parent to appear as tags. */}
          <label>Colors:</label>
          <div id="color-filter-container">
            <div className="filter colors">
              <h5 id="white">White</h5>
            </div>
            <div className="filter colors">
              <h5 id="black">Black</h5>
            </div>
            <div className="filter colors">
              <h5 id="brown">Brown</h5>
            </div>
            <div className="filter colors">
              <h5 id="navy">Navy</h5>
            </div>
            <div className="filter colors">
              <h5 id="blue">Blue</h5>
            </div>
            <div className="filter colors">
              <h5 id="yellow">Yellow</h5>
            </div>
            <div className="filter colors">
              <h5 id="pink">Pink</h5>
            </div>
            <div className="filter colors">
              <h5 id="purple">Purple</h5>
            </div>
            <div className="filter colors">
              <h5 id="beige">Beige</h5>
            </div>
            <div className="filter colors">
              <h5 id="red">Red</h5>
            </div>
            <div className="filter colors">
              <h5 id="green">Green</h5>
            </div>
          </div>
          <label>Gender:</label>
          <div id="gender-filter-container">
            <div className="filter gender">
              <h5>unisex</h5>
            </div>
            <div className="filter gender">
              <h5>girl</h5>
            </div>
            <div className="filter gender">
              <h5>boy</h5>
            </div>
          </div>
          <label>Materials:</label>
          <div id="material-filter-container">
            <div className="filter materials">
              <h5>modal</h5>
            </div>
            <div className="filter materials">
              <h5>cotton</h5>
            </div>
            <div className="filter materials">
              <h5>spandex</h5>
            </div>
            <div className="filter materials">
              <h5>tencel</h5>
            </div>
            <div className="filter materials">
              <h5>rayon</h5>
            </div>
          </div>
          <label>Category:</label>
          <div id="category-filter-container">
            <div className="filter categories">
              <h5>innerwear</h5>
            </div>
            <div className="filter categories">
              <h5>dress</h5>
            </div>
            <div className="filter categories">
              <h5>robe</h5>
            </div>
            <div className="filter categories">
              <h5>pajamas</h5>
            </div>
            <div className="filter categories">
              <h5>sweater</h5>
            </div>
            <div className="filter categories">
              <h5>pants</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
