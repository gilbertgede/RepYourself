import { createStore, applyMiddleware, compose }      from 'redux';
import thunk                                          from 'redux-thunk';
import createLogger                                   from 'redux-logger';
import reducer                                        from '../reducers/reducer';
import DevTools                                       from '../web/containers/DevTools.jsx';
import { autoRehydrate, persistStore }                from 'redux-persist'


// Create a store with redux-thunk middleware, dev tooling enabled, and
// autoRehydrate (for redux-persist). The logger middleware logs
// the previous state, the action, and the next state to the  console;
// instrumenting the dev tools allows for us to commit different actions,
// and go forwards and backwards in time.
export default function configureStore() {
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(createLogger()),
      autoRehydrate(),
      DevTools.instrument()
    )
  );

  // webpack hot module replacement for reducers
  // NOTE: I don't know if this is actually useful for us, or how well it works
  if (module.hot) {
    module.hot.accept('../reducers/reducer', () => {
      const nextRootReducer = require('../reducers/reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
