import { backendURL, backendAPIKey, } from '../../secrets'
import { CONTACT_TYPES, } from '../constants/Constants'


export function getRepsFromZip(zipCode) {
  return (
    fetch(`${backendURL}zipcodeinfo/${zipCode}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': backendAPIKey,
      },
    }).then(function(response) {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  )
}

export function newUser(userID, parentID="") {
  /*
   * the backend call for this expect a JSON with:
   * {trialID: trialID, parentid: parentID}, where trialID and parentID have
   * been generated with shortid.
   * Returns a JSON with the key userID and the value conforming to shortid.
   */
  let newUserInfo = {}
  newUserInfo = {"userID": userID, "parentid": parentID}
  
  return (
    fetch(`${backendURL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': backendAPIKey,
      },
      body: JSON.stringify(newUserInfo)
    }).then(function(response) {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then(function(myJSON) { 
      return myJSON.userID
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  )
}

export function userMadeContact(userID, type, repBioID) {
  /*
   * The backend call for this expect a JSON with: the `contacttype` (string
   * of "call", "tweet", "facebook") and `contactid` (congress person's
   * bioguide id).
   */
  let newContactInfo = { "contacttype": type, "contactid": repBioID, "contacttime": new Date().toLocaleString() }

  return (
    fetch(`${backendURL}users/${userID}/contactrecords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': backendAPIKey,
      },
      body: JSON.stringify(newContactInfo)
    }).then(function(response) {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  )
}
