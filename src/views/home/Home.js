import React from 'react';
import { TabBar } from 'antd-mobile';

import Index from '../index/Index.js'
import Info from '../info/Info.js'
import Find from '../find/Find.js'
import My from '../my/My.js'

import './home.scss'
import '../../assets/fonts/iconfont.css'


// 导入路由相关组件,配置主页面子路由
import { Route, Redirect, Switch } from 'react-router-dom'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'index',
      fullScreen: true,
    };
  }
  render() {
    return (
      <div>
        <Switch>
          <Redirect from='/home' to='/home/index' exact />
          <Route path='/home/index' component={Index} />
          <Route path='/home/find' component={Find} />
          <Route path='/home/info' component={Info} />
          <Route path='/home/my' component={My} />
        </Switch>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          noRenderContent={true}>
          {this.renderMenuItem()}
        </TabBar>
      </div>
    )
  }

  renderMenuItem = () => {
    let mentData = [{
      id: 'index',
      title: '主页',
      icon: 'icon-home'
    }, {
      id: 'find',
      title: '找房',
      icon: 'icon-chazhaofangyuan'
    }, {
      id: 'info',
      title: '资讯',
      icon: 'icon-zixun'
    }, {
      id: 'my',
      title: '我的',
      icon: 'icon-wode'
    }]
    return mentData.map(item => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.id}
          icon={<i className={'iconfont ' + item.icon}></i>}
          selectedIcon={<i className={'iconfont ' + item.icon}></i>}
          selected={this.state.selectedTab === item.id}
          onPress={() => {
            this.setState({
              selectedTab: item.id,
            });
            this.props.history.push('/home/' + item.id)
          }}>
        </TabBar.Item>
      )
    })
  }
}

export default Home