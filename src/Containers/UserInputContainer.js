import React, { Component } from "react";
import { connect } from "react-redux";
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
      color: {
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
        green: false
      },
      gender: {
        girl: false,
        boy: false
      },
      material: {
        modal: false,
        cotton: false,
        spandex: false,
        tencel: false,
        rayon: false
      },
      category: {
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
  // At click, it will remove searchterm from chosen tag list.
  cancelSearchTag = () => {
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        search: { inputTerm: "" }
      }
    });
  };
  // Tags coming from Sort component
  sortClickListener = (pick, unpick) => {
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        price: {
          [pick]: !this.state.passingTags.price[pick],
          [unpick]: false
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
  // COLOR Filter >> splited color, gender, material, and category because each key in this.state
  // must be able to filter different attributes in product model.
  colorFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        color: {
          ...this.state.passingTags.color,
          [e.target.dataset.name]: !this.state.passingTags.color[
            e.target.dataset.name
          ]
        }
      }
    });
  };
  // GENDER Filter
  genderFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        gender: {
          ...this.state.passingTags.gender,
          [e.target.dataset.name]: !this.state.passingTags.gender[
            e.target.dataset.name
          ]
        }
      }
    });
  };
  // MATERIAL Filter
  materialFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        material: {
          ...this.state.passingTags.material,
          [e.target.dataset.name]: !this.state.passingTags.material[
            e.target.dataset.name
          ]
        }
      }
    });
  };
  // CATEGORY Filter
  categoryFilterClickListener = e => {
    console.log("clicked", e.target.dataset.name);
    this.setState({
      passingTags: {
        ...this.state.passingTags,
        category: {
          ...this.state.passingTags.category,
          [e.target.dataset.name]: !this.state.passingTags.category[
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
          <InputTagCollection
            tags={this.state.passingTags}
            cancelSearchTag={this.cancelSearchTag}
            sortClickListener={this.sortClickListener}
            colorFilterClickListener={this.colorFilterClickListener}
            genderFilterClickListener={this.genderFilterClickListener}
            materialFilterClickListener={this.materialFilterClickListener}
            categoryFilterClickListener={this.categoryFilterClickListener}
          />
        </div>

        <div className="search-component">
          <Search
            searchTerm={this.state.searchTerm}
            searchListener={this.searchListener}
            searchSubmitListener={this.searchSubmitListener}
          />
        </div>
        <Sort sortClickListener={this.sortClickListener} />
        <Filter
          colorFilterClickListener={this.colorFilterClickListener}
          genderFilterClickListener={this.genderFilterClickListener}
          materialFilterClickListener={this.materialFilterClickListener}
          categoryFilterClickListener={this.categoryFilterClickListener}
        />
      </div>
    );
  }
}

export default connect()(UserInputContainer);
