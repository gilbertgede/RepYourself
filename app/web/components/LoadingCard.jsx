import React, { Component, PropTypes }       from 'react';
import { connect }                           from 'react-redux';
import CardXElement                          from './CardXElement.jsx';
import { enteredZipCode }                    from '../../actions/actions';
import { removedCard, }                      from '../../actions/actions';
import { CARD_TYPES, }                       from '../../constants/Constants';


class LoadingCard extends Component {
  render() {
    return (
      <li>
        <div className="purpleCard">
          <div className="flex-card-content">
            <h2 className="flex-card-heading">Loading</h2>
            <p>RepYourself.org will be ready in a few seconds...</p>
          </div>
        </div>
      </li>
    );
  }
}

LoadingCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const select = state => state;
export default connect(select)(LoadingCard);
