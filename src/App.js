import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// 导入相关组件
import Login from './views/login/Login'
import Home from './views/home/Home'

import 'antd-mobile/dist/antd-mobile.css';
function Not() {
  return(
    <div>Not Found</div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/home' component={Home}></Route>
        <Redirect from='/' to='/home' exact></Redirect>
        <Route component={Not}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
