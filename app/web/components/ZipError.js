import React, { Component, PropTypes }              from 'react';
import { Button }                                   from 'react-bootstrap';
import { SECTIONS, }                                from '../../constants/Constants';
import { switchedSection }                          from '../../actions/actions';



export default class ZipError extends Component {
  render() {
    return (
      <div>
        <h3>Uh-oh</h3>
        <p>It looks like the zip code you entered doesn't match anything we have on record.</p>
        <Button onClick={() => {this.props.dispatch(switchedSection(SECTIONS.INTRO));}}>Try again?</Button>
      </div>
    );
  }
}

ZipError.propTypes = {
  dispatch: PropTypes.func.isRequired
};
