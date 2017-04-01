import { createStore, applyMiddleware, compose }      from 'redux';
import thunk                                          from 'redux-thunk';
import reducer                                        from '../reducers/reducer';
import { autoRehydrate, persistStore }                from 'redux-persist';

// Create a store with redux-thunk middleware and autoRehydrate (for redux-persist)
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
