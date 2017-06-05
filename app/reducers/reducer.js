import clone                                              from 'clone';
import assign                                             from 'object-assign';
import { REHYDRATE, }                                     from 'redux-persist/constants'
import { ACTIONS, CARD_TYPES, CARD_MODIFIERS, }           from '../constants/Constants';
import { addCard, removeCard, replaceCard,
         updateCardData, updateCardModifier,
         findCardsByType, }                               from './cardHelpers';


const initialState = {
  cards: [{type: CARD_TYPES.ADDREPZIP, data: {}, modifier: CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].BASE}],
  requestOpen: false,
  zipCode: '00000',
  stateDistrict: 'NA 0',
  reps: [],
  detailReps: [],
  backendResponse: {},
  userID: '',
  parentID: '',
};

export default function reducer(state = initialState, action) {
  var dataAssign = {};
  switch (action.type) {
  case ACTIONS.RESET:
    return initialState;
  case REHYDRATE:
    var incoming = action.payload;
    if (!incoming) {
      break;
    }
    delete incoming.parentID;
    dataAssign = incoming;
    break;
  case ACTIONS.ADDED_USER_ID:
    dataAssign.userID = action.data;
    break;
  case ACTIONS.ADDED_PARENT_ID:
    dataAssign.parentID = action.data;
    break;
  case ACTIONS.ENTERED_ZIP_START:
    dataAssign.zipCode = action.data;
    dataAssign.requestOpen = true;
    break;
  case ACTIONS.ENTERED_ZIP_RESPONSE:
    dataAssign.requestOpen = false;
    dataAssign.backendResponse = action.data;
    var oldCard = state.cards[findCardsByType(state.cards, CARD_TYPES.ADDREPZIP)];
    dataAssign.cards = updateCardData(state.cards, oldCard, action.data);
    if (Object.keys(action.data).length == 0) {
      dataAssign.cards = updateCardModifier(dataAssign.cards, oldCard, CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].ZIPERROR);
      dataAssign.zipCode = '00000';
    }
    else if (Object.keys(action.data).length == 1) {
      for (var key in action.data) {
        dataAssign.reps = action.data[key];
        dataAssign.stateDistrict = key;
      }
      for (var rep of dataAssign.reps) {
        var newCard = {type: CARD_TYPES.REP, data: rep, modifier: CARD_MODIFIERS[CARD_TYPES.REP].BASE};
        dataAssign.cards = addCard(dataAssign.cards, newCard);
      }
      oldCard = dataAssign.cards[findCardsByType(dataAssign.cards, CARD_TYPES.ADDREPZIP)];
      dataAssign.cards = removeCard(dataAssign.cards, oldCard);
    }
    else {
      dataAssign.cards = updateCardModifier(dataAssign.cards, oldCard, CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].ZIPSELECT);
    }
    break;
  case ACTIONS.ZIP_ERROR:
    dataAssign.zipCode = '00000';
    var oldCard = state.cards[findCardsByType(state.cards, CARD_TYPES.ADDREPZIP)];
    dataAssign.cards = updateCardModifier(state.cards, oldCard, CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].BASE);
    break;
  case ACTIONS.DISPLAY_SELECTED_REPS:
    var reps = state.backendResponse[action.data];
    dataAssign.stateDistrict = action.data;
    dataAssign.reps = reps;
    for (var rep of dataAssign.reps) {
      var newCard = {type: CARD_TYPES.REP, data: rep, modifier: CARD_MODIFIERS[CARD_TYPES.REP].BASE};
      dataAssign.cards = addCard(state.cards, newCard);
    }
    var oldCard = dataAssign.cards[findCardsByType(dataAssign.cards, CARD_TYPES.ADDREPZIP)];
    dataAssign.cards = removeCard(dataAssign.cards, oldCard);
    break;
  case ACTIONS.REMOVED_CARD:
    dataAssign.cards = removeCard(state.cards, action.data.oldCard);
    break;
  case ACTIONS.UPDATED_CARD_MODIFIER:
    dataAssign.cards = updateCardModifier(state.cards, action.data.oldCard, action.data.newCardModifier);
    break;
  case ACTIONS.ADDED_CARD:
    // {type: action.data.newCardType, data: action.data.newCardData, modifier: CARD_MODIFIERS[inputCardType].BASE},
    dataAssign.cards = addCard(state.cards, action.data.newCard);
    break;
  // case ACTIONS.REPLACED_CARD:
  //   [dataAssign.cardsList] = replaceCard(cardsList, action.data.oldCard, action.data.newCard);
  //   break;
  }
  return assign({}, state, dataAssign);
}
