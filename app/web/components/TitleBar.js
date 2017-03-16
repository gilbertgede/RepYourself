import React, { Component, PropTypes }     from 'react';
import { Nav, Navbar, NavItem }            from 'react-bootstrap';
import { connect }                         from 'react-redux';
import { switchedSection }                 from '../../actions/actions';
import { SECTIONS }                        from '../../constants/Constants';

class TitleBar extends Component {
  handleSelect(eventKey) {
    event.preventDefault();
    this.props.dispatch(switchedSection(eventKey));
  }
  render() {
    return (
      <Navbar fixedTop inverse fluid collapseOnSelect className="navBar">
        <Navbar.Header>
          <Navbar.Brand>
            RepYourself.org
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey={SECTIONS.INTRO}>Intro</NavItem>
            <NavItem eventKey={SECTIONS.REPS}>Reps</NavItem>
            <NavItem eventKey={SECTIONS.ABOUT}>About</NavItem>
          </Nav>
        </Navbar.Collapse>
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
