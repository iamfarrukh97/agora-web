import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Tours from './screens/Tours'
import UserType from './screens/UserType'
import Live from './screens/Live'
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/Tours' component={Tours} />
        <Route exact path='/' component={UserType} />
        <Route exact path='/Live' component={Live} />
      </Switch>
    </Router>
  )
}
