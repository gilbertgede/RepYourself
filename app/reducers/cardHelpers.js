import { ACTIONS, CARD_TYPES, CARD_MODIFIERS, }     from '../constants/Constants';
import equal                                        from 'deep-equal';


function keepOneCard(cardList) {
  if (cardList.length == 0) {
    cardList.splice(0, 0, {type: CARD_TYPES.ADDREPZIP, data: {}, modifier: CARD_MODIFIERS[CARD_TYPES.ADDREPZIP].BASE});
  }
  return cardList.slice(0);
}

export function addCard(cardList, newCard) {
  switch (newCard.type) {
  case CARD_TYPES.ADDREPZIP:
    if (cardList[0].type != newCard.type) {
      cardList.splice(0, 0, newCard);
    }
    break;
  case CARD_TYPES.REP:
    var datas = cardList.map(function(obj) { return obj.data; });
    var canAddCard = true;
    for (var i=0; i<datas.length; i++) {
      if (equal(newCard.data, datas[i])) {
        canAddCard = false;
      }
    }
    if (canAddCard) {
      cardList.splice(1, 0, newCard);
    }
    break;
  default:
    break;
  }
  return keepOneCard(cardList);
}

export function removeCard(cardList, removalCard) {
  var removalIndices = [];
  for (var i=0; i<cardList.length; i++) {
    if (equal(removalCard, cardList[i])) {
      removalIndices.splice(0, 0, i);
    }
  }
  for (var i of removalIndices) {
    cardList.splice(i, 1);
  }
  return keepOneCard(cardList);
}

export function replaceCard(cardList, oldCard, newCard) {
  for (var i=0; i<cardList.length; i++) {
    if (equal(cardList[i], oldCard)) {
      cardList[i] = newCard;
    }
  }
  return keepOneCard(cardList);
}

export function updateCardData(cardList, oldCard, newCardData) {
  for (var i=0; i<cardList.length; i++) {
    if (equal(cardList[i], oldCard)) {
      cardList[i].data = newCardData;
    }
  }
  return keepOneCard(cardList);
}

export function updateCardModifier(cardList, oldCard, newCardModifier) {
  for (var i=0; i<cardList.length; i++) {
    if (equal(cardList[i], oldCard)) {
      cardList[i].modifier = newCardModifier;
    }
  }
  return keepOneCard(cardList);
}

export function findCardsByType(cardList, cardType) {
  var retArray = [];
  for (var i=0; i<cardList.length; i++) {
    if (equal(cardList[i].type, cardType)) {
      retArray.push(i);
    }
  }
  return retArray;
}
