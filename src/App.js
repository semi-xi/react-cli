// import Router from './router/index'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './view/home'
import List from './view/order/list'
import './style.scss'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home}></Route>
          <Route path="/list" component={List}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

// export default function () {
//   return <Router />
// }