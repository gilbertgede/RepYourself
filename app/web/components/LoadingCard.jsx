import React, { Component, PropTypes }       from 'react';
import { connect }                           from 'react-redux';
import Paper       from 'material-ui/Paper';
import { enteredZipCode }                    from '../../actions/actions';
import { removedCard, }                      from '../../actions/actions';
import { CARD_TYPES, }                       from '../../constants/Constants';


class LoadingCard extends Component {
  render() {
    return (
      <div className="base-card">
        <Paper zDepth={2} style={ { position: "relative", top: "0px", left: "0px", width: "320px" } }>
          <h3 className="flex-card-heading">Loading</h3>
          <p>RepYourself.org will be ready in a few seconds...</p>
        </Paper>
      </div>
    );
  }
}

LoadingCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const select = state => state;
export default connect(select)(LoadingCard);
