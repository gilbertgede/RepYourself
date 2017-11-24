console.log("imported polyfills")

import 'whatwg-fetch'

import Promise from 'promise-polyfill'; 

if (!window.Promise) {
  window.Promise = Promise;
}