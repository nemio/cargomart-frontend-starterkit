// @flow

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import CreateAsyncMiddleware from 'middlewares/async';

export function configureStore(reducer) {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const middlewares = [CreateAsyncMiddleware(), thunk];

  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
