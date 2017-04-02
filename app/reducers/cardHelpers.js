import { ACTIONS, CARD_TYPES, } from '../constants/Constants';

var equal = require('deep-equal');


export function addCard(typeList, dataList, inputCardType, inputCardData) {
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

export function removeCard(typeList, dataList, removalCardType=undefined, removalCardData=undefined) {
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

export function replaceOrAddCardByType(typeList, dataList, oldCardType, newCardType, newCardData) {
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

export function replaceOrAddCardByData(typeList, dataList, oldCardData, newCardType, newCardData) {
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
