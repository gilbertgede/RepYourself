import assign from 'object-assign'
import { REHYDRATE, } from 'redux-persist/constants'

import { ACTIONS, VISIBLE_PAGES, ZIP_DATA_STATE, } from '../constants/Constants'


const initialState = {
  zipCode: '',
  zipDataState: ZIP_DATA_STATE.NONE,
  backendResponse: {},
  stateDistrict: 'NA 0',
  reps: [],
  visiblePage: VISIBLE_PAGES.ABOUT,
  userID: '',
  parentID: '',
}

export default function reducer(state = initialState, action) {
  let dataAssign = {}
  switch (action.type) {
  case ACTIONS.RESET:
    return initialState
  case REHYDRATE:
    let incoming = action.payload
    if (!incoming) {
      break
    }
    delete incoming.parentID
    dataAssign = incoming
    break
  case ACTIONS.ADDED_USER_ID:
    dataAssign.userID = action.data
    break
  case ACTIONS.ADDED_PARENT_ID:
    dataAssign.parentID = action.data
    break
  case ACTIONS.SELECT_VISIBLE_PAGE:
    dataAssign.visiblePage = action.data
    break
  case ACTIONS.ZIP_REQUEST_START:
    // ASSERT zipDataState = NONE
    dataAssign.zipCode = action.data
    dataAssign.zipDataState = ZIP_DATA_STATE.REQUEST_OPEN
    break
  case ACTIONS.ZIP_REQUEST_RESPONSE:
    // ASSERT zipDataState = REQUEST_OPEN
    dataAssign.backendResponse = action.data
    if (Object.keys(action.data).length == 0) {
      dataAssign.zipDataState = ZIP_DATA_STATE.ERROR
    }
    else if (Object.keys(action.data).length == 1) {
      for (let key in action.data) {
        dataAssign.reps = action.data[key]
        dataAssign.stateDistrict = key
      }
      dataAssign.zipDataState = ZIP_DATA_STATE.RESOLVED
      dataAssign.visiblePage = VISIBLE_PAGES.REPS
    }
    else {
      dataAssign.zipDataState = ZIP_DATA_STATE.MULTI
    }
    break
  case ACTIONS.ZIP_MULTI_SELECT:
    // ASSERT zipDataState = MULTI
    dataAssign.zipDataState = ZIP_DATA_STATE.MULTI_RESOLVED
    dataAssign.reps = state.backendResponse[action.data]
    dataAssign.visiblePage = VISIBLE_PAGES.REPS
    break
  case ACTIONS.ZIP_RESET:
    // ASSERT zipDataState = ERROR
    dataAssign.zipCode = ''
    dataAssign.zipDataState = ZIP_DATA_STATE.NONE
    dataAssign.reps = []
    break
  }
  return assign({}, state, dataAssign)
}
