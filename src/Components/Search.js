import React from "react";

const Search = props => {
  return (
    <div id="search">
      <span>Search section</span>
      <form onSubmit={props.searchSubmitListener}>
        <input
          type="text"
          value={props.searchTerm}
          placeholder="Search product name"
          onChange={props.searchListener}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default Search;
