import React from "react";

const Search = props => {
  return (
    <div id="search">
      <form onSubmit={props.searchSubmitListener}>
        <input
          className="input"
          type="text"
          value={props.searchTerm}
          placeholder="Search product name"
          onChange={props.searchListener}
        />
        <br />
        <button>Search</button>
      </form>
    </div>
  );
};
// If I want to render number of products after filtering, use redux. this.props.products.length.
// Pop up next to search bar??
export default Search;
