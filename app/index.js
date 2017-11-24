import { persistStore, } from 'redux-persist'
import { render, } from 'react-dom'
import React from 'react'
import shortid from 'shortid'

import { ACTIONS, } from './constants/Constants'
import { newUser, } from './utils/backendRequests'
import { configureStore } from './store/configureStore'
import App from './containers/App.jsx'

// Service Worker setup
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

// "borrowed" from:
// https://philipwalton.com/articles/loading-polyfills-only-when-needed/
function browserSupportsAllFeatures() {
  return window.Promise && window.fetch;
}

function loadScript(src, done) {
  console.log("executed loadScript")  
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}

if (browserSupportsAllFeatures()) {
  main()
} else {
  loadScript('polyfills.js', main)
  console.log("loading polyfills")
}

function main() {
  let temp = ""
  if (window.location.protocol.search('file') == -1) {
    temp = window.location.search.split("?s=").slice(-1)[0]
    history.pushState({}, null, "/")
  }

  const store = configureStore()
  store.dispatch({
    type: ACTIONS.ADDED_PARENT_ID,
    data: temp
  })

  const persistor = persistStore(
    store, 
    {}, 
    () => {
      let state = store.getState()
      if (state.userID == "") {
        let newUserID = shortid.generate()
        store.dispatch({type: ACTIONS.ADDED_USER_ID, data: newUserID})
        newUser(newUserID, state.parentID).then(data=>{
          store.dispatch({type: ACTIONS.ADDED_USER_ID, data: data})
        })
      }
    }
  )

  const rootElement = document.getElementById('root')
  render( <App store={store} />, rootElement )
}