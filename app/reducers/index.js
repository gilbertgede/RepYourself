import clone        from 'clone';
import assign       from 'object-assign';
import { ACTIONS, CARD_TYPES, } from '../constants/Constants';

var equal = require('deep-equal');

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

function addCard(typeList, dataList, inputCardType, inputCardData) {
  switch (inputCardType) {
  case CARD_TYPES.ZIPENTER:
  case CARD_TYPES.ZIPERROR:
  case CARD_TYPES.ZIPSELECT:
    if (typeList[0] != CARD_TYPES.ZIPENTER && typeList[0] != CARD_TYPES.ZIPERROR && typeList[0] != CARD_TYPES.ZIPSELECT) {
      typeList.splice(0, 0, inputCardType);
      dataList.splice(0, 0, inputCardData);
    }
    break;
  case CARD_TYPES.REP:
    typeList.splice(1, 0, inputCardType);
    dataList.splice(1, 0, inputCardData);
    break;
  case CARD_TYPES.ABOUT:
    typeList.push(inputCardType);
    dataList.push(inputCardData);
    break;
  default:
    break;
  }
  return [typeList.slice(0), dataList.slice(0)];
}

function removeCard(typeList, dataList, removalCardType=undefined, removalCardData=undefined) {
  var removalIndices = [];
  for (var i=0; i<typeList.length; i++) {
    if (removalCardType == undefined || equal(removalCardType, typeList[i])) {
      if (removalCardData == undefined || equal(removalCardData, dataList[i])) {
        console.log("had a match");
        removalIndices.splice(0, 0, i);
      }
    }
  }
  for (var i of removalIndices) {
    typeList.splice(i, 1);
    dataList.splice(i, 1);
  }
  return [typeList.slice(0), dataList.slice(0)];
}

function replaceOrAddCardByType(typeList, dataList, oldCardType, newCardType, newCardData) {
  var replaced = false;
  for (var i=0; i<typeList.length; i++) {
    if (equal(oldCardType, typeList[i])) {
      typeList[i] = newCardType;
      dataList[i] = newCardData;
      replaced = true;
    }
  }
  if (!replaced) {
    return addCard(typeList, dataList, newCardType, newCardData);
  }
  else {
    return [typeList.slice(0), dataList.slice(0)];
  }
}

function replaceOrAddCardByData(typeList, dataList, oldCardData, newCardType, newCardData) {
  var replaced = false;
  for (var i=0; i<dataList.length; i++) {
    console.log(oldCardData);
    console.log(dataList[i]);
    if (equal(oldCardData, dataList[i])) {
      console.log("replaced");
      typeList[i] = newCardType;
      dataList[i] = newCardData;
      replaced = true;
    }
  }
  if (!replaced) {
    return addCard(typeList, dataList, newCardType, newCardData);
  }
  else {
    return [typeList.slice(0), dataList.slice(0)];
  }
}

export default function reduce(state = initialState, action) {
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
