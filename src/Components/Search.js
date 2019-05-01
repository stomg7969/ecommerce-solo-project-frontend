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
        <form onSubmit={this.props.searchSubmitListener}>
          <input
            type="text"
            value={this.props.searchTerm}
            placeholder="local state in value"
            onChange={this.props.searchListener}
          />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
