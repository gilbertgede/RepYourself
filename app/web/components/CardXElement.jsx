import React, { Component, PropTypes }          from 'react';
import { connect }                              from 'react-redux';
import FontAwesome                              from 'react-fontawesome';


export default class CardXElement extends Component {
  render() {
    const { execute, } = this.props;
    return (
      <div style={{textAlign: "right", width: "100%", height: "0px", margin: "0px", position: "relative", top: "-7px", left: "5px"}}>
        <h3 style={{margin: "0"}}>
          <FontAwesome onClick={execute} style={{color:"white"}} className="fa-times-circle" name="closeButton"/>
        </h3>
      </div>
    );
  }
}

CardXElement.propTypes = {
  execute: PropTypes.func.isRequired,
};
