import React from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// 导入相关组件(主页和登陆)
import Login from './views/login/Login'
import Home from './views/home/Home'
import City from './views/city/City'
import '../src/utils/api' // 基准路径/响应拦截



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
        <Route path='/city' component={City}></Route>
        <Redirect from='/' to='/home' exact></Redirect>
        <Route component={Not}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
