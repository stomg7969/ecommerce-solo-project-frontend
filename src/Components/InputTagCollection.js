import React, { Component } from "react";

class InputTagCollection extends Component {
  render() {
    console.log(this.props.tags);
    const { search, price, filter } = this.props.tags;
    return (
      <div id="chosen-tags">
        {search.inputTerm.length ? (
          <div className="collection" onClick={this.props.cancelSearchTag}>
            <h6 onClick={this.props.cancelSearchTag}>{search.inputTerm}</h6>
          </div>
        ) : null}
        {/* ************** PRICE ************** */}
        {price.lowHigh ? (
          <div
            className="collection"
            data-name="lowHigh"
            onClick={() => this.props.sortClickListener("lowHigh", "highLow")}
          >
            <h6 data-name="lowHigh">$ LOW - HIGH</h6>
          </div>
        ) : null}
        {price.highLow ? (
          <div
            className="collection"
            data-name="highLow"
            onClick={() => this.props.sortClickListener("highLow", "lowHigh")}
          >
            <h6 data-name="highLow">$ HIGH - LOW</h6>
          </div>
        ) : null}
        {/* ************** COLOR ************** */}
        {filter.white ? (
          <div
            className="collection white"
            data-name="white"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="white">WHITE</h6>
          </div>
        ) : null}
        {filter.black ? (
          <div
            className="collection black"
            data-name="balue"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="black">BLACK</h6>
          </div>
        ) : null}
        {filter.brown ? (
          <div
            className="collection brown"
            data-name="brown"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="brown">BROWN</h6>
          </div>
        ) : null}
        {filter.navy ? (
          <div
            className="collection navy"
            data-name="navy"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="navy">NAVY</h6>
          </div>
        ) : null}
        {filter.blue ? (
          <div
            className="collection blue"
            data-name="blue"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="blue">BLUE</h6>
          </div>
        ) : null}
        {filter.yellow ? (
          <div
            className="collection yellow"
            data-name="yellow"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="yellow">YELLOW</h6>
          </div>
        ) : null}
        {filter.pink ? (
          <div
            className="collection pink"
            data-name="pink"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="pink">PINK</h6>
          </div>
        ) : null}
        {filter.purple ? (
          <div
            className="collection purple"
            data-name="purple"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="purple">PURPLE</h6>
          </div>
        ) : null}
        {filter.beige ? (
          <div
            className="collection beige"
            data-name="beige"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="beige">BEIGE</h6>
          </div>
        ) : null}
        {filter.red ? (
          <div
            className="collection red"
            data-name="red"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="red">RED</h6>
          </div>
        ) : null}
        {filter.green ? (
          <div
            className="collection green"
            data-name="green"
            onClick={this.props.colorFilterClickListener}
          >
            <h6 data-name="green">GREEN</h6>
          </div>
        ) : null}
        {/* ************** GENDER ************** */}
        {filter.boy ? (
          <div
            className="collection"
            data-name="boy"
            onClick={this.props.genderFilterClickListener}
          >
            <h6 data-name="boy">BOY</h6>
          </div>
        ) : null}
        {filter.girl ? (
          <div
            className="collection"
            data-name="girl"
            onClick={this.props.genderFilterClickListener}
          >
            <h6 data-name="girl">GIRL</h6>
          </div>
        ) : null}
        {/* ************** MATERIAL ************** */}
        {filter.modal ? (
          <div
            className="collection"
            data-name="modal"
            onClick={this.props.materialFilterClickListener}
          >
            <h6 data-name="modal">MODAL</h6>
          </div>
        ) : null}
        {filter.cotton ? (
          <div
            className="collection"
            data-name="cotton"
            onClick={this.props.materialFilterClickListener}
          >
            <h6 data-name="cotton">COTTON</h6>
          </div>
        ) : null}
        {filter.spandex ? (
          <div
            className="collection"
            data-name="spandex"
            onClick={this.props.materialFilterClickListener}
          >
            <h6 data-name="spandex">SPANDEX</h6>
          </div>
        ) : null}
        {filter.tencel ? (
          <div
            className="collection"
            data-name="tencel"
            onClick={this.props.materialFilterClickListener}
          >
            <h6 data-name="tencel">TENCEL</h6>
          </div>
        ) : null}
        {filter.rayon ? (
          <div
            className="collection"
            data-name="rayon"
            onClick={this.props.materialFilterClickListener}
          >
            <h6 data-name="rayon">RAYON</h6>
          </div>
        ) : null}
        {/* ************** CATEGORY ************** */}
        {filter.innerwear ? (
          <div
            className="collection"
            data-name="innerwear"
            onClick={this.props.categoryFilterClickListener}
          >
            <h6 data-name="innerwear">INNERWEAR</h6>
          </div>
        ) : null}
        {filter.dress ? (
          <div
            className="collection"
            data-name="dress"
            onClick={this.props.categoryFilterClickListener}
          >
            <h6 data-name="dress">DRESS</h6>
          </div>
        ) : null}
        {filter.robe ? (
          <div
            className="collection"
            data-name="robe"
            onClick={this.props.categoryFilterClickListener}
          >
            <h6 data-name="robe">ROBE</h6>
          </div>
        ) : null}
        {filter.pajamas ? (
          <div
            className="collection"
            data-name="pajamas"
            onClick={this.props.categoryFilterClickListener}
          >
            <h6 data-name="pajamas">PAJAMAS</h6>
          </div>
        ) : null}
        {filter.sweater ? (
          <div
            className="collection"
            data-name="sweater"
            onClick={this.props.categoryFilterClickListener}
          >
            <h6 data-name="sweater">SWEATER</h6>
          </div>
        ) : null}
        {filter.pants ? (
          <div
            className="collection"
            data-name="pants"
            onClick={this.props.categoryFilterClickListener}
          >
            <h6 data-name="pants">PANTS</h6>
          </div>
        ) : null}
      </div>
    );
  }
}

export default InputTagCollection;
