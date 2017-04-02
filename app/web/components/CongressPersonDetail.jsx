import React, { Component, PropTypes }               from 'react';
import { Grid, Row, Col }                            from 'react-bootstrap';
import { connect }                                   from 'react-redux';
import { Button }                                    from 'react-bootstrap';
import { switchedSection }                           from '../../actions/actions';
import { SECTIONS, }                                 from '../../constants/Constants';

var FontAwesome = require('react-fontawesome');


class CongressPersonDetail extends Component {
  render() {
    const { detailRep } = this.props;
    var rep = detailRep;
    var color = rep.party[0] == "D" ? "congress-person-row-blue" : "congress-person-row-red";
    return (
      <Row className={color}>
        Person: {rep.name}. TODO Add detail page soon.
        <Button onClick={() => {this.props.dispatch(switchedSection(SECTIONS.REPS));}}>Back to Reps</Button>
      </Row>
    );
  }
}

CongressPersonDetail.propTypes = {
  detailRep: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
const select = state => state;
export default connect(select)(CongressPersonDetail);
