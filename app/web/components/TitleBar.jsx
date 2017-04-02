import React, { Component, PropTypes }     from 'react';
import { Nav, Navbar, NavItem }            from 'react-bootstrap';
import { connect }                         from 'react-redux';
import FontAwesome                         from 'react-fontawesome';
import { addedCard }                       from '../../actions/actions';
import { CARD_TYPES }                      from '../../constants/Constants';


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
const select = state => state;
export default connect(select)(TitleBar);
