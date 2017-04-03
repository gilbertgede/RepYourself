import React, { Component, PropTypes }     from 'react';
import { Nav, Navbar, NavItem }            from 'react-bootstrap';
import { connect }                         from 'react-redux';
import FontAwesome                         from 'react-fontawesome';
import { addedCard }                       from '../../actions/actions';
import { CARD_TYPES }                      from '../../constants/Constants';


class TitleBar extends Component {
  render() {
    return (
      <Navbar fixedTop fluid collapseOnSelect className="dummy navBar">
        <Navbar.Brand style={{float: "left", textAlign: "left", color: "white", paddingTop: "15px", paddingBottom: "0"}} >
          RepYourself.org
        </Navbar.Brand>
        <Nav className="dummy" pullRight style={{margin: "0", marginLeft: "150px"}}>
          <NavItem style={{textAlign: "right", color: "white"}} onClick={()=>{this.props.dispatch(addedCard(CARD_TYPES.ZIPENTER, {}));}}>Add Reps <FontAwesome style={{color:"white"}} className="fa-plus-square" name="addButton"/></NavItem>
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
