import React, { Component, PropTypes }                   from 'react';
import { Grid, Row, Col, Nav, Navbar, NavItem }          from 'react-bootstrap';
import { enteredZipCode }                                from '../../actions/actions';


export default class ZipCodeEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value.length == 5) {
      this.props.dispatch(enteredZipCode(event.target.value));
    }
  }
  render() {
    return (
      <Row>
        <div className="introContainer">
          <h1>Welcome to RepYourself.org!</h1>
          <p>Tell us your ZIP Code to be matched with your elected representatives!</p>
          <div className="zipCodeEntry">
            <form>
              <label>
                <input type="number" size="5" pattern="\d*" placeholder="ZIP Code" value={this.state.value} style={{textAlign: "center"}} onChange={this.handleChange} />
              </label>
            </form>
          </div>
        </div>
      </Row>
    );
  }
}

ZipCodeEntry.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
