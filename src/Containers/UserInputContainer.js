import React from "react";
import { connect } from "react-redux";
import Search from "../Components/Search";
import Sort from "../Components/Sort";
import Filter from "../Components/Filter";
import InputTagCollection from "../Components/InputTagCollection";

const UserInputContainer = props => {
  return (
    <div id="user-input">
      <div>
        <InputTagCollection
          tags={props.tags}
          cancelSearchTag={props.cancelSearchTag}
          sortClickListener={props.sortClickListener}
          allFilterClickListener={props.allFilterClickListener}
        />
      </div>

      <div className="search-component">
        <Search
          searchTerm={props.searchTerm}
          searchListener={props.searchListener}
          searchSubmitListener={props.searchSubmitListener}
        />
      </div>
      <Sort sortClickListener={props.sortClickListener} />
      <Filter allFilterClickListener={props.allFilterClickListener} />
    </div>
  );
}

export default connect()(UserInputContainer);
