import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "../Components/Search";
import Sort from "../Components/Sort";
import Filter from "../Components/Filter";
import InputTagCollection from "../Components/InputTagCollection";

class UserInputContainer extends Component {
  render() {
    return (
      <div id="user-input">
        <h3 className="user-input header">filter search sort here</h3>
        <div>
          <InputTagCollection
            tags={this.props.tags}
            cancelSearchTag={this.props.cancelSearchTag}
            sortClickListener={this.props.sortClickListener}
            allFilterClickListener={this.props.allFilterClickListener}
          />
        </div>

        <div className="search-component">
          <Search
            searchTerm={this.props.searchTerm}
            searchListener={this.props.searchListener}
            searchSubmitListener={this.props.searchSubmitListener}
          />
        </div>
        <Sort sortClickListener={this.props.sortClickListener} />
        <Filter allFilterClickListener={this.props.allFilterClickListener} />
      </div>
    );
  }
}

export default connect()(UserInputContainer);
