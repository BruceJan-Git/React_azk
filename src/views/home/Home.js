import React from 'react';

// 导入路由相关组件,配置主页面子路由
import { BrowserRouter, Route, Link } from 'react-router-dom'

function Index() {
  return (
    <div>Index</div>
  )
}
function Find() {
  return (
    <div>Find</div>
  )
}
function Info() {
  return (
    <div>Info</div>
  )
}
function My() {
  return (
    <div>My</div>
  )
}
class Home extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path='/home' component={Index}></Route>
          <Route path='/find' component={Find}></Route>
          <Route path='/info' component={Info}></Route>
          <Route path='/my' component={My}></Route>
          <Link to='/home'>主页</Link>
          <Link to='/find'>找房</Link>
          <Link to='/info'>资讯</Link>
          <Link to='/my'>我的</Link>
        </BrowserRouter>
      </div>
    )
  }
}

export default Home