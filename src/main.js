import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './router/index'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './view/home'
import List from './view/order/list'
// import { Provider } from 'react-redux'
// import { ConnectRouter } from 'connected-react-router'
// import { BrowserRouter } from 'react-router-dom'

// import App from './App'
// import { store, history } from './store'
// import App from './App'

// console.log(React)

const Entry = () => (
  <BrowserRouter>
      {/* <div> */}
        <Switch>
          <Route path="/" component={Home}></Route>
          <Route path="/list" component={List}></Route>
        </Switch>
      {/* </div> */}
    </BrowserRouter>
  // <div>
    // <Provider store={store}>
      // {/* <ConnectRouter history={history}> */}
        // <App />
      // {/* </ConnectRouter> */}
    // </Provider>
  // </div>
)

// ReactDOM.render(<Entry/>, document.getElementById('app'))



ReactDOM.render(<Entry />, document.getElementById('app'))
  