import React, { Component } from "react";

class InputTagCollection extends Component {
  render() {
    // const allTags = this.props.tags.map(tag => {
    //   return <span>{tag}</span>
    // });
    console.log(this.props.tags);
    const { search, color, gender, material, category } = this.props.tags;
    return (
      <div className="user-input collection">
        <span>{search.inputTerm}</span>
      </div>
    );
  }
}

export default InputTagCollection;
