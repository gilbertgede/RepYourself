import React, { Component, PropTypes }   from 'react';
import { connect }                       from 'react-redux';
import FontAwesome                       from 'react-fontawesome';
import CongressPersonCard                from '../components/CongressPersonCard.jsx';
import LoadingCard                       from '../components/LoadingCard.jsx';
import ZipEntryCard                      from '../components/ZipEntryCard.jsx';
import { ACTIONS, CARD_TYPES, }          from '../../constants/Constants';


class CardList extends Component {
  render() {
    const { dispatch, cards, userID } = this.props;
    var displayCards = [];
    for (var i=0; i<cards.length; i++) {
      var card = cards[i];
      switch (card.type) {
      case CARD_TYPES.ADDREPZIP:
        displayCards.push(<ZipEntryCard card={card} key={i}/>);
        break;
      case CARD_TYPES.REP:
        displayCards.push(<CongressPersonCard card={card} key={i}/>);
        break;
      default:
        console.log("bad default in cardComponentCreator, got type: ");
        console.log(card);
        break;
      }
    }
    console.log("drawing card list")
    return (
      <div className="list-container" style={{ height: "calc(100% - 50px)" }}>
        <div className="flex-card-list">
          {displayCards}
        </div>
      </div>
    );
  }
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
}
const select = state => state;
export default connect(select)(CardList);
