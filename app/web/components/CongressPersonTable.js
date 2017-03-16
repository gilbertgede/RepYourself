import React, { Component, PropTypes }                   from 'react';
import { Grid, Row, Col }                                from 'react-bootstrap';
import CongressPersonRow                                 from './CongressPersonRow';


export default class CongressPersonTable extends Component {
  render() {
    const { reps, dispatch } = this.props;
    var rows = [];
    reps.forEach( function(rep) {
      rows.push(<CongressPersonRow rep={rep} key={rep.name} dispatch={dispatch}/>);
    });
    return (
      <div className="congress-person-table">
        <Row>
          {rows}
        </Row>
      </div>
    );
  }
}

CongressPersonTable.propTypes = {
  reps: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}
