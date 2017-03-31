import React, { Component, PropTypes }     from 'react';
import { Nav, Navbar, NavItem }            from 'react-bootstrap';
import { connect }                         from 'react-redux';
import { addedCard }                       from '../../actions/actions';
import { CARD_TYPES }                      from '../../constants/Constants';

var FontAwesome = require('react-fontawesome');


class TitleBar extends Component {
  handleSelect(eventKey) {
    event.preventDefault();
    this.props.dispatch(addedCard(eventKey, {}));
  }
  render() {
    return (
      <Navbar fixedTop fluid collapseOnSelect className="navBar">
          <Navbar.Brand style={{textAlign: "left", color: "white", paddingTop: "15px", paddingBottom: "0"}} >
            RepYourself.org
          </Navbar.Brand>
        <Nav pullRight style={{margin: "0"}} onSelect={this.handleSelect.bind(this)}>
          <NavItem eventKey={CARD_TYPES.ZIPENTER} style={{textAlign: "right", color: "white"}}>Add Reps <FontAwesome style={{color:"white"}} className="fa-plus-square"/></NavItem>
        </Nav>
      </Navbar>
    )
  }
}

TitleBar.propTypes = {
  dispatch: PropTypes.func.isRequired
};
//
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(TitleBar);
