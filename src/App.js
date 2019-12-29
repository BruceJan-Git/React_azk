import React from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import './assets/fonts/iconfont.css'
import './assets/font1/iconfont.css'
import './assets/font/iconfont.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// 导入相关组件(主页和登陆)
import Login from './views/login/Login'
import Home from './views/home/Home'
import City from './views/city/City'
import Detail from './views/detail/index'
import Test from './views/test/test'
import Rent from './views/Rent/index'
import RentAdd from './views/Rent/Add/index'
import RentSearch from './views/Rent/Search/index'
import AuthRoute from './components/AuthRoute/AuthRoute'
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
        {/* <Route path='/test' component={Test}></Route> */}
        <Route path='/login' component={Login}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/city' component={City}></Route>
        <Route path='/detail/:id' component={Detail}></Route>
        <AuthRoute path='/test' component={Test}></AuthRoute>
        <AuthRoute path='/rent' exact component={Rent}></AuthRoute>
        <AuthRoute path='/rent/add' component={RentAdd}></AuthRoute>
        <AuthRoute path='/rent/search' component={RentSearch}></AuthRoute>
        <Redirect from='/' to='/home' exact></Redirect>
        <Route component={Not}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
