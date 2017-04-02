import React, { Component, PropTypes }   from 'react';
import { connect }                       from 'react-redux';
import FontAwesome                       from 'react-fontawesome';
import CongressPersonCard                from '../components/CongressPersonCard.jsx';
import CongressPersonDetailCard          from '../components/CongressPersonDetailCard.jsx';
import LoadingCard                       from '../components/LoadingCard.jsx';
import ZipEntryCard                      from '../components/ZipEntryCard.jsx';
import ZipErrorCard                      from '../components/ZipErrorCard.jsx';
import ZipSelectCard                     from '../components/ZipSelectCard.jsx';
import { ACTIONS, CARD_TYPES, }          from '../../constants/Constants';


class CardList extends Component {
  render() {
    const { dispatch, cardsTypes, cardsDatas, userID } = this.props;
    var displayCards = [];
    for (var i=0; i<cardsTypes.length; i++) {
      if (userID == "") {
        displayCards.push(<LoadingCard key={i}/>);
        break;
      }
      var card;
      switch (cardsTypes[i]) {
      case CARD_TYPES.ZIPENTER:
        displayCards.push(<ZipEntryCard key={i}/>);
        break;
      case CARD_TYPES.REP:
        displayCards.push(<CongressPersonCard rep={cardsDatas[i]} key={i}/>);
        break;
      case CARD_TYPES.DETAILREP:
        displayCards.push(<CongressPersonDetailCard rep={cardsDatas[i]} key={i}/>);
        break;
      case CARD_TYPES.ZIPERROR:
        displayCards.push(<ZipErrorCard key={i}/>);
        break;
      case CARD_TYPES.ZIPSELECT:
        displayCards.push(<ZipSelectCard key={i}/>);
        break;
      default:
        console.log("bad default in cardComponentCreator, got type: ");
        console.log(cardsTypes[i]);
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
  dispatch: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
}
const select = state => state;
export default connect(select)(CardList);
