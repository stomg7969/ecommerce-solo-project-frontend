import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// withRouter for going back to page
class ProductCard extends Component {
  render() {
    return (
      <div id="product-showpage">
        {/* each card has a link to product show page */}
        <h3>Product show page with detail</h3>
      </div>
    );
  }
}
// extra components for stretch
export default withRouter(ProductCard);
