import { generateEnumObject, } from '../utils/utils'


const actionsArray = [
  'RESET',
  'ZIP_REQUEST_START',
  'ZIP_REQUEST_RESPONSE',
  'ADDED_USER_ID',
  'ADDED_PARENT_ID',
]
const uiActionsArray = [
  'ZIP_RESET',
  'ZIP_MULTI_SELECT',
  'SELECT_VISIBLE_PAGE',
]

export const ACTIONS = generateEnumObject(actionsArray, uiActionsArray)

const zipDataStatesArray = [
  "NONE", // ZIP_RESET
  "REQUEST_OPEN", // ZIP_REQUEST_START
  "RESOLVED", // ZIP_REQUEST_RESPONSE
  "MULTI", // ZIP_REQUEST_RESPONSE
  "MULTI_RESOLVED", // ZIP_MULTI_SELECT
  "ERROR", // ZIP_REQUEST_RESPONSE
]

export const ZIP_DATA_STATE = generateEnumObject(zipDataStatesArray)

const contactTypesArray = [
  "CALL",
  "TWEET",
  "FACEBOOK",
]

export const CONTACT_TYPES = generateEnumObject(contactTypesArray)

export const VISIBLE_PAGES = {
  REPS: 0,
  FEED: 1,  
  ABOUT: 2,
}
