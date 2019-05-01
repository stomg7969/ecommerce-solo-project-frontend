import React from "react";

const Search = props => {
  return (
    <div id="search">
      <form onSubmit={props.searchSubmitListener}>
        <input
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

export default Search;
