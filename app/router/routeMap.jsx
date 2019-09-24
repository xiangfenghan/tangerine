import React from 'react'
import { Router, Route, IndexRoute} from 'react-router'
import App from '../containers'
import Login from '../containers/Login'
import User from '../containers/User'


class RouteMap extends React.Component {
  render(){
    return (
      <Router history = {this.props.history}>
        <Route path="/" component = {App}>
          <IndexRoute component = {Login}/>
          <Route path="/user" component={User}/>
        </Route>
      </Router>
    )
  }
}
export default RouteMap
