import React from "react";

const Filter = props => {
  return (
    <div id="filter">
      <div>
        {/* ************** COLOR ************** */}
        <div id="filter-color">
          <label>color</label>
          <div id="color-filter-container">
            <div
              className="filter colors white"
              data-name="white"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="white">WHITE</h6>
            </div>
            <div
              className="filter colors black"
              data-name="black"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="black">BLACK</h6>
            </div>
            <div
              className="filter colors brown"
              data-name="brown"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="brown">BROWN</h6>
            </div>
            <div
              className="filter colors navy"
              data-name="navy"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="navy">NAVY</h6>
            </div>
            <div
              className="filter colors blue"
              data-name="blue"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="blue">BLUE</h6>
            </div>
            <div
              className="filter colors yellow"
              data-name="yellow"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="yellow">YELLOW</h6>
            </div>
            <div
              className="filter colors pink"
              data-name="pink"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="pink">PINK</h6>
            </div>
            <div
              className="filter colors purple"
              data-name="purple"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="purple">PURPLE</h6>
            </div>
            <div
              className="filter colors beige"
              data-name="beige"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="beige">BEIGE</h6>
            </div>
            <div
              className="filter colors red"
              data-name="red"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="red">RED</h6>
            </div>
            <div
              className="filter colors green"
              data-name="green"
              onClick={props.colorFilterClickListener}
            >
              <h6 data-name="green">GREEN</h6>
            </div>
          </div>
        </div>
        {/* ************** GENDER ************** */}
        <div id="filter-gender">
          <label>gender</label>
          <div id="gender-filter-container">
            <div
              className="filter gender"
              data-name="girl"
              onClick={props.genderFilterClickListener}
            >
              <h6 data-name="girl">GIRL</h6>
            </div>
            <div
              className="filter gender"
              data-name="boy"
              onClick={props.genderFilterClickListener}
            >
              <h6 data-name="boy">BOY</h6>
            </div>
          </div>
        </div>
        {/* ************** MATERIAL ************** */}
        <div id="filter-material">
          <label>materials</label>
          <div id="material-filter-container">
            <div
              className="filter materials"
              data-name="modal"
              onClick={props.materialFilterClickListener}
            >
              <h6 data-name="modal">MODAL</h6>
            </div>
            <div
              className="filter materials"
              data-name="cotton"
              onClick={props.materialFilterClickListener}
            >
              <h6 data-name="cotton">COTTON</h6>
            </div>
            <div
              className="filter materials"
              data-name="spandex"
              onClick={props.materialFilterClickListener}
            >
              <h6 data-name="spandex">SPANDEX</h6>
            </div>
            <div
              className="filter materials"
              data-name="tencel"
              onClick={props.materialFilterClickListener}
            >
              <h6 data-name="tencel">TENCEL</h6>
            </div>
            <div
              className="filter materials"
              data-name="rayon"
              onClick={props.materialFilterClickListener}
            >
              <h6 data-name="rayon">RAYON</h6>
            </div>
          </div>
        </div>
        {/* ************** CATEGORY ************** */}
        <div id="filter-category">
          <label>category</label>
          <div id="category-filter-container">
            <div
              className="filter categories"
              data-name="innerwear"
              onClick={props.categoryFilterClickListener}
            >
              <h6 data-name="innerwear">INNERWEAR</h6>
            </div>
            <div
              className="filter categories"
              data-name="dress"
              onClick={props.categoryFilterClickListener}
            >
              <h6 data-name="dress">DRESS</h6>
            </div>
            <div
              className="filter categories"
              data-name="robe"
              onClick={props.categoryFilterClickListener}
            >
              <h6 data-name="robe">ROBE</h6>
            </div>
            <div
              className="filter categories"
              data-name="pajamas"
              onClick={props.categoryFilterClickListener}
            >
              <h6 data-name="pajamas">PAJAMAS</h6>
            </div>
            <div
              className="filter categories"
              data-name="sweater"
              onClick={props.categoryFilterClickListener}
            >
              <h6 data-name="sweater">SWEATER</h6>
            </div>
            <div
              className="filter categories"
              data-name="pants"
              onClick={props.categoryFilterClickListener}
            >
              <h6 data-name="pants">PANTS</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
