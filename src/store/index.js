// import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from "history";

import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware()
const initialState = {};

const composeEnhancers =
(typeof window !== 'undefined' &&
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;
const middlewares = [sagaMiddleware, routerMiddleware(history)];

// const composeEnhancers = composeWithDevTools({
//   // options like actionSanitizer, stateSanitizer
// });

export const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);
