import { backendURL, backendAPIKey, }   from '../secrets';
import { CONTACT_TYPES, }               from './constants/Constants';
import request                          from 'superagent';


export function getRepsFromZip(zipCode) {
  return new Promise((resolve, reject) => {
    request
      .get(backendURL + "zipcodeinfo/" + zipCode)
      .set('x-api-key', backendAPIKey)
      .query({})
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      }
    );
  });
}

export function newUser(parentid=undefined) {
  /*
   * the backend call for this expect a JSON with: the key `parentid` [sic]
   * and the value is 6 chars of a-zA-Z0-9; or nothing. Returns a JSON with the
   * key userID and the value of 6 chars of a-zA-Z0-9.
   */
  var newUserInfo = {};
  if (parentid != undefined) {
    newUserInfo = {parentid: parentid};
  }
  return new Promise((resolve, reject) => {
    request
      .post(backendURL + "users/")
      .set('X-API-Key', backendAPIKey)
      .send(newUserInfo)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("resolved");
          console.log(res.body);
          resolve(res.body);
        }
      }
    );
  });
}

export function userMadeContact(userID, type, repBioID) {
  /*
   * The backend call for this expect a JSON with: the `contacttype` (string
   * of "call", "tweet", "facebook") and `contactid` (congress person's
   * bioguide id).
   */
  return new Promise((resolve, reject) => {
    request
      .post(backendURL + "users/" + userID + "/contacts")
      .set('X-API-Key', backendAPIKey)
      .send({ contacttype: type, contactid: repBioID })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("resolved");
          console.log(res.body);
          resolve(res.body);
        }
      }
    );
  });
}
