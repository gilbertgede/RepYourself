import React            from 'react';
import { render }       from 'react-dom';
import Root             from './containers/Root';
import configureStore   from '../store/configureStore';
import { persistStore } from 'redux-persist'


require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');

// load our css
require('./styles/style.less');

const store = configureStore();
persistStore(store);
const rootElement = document.getElementById('root');

render( <Root store={store} />, rootElement );
