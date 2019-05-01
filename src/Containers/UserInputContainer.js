import React, { Component } from "react";
import Search from "../Components/Search";
import Sort from "../Components/Sort";
import Filter from "../Components/Filter";
import InputTagCollection from "../Components/InputTagCollection";

class UserInputContainer extends Component {
  // this component will have states of: [price(asc), price(dsc), color, gender, material-1, ..., material-5 , category]
  // when each tag is clicked, boolean to true, then appear on the new <div>.
  state = {
    searchTerm: "",
    passingTags: {
      search: {
        inputTerm: ""
      },
      price: {
        lowHigh: false,
        highLow: false
      },
      filter: {
        white: false,
        black: false,
        brown: false,
        navy: false,
        blue: false,
        yellow: false,
        pink: false,
        purple: false,
        beige: false,
        red: false,
        green: false,
        girl: false,
        boy: false,
        modal: false,
        cotton: false,
        spandex: false,
        tencel: false,
        rayon: false,
        innerwear: false,
        dress: false,
        robe: false,
        pajamas: false,
        sweater: false,
        pants: false
      }
    }
  };
  // receive search term by users and save it to state
  searchListener = e => {
    this.setState({ searchTerm: e.target.value });
  };
  // Search term, when submitted, sets the state in passingTags to pass down.
  searchSubmitListener = e => {
    e.preventDefault();
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        search: { inputTerm: this.state.searchTerm }
      }
    });
  };
  // Tags coming from Sort component
  sortClickListener = e => {
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        price: {
          ...this.state.passingTags.price,
          [e.target.dataset.name]: !this.state.passingTags.price[
            e.target.dataset.name
          ]
        }
      }
    });
    // Using prevState, cannot define what 'event' is.
    // this.setState((prevState, e) => ({
    //   passingTags: {
    //     ...this.state.passingTags,
    //     price: {
    //       ...this.state.passingTags.price,
    //       [e.target.dataset.name]: !prevState.passingTags.price[
    //         e.target.dataset.name
    //       ]
    //     }
    //   }
    // }));
  };
  // Tags coming from Filter component
  filterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        filter: {
          ...this.state.passingTags.filter,
          [e.target.dataset.name]: !this.state.passingTags.filter[
            e.target.dataset.name
          ]
        }
      }
    });
  };

  render() {
    return (
      <div id="user-input">
        <h3 className="user-input header">filter search sort here</h3>
        <div>
          <InputTagCollection tags={this.state.passingTags} />
        </div>

        <Search
          searchTerm={this.state.searchTerm}
          searchListener={this.searchListener}
          searchSubmitListener={this.searchSubmitListener}
        />
        <Sort sortClickListener={this.sortClickListener} />
        <Filter filterClickListener={this.filterClickListener} />
      </div>
    );
  }
}

export default UserInputContainer;
