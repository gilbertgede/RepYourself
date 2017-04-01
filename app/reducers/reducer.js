import clone                                              from 'clone';
import assign                                             from 'object-assign';
import { ACTIONS, CARD_TYPES, }                           from '../constants/Constants';
import { addCard, removeCard, replaceOrAddCardByType,
         replaceOrAddCardByData, }                        from './cardHelpers';


const initialState = {
  cardsTypes: [CARD_TYPES.ZIPENTER],
  cardsDatas: [{}],
  requestOpen: false,
  zipCode: '00000',
  stateDistrict: 'NA 0',
  reps: [],
  detailReps: [],
  backendResponse: {},
};

export default function reducer(state = initialState, action) {
  var { cardsTypes, cardsDatas } = state;
  var dataAssign = {};
  switch (action.type) {
  case ACTIONS.ENTERED_ZIP_START:
    dataAssign.zipCode = action.data;
    dataAssign.requestOpen = true;
    break;
  case ACTIONS.ENTERED_ZIP_RESPONSE:
    dataAssign.requestOpen = false;
    dataAssign.backendResponse = action.data;
    if (Object.keys(action.data).length == 0) {
      [dataAssign.cardsTypes, dataAssign.cardsDatas] = replaceOrAddCardByType(cardsTypes, cardsDatas, CARD_TYPES.ZIPENTER, CARD_TYPES.ZIPERROR, {});
      dataAssign.zipCode = '00000';
    }
    else if (Object.keys(action.data).length == 1) {
      for (var key in action.data) {
        dataAssign.reps = action.data[key];
        dataAssign.stateDistrict = key;
      }
      for (var rep of dataAssign.reps) {
        [dataAssign.cardsTypes, dataAssign.cardsDatas] = replaceOrAddCardByData(cardsTypes, cardsDatas, rep, CARD_TYPES.REP, rep);
      }
      [dataAssign.cardsTypes, dataAssign.cardsDatas] = removeCard(cardsTypes, cardsDatas, CARD_TYPES.ZIPENTER, undefined);
    }
    else {
      [dataAssign.cardsTypes, dataAssign.cardsDatas] = replaceOrAddCardByType(cardsTypes, cardsDatas, CARD_TYPES.ZIPENTER, CARD_TYPES.ZIPSELECT, dataAssign.backendResponse);
    }
    break;
  case ACTIONS.ZIP_ERROR:
    dataAssign.zipCode = '00000';
    [dataAssign.cardsTypes, dataAssign.cardsDatas] = replaceOrAddCardByType(cardsTypes, cardsDatas, CARD_TYPES.ZIPERROR, CARD_TYPES.ZIPENTER, {});
    break;
  case ACTIONS.DISPLAY_SELECTED_REPS:
    [dataAssign.cardsTypes, dataAssign.cardsDatas] = removeCard(cardsTypes, cardsDatas, CARD_TYPES.ZIPSELECT, undefined);
    var reps = state.backendResponse[action.data];
    dataAssign.stateDistrict = action.data;
    dataAssign.reps = reps;
    for (var rep of dataAssign.reps) {
      [dataAssign.cardsTypes, dataAssign.cardsDatas] = replaceOrAddCardByData(cardsTypes, cardsDatas, rep, CARD_TYPES.REP, rep);
    }
    break;
  case ACTIONS.REMOVED_CARD:
    [dataAssign.cardsTypes, dataAssign.cardsDatas] = removeCard(cardsTypes, cardsDatas, action.data.oldCardType, action.data.oldCardData);
    break;
  case ACTIONS.ADDED_CARD:
    [dataAssign.cardsTypes, dataAssign.cardsDatas] = addCard(cardsTypes, cardsDatas, action.data.newCardType, action.data.newCardData);
    break;
  }
  return assign({}, state, dataAssign);
}
