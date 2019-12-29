import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { token } from '../../utils/api'

class AuthRoute extends React.Component {
  render() {
    let { path, component: Component } = this.props
    let isLogin = token.getToken()
    if (!isLogin) {
      return (
        <Route path={path} render={() => {
          return (
            <Redirect to='/login' />
          )
        }}></Route>
      )
    } else {
      let MyComponent = withRouter(Component)
      return (
        <Route path={path} render={() => {
          return (
            <MyComponent />
          )
        }}></Route>
      )
    }
  }
}

export default AuthRoute