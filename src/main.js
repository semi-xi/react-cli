import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { store, history } from './store'



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>, 
  document.getElementById('app'))