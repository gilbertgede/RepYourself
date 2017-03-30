import { ACTIONS, SECTIONS, } from '../constants/Constants';
import { getRepsFromZip, } from '../backendRequest';

export function addedCard(newCardType, newCardData) {
  return { type: ACTIONS.ADDED_CARD, data: {newCardType: newCardType, newCardData: newCardData} };
}

export function removedCard(oldCardType, oldCardData) {
  return { type: ACTIONS.REMOVED_CARD, data: {oldCardType: oldCardType, oldCardData: oldCardData} };
}

export function replacedCard(oldCard, newCard) {
  return { type: ACTIONS.REPLACED_CARD, data: {oldCard: oldCard, newCard: newCard} };
}

export function enteredZipCode(zipCode) {
  return dispatch => {
    dispatch({ type: ACTIONS.ENTERED_ZIP_START, data: zipCode });
    getRepsFromZip(zipCode).then(data => {
      dispatch({ type: ACTIONS.ENTERED_ZIP_RESPONSE, data: data });
    });
  };
}

export function respondedToBadZip() {
  return { type: ACTIONS.ZIP_ERROR };
}

export function handleZipResponse(selectedStateDistrict) {
  return { type: ACTIONS.DISPLAY_SELECTED_REPS, data: selectedStateDistrict };
}
