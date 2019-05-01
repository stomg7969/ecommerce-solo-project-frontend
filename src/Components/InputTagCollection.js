import React, { Component } from "react";

class InputTagCollection extends Component {
  render() {
    console.log(this.props.tags);
    const { search, price, filter } = this.props.tags;
    return (
      <div id="chosen-tags">
        {search.inputTerm.length ? (
          <div className="collection">
            <h6>{search.inputTerm}</h6>
          </div>
        ) : null}
        {/* ************** PRICE ************** */}
        {price.lowHigh ? (
          <div className="collection">
            <h6>$ LOW - HIGH</h6>
          </div>
        ) : null}
        {price.highLow ? (
          <div className="collection">
            <h6>$ HIGH - LOW</h6>
          </div>
        ) : null}
        {/* ************** COLOR ************** */}
        {filter.white ? (
          <div className="collection white">
            <h6>WHITE</h6>
          </div>
        ) : null}
        {filter.black ? (
          <div className="collection black">
            <h6>BLACK</h6>
          </div>
        ) : null}
        {filter.brown ? (
          <div className="collection brown">
            <h6>BROWN</h6>
          </div>
        ) : null}
        {filter.navy ? (
          <div className="collection navy">
            <h6>NAVY</h6>
          </div>
        ) : null}
        {filter.blue ? (
          <div className="collection blue">
            <h6>BLUE</h6>
          </div>
        ) : null}
        {filter.yellow ? (
          <div className="collection yellow">
            <h6>YELLOW</h6>
          </div>
        ) : null}
        {filter.pink ? (
          <div className="collection pink">
            <h6>PINK</h6>
          </div>
        ) : null}
        {filter.purple ? (
          <div className="collection purple">
            <h6>PURPLE</h6>
          </div>
        ) : null}
        {filter.beige ? (
          <div className="collection beige">
            <h6>BEIGE</h6>
          </div>
        ) : null}
        {filter.red ? (
          <div className="collection red">
            <h6>RED</h6>
          </div>
        ) : null}
        {filter.green ? (
          <div className="collection green">
            <h6>GREEN</h6>
          </div>
        ) : null}
        {/* ************** GENDER ************** */}
        {filter.body ? (
          <div className="collection">
            <h6>BOY</h6>
          </div>
        ) : null}
        {filter.girl ? (
          <div className="collection">
            <h6>GIRL</h6>
          </div>
        ) : null}
        {/* ************** MATERIAL ************** */}
        {filter.modal ? (
          <div className="collection">
            <h6>MODAL</h6>
          </div>
        ) : null}
        {filter.cotton ? (
          <div className="collection">
            <h6>COTTON</h6>
          </div>
        ) : null}
        {filter.spandex ? (
          <div className="collection">
            <h6>SPANDEX</h6>
          </div>
        ) : null}
        {filter.tencel ? (
          <div className="collection">
            <h6>TENCEL</h6>
          </div>
        ) : null}
        {filter.rayon ? (
          <div className="collection">
            <h6>RAYON</h6>
          </div>
        ) : null}
        {/* ************** CATEGORY ************** */}
        {filter.innerwear ? (
          <div className="collection">
            <h6>INNERWEAR</h6>
          </div>
        ) : null}
        {filter.dress ? (
          <div className="collection">
            <h6>DRESS</h6>
          </div>
        ) : null}
        {filter.robe ? (
          <div className="collection">
            <h6>ROBE</h6>
          </div>
        ) : null}
        {filter.pajamas ? (
          <div className="collection">
            <h6>PAJAMAS</h6>
          </div>
        ) : null}
        {filter.sweater ? (
          <div className="collection">
            <h6>SWEATER</h6>
          </div>
        ) : null}
        {filter.pants ? (
          <div className="collection">
            <h6>PANTS</h6>
          </div>
        ) : null}
      </div>
    );
  }
}

export default InputTagCollection;
