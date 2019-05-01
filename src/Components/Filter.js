import React from "react";

class Filter extends React.Component {
  render() {
    return (
      <div id="filter">
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <span>Filter section here</span>
        <div>
          {/* mouseover event listener with onclick */}
          {/* clicking, will pass up to parent to appear as tags. */}
          <label>Colors:</label>
          <div id="color-filter-container">
            <div className="filter colors white">
              <h6>WHITE</h6>
            </div>
            <div className="filter colors black">
              <h6>BLACK</h6>
            </div>
            <div className="filter colors brown">
              <h6>BROWN</h6>
            </div>
            <div className="filter colors navy">
              <h6>NAVY</h6>
            </div>
            <div className="filter colors blue">
              <h6>BLUE</h6>
            </div>
            <div className="filter colors yellow">
              <h6>YELLOW</h6>
            </div>
            <div className="filter colors pink">
              <h6>PINK</h6>
            </div>
            <div className="filter colors purple">
              <h6>PURPLE</h6>
            </div>
            <div className="filter colors beige">
              <h6>BEIGE</h6>
            </div>
            <div className="filter colors red">
              <h6>RED</h6>
            </div>
            <div className="filter colors green">
              <h6>GREEN</h6>
            </div>
          </div>
          <label>Gender:</label>
          <div id="gender-filter-container">
            <div className="filter gender">
              <h6>UNISEX</h6>
            </div>
            <div className="filter gender">
              <h6>GIRL</h6>
            </div>
            <div className="filter gender">
              <h6>BOY</h6>
            </div>
          </div>
          <label>Materials:</label>
          <div id="material-filter-container">
            <div className="filter materials">
              <h6>MODAL</h6>
            </div>
            <div className="filter materials">
              <h6>COTTON</h6>
            </div>
            <div className="filter materials">
              <h6>SPANDEX</h6>
            </div>
            <div className="filter materials">
              <h6>TENCEL</h6>
            </div>
            <div className="filter materials">
              <h6>RAYON</h6>
            </div>
          </div>
          <label>Category:</label>
          <div id="category-filter-container">
            <div className="filter categories">
              <h6>INNERWEAR</h6>
            </div>
            <div className="filter categories">
              <h6>DRESS</h6>
            </div>
            <div className="filter categories">
              <h6>ROBE</h6>
            </div>
            <div className="filter categories">
              <h6>PAJAMAS</h6>
            </div>
            <div className="filter categories">
              <h6>SWEATER</h6>
            </div>
            <div className="filter categories">
              <h6>PANTS</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
