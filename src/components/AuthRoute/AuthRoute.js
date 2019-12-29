import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { token } from '../../utils/api'

class AuthRoute extends React.Component {
  render() {
    let { path, component: Component } = this.props
    let isLogin = token.getToken()
    let com = <Component></Component>
    if (!isLogin) {
      com = <Redirect to='/login'></Redirect>
    }

    return (
      <Route path={path} render={() => (com)}></Route>
    )
  }
}

export default AuthRoute