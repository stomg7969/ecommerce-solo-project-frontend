import React from "react";

const Filter = props => {
  return (
    <div id="filter">
      <div>
        {/* ************** GENDER ************** */}
        <div id="filter-gender">
          <label className="filter-title">GENDER</label>
          <div id="gender-filter-container">
            <div
              className="filter gender"
              data-name="girl"
              onClick={e => props.allFilterClickListener(e, "gender")}
            >
              <h6 data-name="girl">GIRL</h6>
            </div>
            <div
              className="filter gender"
              data-name="boy"
              onClick={e => props.allFilterClickListener(e, "gender")}
            >
              <h6 data-name="boy">BOY</h6>
            </div>
          </div>
        </div>
        {/* ************** MATERIAL ************** */}
        <div id="filter-material">
          <label className="filter-title">MATERIAL</label>
          <div id="material-filter-container">
            <div
              className="filter materials"
              data-name="modal"
              onClick={e => props.allFilterClickListener(e, "material")}
            >
              <h6 data-name="modal">MODAL</h6>
            </div>
            <div
              className="filter materials"
              data-name="cotton"
              onClick={e => props.allFilterClickListener(e, "material")}
            >
              <h6 data-name="cotton">COTTON</h6>
            </div>
            <div
              className="filter materials"
              data-name="spandex"
              onClick={e => props.allFilterClickListener(e, "material")}
            >
              <h6 data-name="spandex">SPANDEX</h6>
            </div>
            <div
              className="filter materials"
              data-name="tencel"
              onClick={e => props.allFilterClickListener(e, "material")}
            >
              <h6 data-name="tencel">TENCEL</h6>
            </div>
            <div
              className="filter materials"
              data-name="rayon"
              onClick={e => props.allFilterClickListener(e, "material")}
            >
              <h6 data-name="rayon">RAYON</h6>
            </div>
          </div>
        </div>
        {/* ************** CATEGORY ************** */}
        <div id="filter-category">
          <label className="filter-title">CATEGORY</label>
          <div id="category-filter-container">
            <div
              className="filter categories"
              data-name="innerwear"
              onClick={e => props.allFilterClickListener(e, "category")}
            >
              <h6 data-name="innerwear">INNERWEAR</h6>
            </div>
            <div
              className="filter categories"
              data-name="dress"
              onClick={e => props.allFilterClickListener(e, "category")}
            >
              <h6 data-name="dress">DRESS</h6>
            </div>
            <div
              className="filter categories"
              data-name="robe"
              onClick={e => props.allFilterClickListener(e, "category")}
            >
              <h6 data-name="robe">ROBE</h6>
            </div>
            <div
              className="filter categories"
              data-name="pajamas"
              onClick={e => props.allFilterClickListener(e, "category")}
            >
              <h6 data-name="pajamas">PAJAMAS</h6>
            </div>
            <div
              className="filter categories"
              data-name="sweater"
              onClick={e => props.allFilterClickListener(e, "category")}
            >
              <h6 data-name="sweater">SWEATER</h6>
            </div>
            <div
              className="filter categories"
              data-name="pants"
              onClick={e => props.allFilterClickListener(e, "category")}
            >
              <h6 data-name="pants">PANTS</h6>
            </div>
          </div>
          {/* ************** COLOR ************** */}
          <div id="filter-color">
            <label className="filter-title">COLOR</label>
            <div id="color-filter-container">
              <div
                className="filter colors white"
                data-name="white"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="white">WHITE</h6>
              </div>
              <div
                className="filter colors black"
                data-name="black"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="black">BLACK</h6>
              </div>
              <div
                className="filter colors brown"
                data-name="brown"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="brown">BROWN</h6>
              </div>
              <div
                className="filter colors navy"
                data-name="navy"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="navy">NAVY</h6>
              </div>
              <div
                className="filter colors blue"
                data-name="blue"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="blue">BLUE</h6>
              </div>
              <div
                className="filter colors yellow"
                data-name="yellow"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="yellow">YELLOW</h6>
              </div>
              <div
                className="filter colors pink"
                data-name="pink"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="pink">PINK</h6>
              </div>
              <div
                className="filter colors purple"
                data-name="purple"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="purple">PURPLE</h6>
              </div>
              <div
                className="filter colors beige"
                data-name="beige"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="beige">BEIGE</h6>
              </div>
              <div
                className="filter colors red"
                data-name="red"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="red">RED</h6>
              </div>
              <div
                className="filter colors green"
                data-name="green"
                onClick={e => props.allFilterClickListener(e, "color")}
              >
                <h6 data-name="green">GREEN</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
