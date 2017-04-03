import React            from 'react';
import { render }       from 'react-dom';
import { persistStore } from 'redux-persist'
import Root             from './containers/Root';
import configureStore   from '../store/configureStore';
import { ACTIONS, }     from '../constants/Constants';
import { newUser, }     from '../backendRequests';




require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('./styles/style.less');

var temp = window.location.search.split("?s=").slice(-1)[0];
history.pushState({}, null, "/");

const store = configureStore();
store.dispatch({type: ACTIONS.ADDED_PARENT_ID, data: temp })

export const persistor = persistStore(store, {}, ()=>{
  let state = store.getState();
  if (state.userID == "") {
    newUser(state.parentID).then(data=>{
      console.log(data);
      store.dispatch({type: ACTIONS.ADDED_USER_ID, data: data.id})
    });
  }
});

const rootElement = document.getElementById('root');
render( <Root store={store} />, rootElement );
