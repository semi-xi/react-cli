import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import reducer from './reducers'

// enhancer 
// compose middleware

export const history = createBrowserHistory()
const composeEnhancers =
(typeof window !== 'undefined' &&
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;
const middleware = [routerMiddleware(history)]
export const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))
