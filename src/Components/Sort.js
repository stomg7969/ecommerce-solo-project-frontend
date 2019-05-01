import React from "react";

class Sort extends React.Component {
  render() {
    return (
      <div id="sort">
        <span>Price Sort section</span>
        <div id="price-sort-container">
          {/* mouseover event listener with onclick */}
          {/* clicking, will pass up to parent to appear as tags. */}
          <div className="price-sort">
            <h6>$ LOW - HIGH</h6>
          </div>
          <div className="price-sort">
            <h6>$ HIGH - LOW</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Sort;
