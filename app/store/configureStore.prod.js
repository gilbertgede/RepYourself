import { createStore, applyMiddleware, compose } from 'redux';
import thunk    from 'redux-thunk';
import reducer  from '../reducers';
import { autoRehydrate, persistStore } from 'redux-persist';

// create a store that has redux-thunk middleware enabled
// const createStoreWithMiddleware = compose(
//   applyMiddleware(thunk),
//   autoRehydrate()
// )(createStore);

export default function configureStore() {
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );
  return store;
}
