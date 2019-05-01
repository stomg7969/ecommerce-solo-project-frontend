import React from "react";

const Sort = props => {
  return (
    <div id="sort">
      <div id="price-sort-container">
        <div
          className="price-sort"
          data-name="lowHigh"
          onClick={props.sortClickListener}
        >
          <h6 data-name="lowHigh">$ LOW - HIGH</h6>
        </div>
        <div
          className="price-sort"
          data-name="highLow"
          onClick={props.sortClickListener}
        >
          <h6 data-name="highLow">$ HIGH - LOW</h6>
        </div>
      </div>
    </div>
  );
};

export default Sort;
