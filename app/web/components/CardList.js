import React, { Component, PropTypes }   from 'react';
import { connect }                       from 'react-redux';

import { ACTIONS, CARD_TYPES, }         from '../../constants/Constants';

import CongressPersonCard           from '../components/CongressPersonCard';
import ZipEntryCard                 from '../components/ZipEntryCard';
import ZipErrorCard                 from '../components/ZipErrorCard';
import ZipSelectCard                from '../components/ZipSelectCard';


var FontAwesome = require('react-fontawesome');

class CardList extends Component {
  render() {
    const { dispatch, cardsTypes, cardsDatas } = this.props;
    var displayCards = [];
    for (var i=0; i<cardsTypes.length; i++) {
      var card;
      switch (cardsTypes[i]) {
      case CARD_TYPES.ZIPENTER:
        displayCards.push(<ZipEntryCard/>);
        break;
      case CARD_TYPES.REP:
        displayCards.push(<CongressPersonCard rep={cardsDatas[i]}/>);
        break;
      case CARD_TYPES.ZIPERROR:
        displayCards.push(<ZipErrorCard/>);
        break;
      case CARD_TYPES.ZIPSELECT:
        displayCards.push(<ZipSelectCard backendResponse={cardsDatas[i]}/>);
        break;
      default:
        console.log("bad default in cardComponentCreator");
        break;
      }
    }
    return (
      <div className="list-container">
        <ul className="flex-card-list">
          {displayCards}
        </ul>
      </div>
    );
  }
}

CardList.propTypes = {
  cardsTypes: PropTypes.array.isRequired,
  cardsDatas: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(CardList);
