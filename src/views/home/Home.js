import React from 'react';
import { TabBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './home.css'
// 导入路由相关组件,配置主页面子路由
// import { BrowserRouter, Route, Link } from 'react-router-dom'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      fullScreen: true,
    };
  }
  render() {
    return (
      <div>
        {/* <BrowserRouter>
          <Route path='/home' component={Index}></Route>
          <Route path='/find' component={Find}></Route>
          <Route path='/info' component={Info}></Route>
          <Route path='/my' component={My}></Route>
          <Link to='/home'>主页</Link>
          <Link to='/find'>找房</Link>
          <Link to='/info'>资讯</Link>
          <Link to='/my'>我的</Link>
        </BrowserRouter> */}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          noRenderContent={true}
          hidden={this.state.hidden}>
            {this.renderMenuItem()}
        </TabBar>
      </div>
    )
  }

  renderMenuItem = () => {
    let mentData = [{
      id: 'home',
      title: '主页'
    }, {
      id: 'find',
      title: '找房'
    }, {
      id: 'info',
      title: '资讯'
    }, {
      id: 'my',
      title: '我的'
    }]
    return mentData.map(item => {
      return (
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title={item.title}
          key={item.id}
          selected={this.state.selectedTab === item.id}
          onPress={() => {
            this.setState({
              selectedTab: item.id,
            });
          }}>
        </TabBar.Item>
      )
    })
  }
}

export default Home