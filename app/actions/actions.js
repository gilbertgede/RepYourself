import { ACTIONS, }  from '../constants/Constants'
import { getRepsFromZip, } from '../utils/backendRequests'


export function enteredZipCode(zipCode) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.ZIP_REQUEST_START,
      data: zipCode,
    })
    getRepsFromZip(zipCode).then(data => {
      dispatch({
        type: ACTIONS.ZIP_REQUEST_RESPONSE,
        data: data,
      })
    })
  }
}

export function handleZipError() {
  return { type: ACTIONS.ZIP_RESET }
}

export function handleZipResponse(selectedStateDistrict) {
  return { type: ACTIONS.ZIP_MULTI_SELECT, data: selectedStateDistrict }
}

export function changeVisiblePage(newVisiblePage) {
  return { type: ACTIONS.SELECT_VISIBLE_PAGE, data: newVisiblePage }
}
