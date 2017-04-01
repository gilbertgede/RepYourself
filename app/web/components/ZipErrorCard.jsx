import React, { Component, PropTypes }          from 'react';
import { respondedToBadZip }                    from '../../actions/actions';
import { connect }                              from 'react-redux';
import CardXElement                             from './CardXElement.jsx';
import { removedCard, }                         from '../../actions/actions';
import { CARD_TYPES, }                          from '../../constants/Constants';


class ZipErrorCard extends Component {
  render() {
    var temp = () => {this.props.dispatch(removedCard(CARD_TYPES.ZIPERROR, {}))};
    return (
        <li>
          <div className="purpleCard">
            <CardXElement execute={temp} />
            <div className="flex-card-content">
              <h2 className="flex-card-heading">Uh-oh</h2>
              <p>It looks like the ZIP Code you entered doesn't match anything we have on record.</p>
              <div onClick={() => {this.props.dispatch(respondedToBadZip());}} className="flex-card-button">Try again?</div>
            </div>
          </div>
        </li>
    );
  }
}

ZipErrorCard.propTypes = {
  dispatch: PropTypes.func.isRequired
};
const select = state => state;
export default connect(select)(ZipErrorCard);
