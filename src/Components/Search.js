import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div id="search">
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <h3>Search section here</h3>
        <p>by product name</p>
        <form>
          <input
            type="text"
            value=""
            placeholder="local state in value"
            onChange={null}
          />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
