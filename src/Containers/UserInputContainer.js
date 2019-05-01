import React, { Component } from "react";
import Search from "../Components/Search";
import Sort from "../Components/Sort";
import Filter from "../Components/Filter";

class UserInputContainer extends Component {
  // this component will have states of: [price(asc), price(dsc), color, gender, material-1, ..., material-5 , category]
  // when each tag is clicked, boolean to true, then appear on the new <div>.
  // giving users a choice to include filters.
  render() {
    return (
      <div id="user-input">
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <h2>filter search sort here (between the picture and product list)</h2>
        <p>[ ... ] this area will include all the clicked filter terms</p>
        <p>make this be dropdown:</p>
        {/* sort filter search */}
        <Search
          searchTerm={this.props.searchTerm}
          searchListener={this.props.searchListener}
          searchSubmitListener={this.props.searchSubmitListener}
        />
        <Sort />
        <Filter />
        {/* all passed up states must be passed on to product container to filter out */}
      </div>
    );
  }
}

export default UserInputContainer;
