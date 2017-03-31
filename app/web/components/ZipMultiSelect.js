import React, { Component, PropTypes }                   from 'react';
import { Button, ButtonGroup }                           from 'react-bootstrap';
import { Grid, Row, Col, Nav, Navbar, NavItem }          from 'react-bootstrap';
import { handleZipResponse }                             from '../../actions/actions';


export default class ZipMultiSelect extends Component {
  render() {
    var districtOptions = [];
    for (var key in this.props.backendResponse) {
      var dist = this.props.backendResponse[key];
      var rep = dist.filter(function(r) {
        return r.isSenator == false;
      })[0];
      var temp = (key) => {console.log("key");console.log(key); return ()=>{this.props.dispatch(handleZipResponse(key));};};
      districtOptions.push(<Button key={key} onClick={temp(key)}>{key} - {rep.name}</Button>);
    }
    return (
      <Row>
        <div className="introContainer">
          <h4>Looks like your zip is in multiple congressional districts. Select your specific district below.</h4>
           <ButtonGroup block vertical>
            {districtOptions}
          </ButtonGroup>
        </div>
      </Row>
    );
  }
}

ZipMultiSelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backendResponse: PropTypes.object.isRequired,
}
