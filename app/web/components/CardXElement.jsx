import React, { Component, PropTypes }          from 'react';
import { connect }                              from 'react-redux';
import FontAwesome                              from 'react-fontawesome';


export default class CardXElement extends Component {
  render() {
    const { execute, back, } = this.props;
    var backDisplay = {pointerEvents: "auto", color:"white"};
    if (back == undefined) {
      backDisplay.display = "none";
    }
    return (
      <div>
        <div style={{pointerEvents: "none", textAlign: "left", width: "100%", height: "0px", margin: "0px", position: "relative", top: "-7px", right: "5px"}}>
          <h3 style={{margin: "0"}}>
            <FontAwesome onClick={back} style={backDisplay} className="fa-arrow-circle-left" name="backButton"/>
          </h3>
        </div>
        <div style={{pointerEvents: "none", textAlign: "right", width: "100%", height: "0px", margin: "0px", position: "relative", top: "-7px", left: "5px"}}>
          <h3 style={{margin: "0"}}>
            <FontAwesome onClick={execute} style={{pointerEvents: "auto", color:"white"}} className="fa-times-circle" name="closeButton"/>
          </h3>
        </div>
      </div>
    );
  }
}

CardXElement.propTypes = {
  execute: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};
