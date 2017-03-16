import { ACTIONS, SECTIONS, } from '../constants/Constants';
import { getRepsFromZip, } from '../backendRequest';

export function switchedSection(newSection) {
  return { type: ACTIONS.SWITCHED_SECTION, data: newSection };
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

export function displayDetailRep(detailRep) {
  return { type: ACTIONS.DISPLAY_DETAIL_REP, data: detailRep };
}
