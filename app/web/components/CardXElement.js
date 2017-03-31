import React, { Component, PropTypes }  from 'react';
import { connect }                       from 'react-redux';

var FontAwesome = require('react-fontawesome');


class CardXElement extends Component {
  render() {
    const { execute, } = this.props;
    return (
      <div style={{textAlign: "right", width: "100%", height: "0px", margin: "0px", position: "relative", top: "-7px", left: "5px"}}>
        <h3 style={{margin: "0"}} onClick={execute}>
          <FontAwesome style={{color:"white"}} className="fa-times-circle"/>
        </h3>
      </div>
    );
  }
}

CardXElement.propTypes = {
  execute: PropTypes.func.isRequired,
};

const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(CardXElement);
