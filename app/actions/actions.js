import { ACTIONS, SECTIONS, }                   from '../constants/Constants';
import { getRepsFromZip, }                      from '../backendRequests';

export function addedCard(newCard) {
  return { type: ACTIONS.ADDED_CARD, data: {newCard: newCard} };
}

export function removedCard(oldCard) {
  return { type: ACTIONS.REMOVED_CARD, data: {oldCard: oldCard} };
}

// export function replacedCard(oldCard, newCard) {
//   return { type: ACTIONS.REPLACED_CARD, data: {oldCard: oldCard, newCard: newCard} };
// }

export function modifiedCard(oldCard, newCardModifier) {
  return { type: ACTIONS.UPDATED_CARD_MODIFIER, data: {oldCard: oldCard, newCardModifier: newCardModifier} };
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
