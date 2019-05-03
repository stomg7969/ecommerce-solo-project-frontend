import React, { Component } from "react";

class InputTagCollection extends Component {
  render() {
    console.log(this.props.tags);
    const {
      search,
      price,
      color,
      gender,
      material,
      category
    } = this.props.tags;
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
        {color.white ? (
          <div
            className="collection white"
            data-name="white"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="white">WHITE</h6>
          </div>
        ) : null}
        {color.black ? (
          <div
            className="collection black"
            data-name="black"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="black">BLACK</h6>
          </div>
        ) : null}
        {color.brown ? (
          <div
            className="collection brown"
            data-name="brown"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="brown">BROWN</h6>
          </div>
        ) : null}
        {color.navy ? (
          <div
            className="collection navy"
            data-name="navy"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="navy">NAVY</h6>
          </div>
        ) : null}
        {color.blue ? (
          <div
            className="collection blue"
            data-name="blue"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="blue">BLUE</h6>
          </div>
        ) : null}
        {color.yellow ? (
          <div
            className="collection yellow"
            data-name="yellow"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="yellow">YELLOW</h6>
          </div>
        ) : null}
        {color.pink ? (
          <div
            className="collection pink"
            data-name="pink"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="pink">PINK</h6>
          </div>
        ) : null}
        {color.purple ? (
          <div
            className="collection purple"
            data-name="purple"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="purple">PURPLE</h6>
          </div>
        ) : null}
        {color.beige ? (
          <div
            className="collection beige"
            data-name="beige"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="beige">BEIGE</h6>
          </div>
        ) : null}
        {color.red ? (
          <div
            className="collection red"
            data-name="red"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="red">RED</h6>
          </div>
        ) : null}
        {color.green ? (
          <div
            className="collection green"
            data-name="green"
            onClick={e => this.props.allFilterClickListener(e, "color")}
          >
            <h6 data-name="green">GREEN</h6>
          </div>
        ) : null}
        {/* ************** GENDER ************** */}
        {gender.boy ? (
          <div
            className="collection"
            data-name="boy"
            onClick={e => this.props.allFilterClickListener(e, "gender")}
          >
            <h6 data-name="boy">BOY</h6>
          </div>
        ) : null}
        {gender.girl ? (
          <div
            className="collection"
            data-name="girl"
            onClick={e => this.props.allFilterClickListener(e, "gender")}
          >
            <h6 data-name="girl">GIRL</h6>
          </div>
        ) : null}
        {/* ************** MATERIAL ************** */}
        {material.modal ? (
          <div
            className="collection"
            data-name="modal"
            onClick={e => this.props.allFilterClickListener(e, "material")}
          >
            <h6 data-name="modal">MODAL</h6>
          </div>
        ) : null}
        {material.cotton ? (
          <div
            className="collection"
            data-name="cotton"
            onClick={e => this.props.allFilterClickListener(e, "material")}
          >
            <h6 data-name="cotton">COTTON</h6>
          </div>
        ) : null}
        {material.spandex ? (
          <div
            className="collection"
            data-name="spandex"
            onClick={e => this.props.allFilterClickListener(e, "material")}
          >
            <h6 data-name="spandex">SPANDEX</h6>
          </div>
        ) : null}
        {material.tencel ? (
          <div
            className="collection"
            data-name="tencel"
            onClick={e => this.props.allFilterClickListener(e, "material")}
          >
            <h6 data-name="tencel">TENCEL</h6>
          </div>
        ) : null}
        {material.rayon ? (
          <div
            className="collection"
            data-name="rayon"
            onClick={e => this.props.allFilterClickListener(e, "material")}
          >
            <h6 data-name="rayon">RAYON</h6>
          </div>
        ) : null}
        {/* ************** CATEGORY ************** */}
        {category.innerwear ? (
          <div
            className="collection"
            data-name="innerwear"
            onClick={e => this.props.allFilterClickListener(e, "category")}
          >
            <h6 data-name="innerwear">INNERWEAR</h6>
          </div>
        ) : null}
        {category.dress ? (
          <div
            className="collection"
            data-name="dress"
            onClick={e => this.props.allFilterClickListener(e, "category")}
          >
            <h6 data-name="dress">DRESS</h6>
          </div>
        ) : null}
        {category.robe ? (
          <div
            className="collection"
            data-name="robe"
            onClick={e => this.props.allFilterClickListener(e, "category")}
          >
            <h6 data-name="robe">ROBE</h6>
          </div>
        ) : null}
        {category.pajamas ? (
          <div
            className="collection"
            data-name="pajamas"
            onClick={e => this.props.allFilterClickListener(e, "category")}
          >
            <h6 data-name="pajamas">PAJAMAS</h6>
          </div>
        ) : null}
        {category.sweater ? (
          <div
            className="collection"
            data-name="sweater"
            onClick={e => this.props.allFilterClickListener(e, "category")}
          >
            <h6 data-name="sweater">SWEATER</h6>
          </div>
        ) : null}
        {category.pants ? (
          <div
            className="collection"
            data-name="pants"
            onClick={e => this.props.allFilterClickListener(e, "category")}
          >
            <h6 data-name="pants">PANTS</h6>
          </div>
        ) : null}
      </div>
    );
  }
}

export default InputTagCollection;
