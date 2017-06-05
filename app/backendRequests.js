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
          // console.log("resolved");
          // console.log(res.body);
          resolve(res.body);
        }
      }
    );
  });
}

export function newUser(userID, parentID="") {
  /*
   * the backend call for this expect a JSON with:
   * {trialID: trialID, parentid: parentID}, where trialID and parentID have
   * been generated with shortid.
   * Returns a JSON with the key userID and the value conforming to shortid.
   */
  var newUserInfo = {};
  newUserInfo = {"userID": userID, "parentid": parentID};
  return new Promise((resolve, reject) => {
    request
      .post(backendURL + "users")
      .send(newUserInfo)
      .set('X-Api-Key', backendAPIKey)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          // console.log("resolved");
          // console.log(res.body);
          resolve(res.body.userID);
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
  var newContactInfo = { "contacttype": type, "contactid": repBioID };
  return new Promise((resolve, reject) => {
    request
      .post(backendURL + "users/" + userID + "/contactrecords")
      .send(newContactInfo)
      .set('X-Api-Key', backendAPIKey)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          // console.log("resolved");
          // console.log(res.body);
          resolve(res.body);
        }
      }
    );
  });
}
