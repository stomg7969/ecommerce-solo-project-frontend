import React from "react";

class Sort extends React.Component {
  render() {
    return (
      <div id="sort">
        <h3>Sort section here</h3>
        <p>by price</p>
        <strong>Sort:</strong>
        <div id="price-sort-container">
          {/* mouseover event listener with onclick */}
          {/* clicking, will pass up to parent to appear as tags. */}
          <div className="price-sort">
            <h5>$ Log - High</h5>
          </div>
          <div className="price-sort">
            <h5>$ High - Low</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Sort;
